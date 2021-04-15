using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Alpha.SliderCaptcha.Demo.Models;
using Alpha.SliderCaptcha.Mvc;
using Alpha.SliderCaptcha.Services;
using Fanex.Caching;

namespace Alpha.SliderCaptcha.Demo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ICaptchaService captchaService;
        private readonly ICacheService cacheService;

        public HomeController()
            : this(null)
        {
        }

        public HomeController(IServiceFactory serviceFactory)
        {
            serviceFactory = serviceFactory ?? new ServiceFactory();
            captchaService = serviceFactory.CaptchaService;
            cacheService = serviceFactory.CacheService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View(new IndexViewModel());
        }

        [HttpPost]
        [ActionName("Index")]
        public async Task<ActionResult> IndexPost(IndexModel model)
        {
            var isSuccess = false;
            var message = string.Empty;
            var key = GetLoginCacheKey(model);
            if (cacheService.Contain(key))
            {
                var isVerified = await captchaService.IsVerifiedAsync(model.Token).ConfigureAwait(false);
                if (isVerified)
                {
                    cacheService.Remove(key);
                    return View(VerifyLogin(model));
                }
                else
                {
                    message = "Please verify you are not a robot";
                }
            }
            else
            {
                return View(VerifyLogin(model));
            }

            return View(new IndexViewModel
            {
                Username = model.Username,
                Message = message,
                IsTokenRequired = !isSuccess
            });
        }

        private string GetLoginCacheKey(IndexModel model)
        {
            return $"{model.Username}_{ClientIP()}";
        }

        private IndexViewModel VerifyLogin(IndexModel model)
        {
            var isSuccess = model.Username == "admin" && model.Password == "admin";
            if (isSuccess)
            {
                return new IndexViewModel
                {
                    Username = model.Username,
                    Message = "Login successfully",
                    IsTokenRequired = false
                };
            }
            else
            {
                var key = GetLoginCacheKey(model);
                cacheService.Set(key, 1, new CacheItemOptions
                {
                    SlidingExpiration = TimeSpan.FromMinutes(5)
                });
                return new IndexViewModel
                {
                    Username = model.Username,
                    Message = "Wrong username/password",
                    IsTokenRequired = true
                };
            }
        }

        private static string ClientIP()
        {
            var ip = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ??
                System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];

            return (string.IsNullOrEmpty(ip) || ip.Equals("::1")) ? "127.0.0.1" : ip.Split(',')[0];
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}