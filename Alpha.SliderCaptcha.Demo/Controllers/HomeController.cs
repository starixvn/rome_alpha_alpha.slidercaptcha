using System.Threading.Tasks;
using System.Web.Mvc;
using Alpha.SliderCaptcha.Demo.Models;
using Alpha.SliderCaptcha.Mvc;
using Alpha.SliderCaptcha.Services;

namespace Alpha.SliderCaptcha.Demo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ICaptchaService captchaService;

        public HomeController()
            : this(null)
        {
        }

        public HomeController(IServiceFactory serviceFactory)
        {
            serviceFactory = serviceFactory ?? new ServiceFactory();
            captchaService = serviceFactory.CaptchaService;
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
            var isVerified = await captchaService.IsVerifiedAsync(model.Token).ConfigureAwait(false);
            return View(new IndexViewModel
            {
                Username = model.Username,
                IsVerified = isVerified,
                IsTokenRequired = true
            });
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