using System.Threading.Tasks;
using System.Web.Mvc;
using Alpha.SliderCaptcha.Demo.Models;
using Alpha.SliderCaptcha.Services;

namespace Alpha.SliderCaptcha.Demo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ICaptchaService captchaService;

        public HomeController()
            : this(new ServiceFactory())
        {
        }

        public HomeController(IServiceFactory serviceFactory)
        {
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
            var isVerified = await captchaService.IsVerified(model.Token);
            return View(new IndexViewModel
            {
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