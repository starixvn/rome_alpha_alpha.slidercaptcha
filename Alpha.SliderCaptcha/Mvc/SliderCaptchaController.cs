using System.Threading.Tasks;
using System.Web.Mvc;
using Alpha.SliderCaptcha.Models;
using Alpha.SliderCaptcha.Services;

namespace Alpha.SliderCaptcha.Mvc
{
    public class SliderCaptchaController : Controller
    {
        private readonly ICaptchaService captchaService;

        public SliderCaptchaController()
        {
            var serviceFactory = Configuration.ServiceFactory;
            captchaService = serviceFactory.CaptchaService;
        }

        [HttpPost]
        public async Task<ActionResult> Generate(GenerateRequestModel model)
        {
            var result = await captchaService.Generate(model.Token);
            return Json(result);
        }

        [HttpPost]
        public async Task<ActionResult> Verify(VerifyRequestModel model)
        {
            var result = await captchaService.Verify(model.Token, model.Position);
            return Json(new ResponseModel(result.Code, result.Reason));
        }
    }
}
