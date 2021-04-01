using System.Threading.Tasks;
using System.Web.Mvc;
using Alpha.SliderCaptcha.Models;
using Alpha.SliderCaptcha.Mvc.Models;
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
            var result = await captchaService.GenerateAsync(model.Token).ConfigureAwait(false);
            return Json(result);
        }

        [HttpPost]
        public async Task<ActionResult> Verify(VerifyRequestModel model)
        {
            var result = await captchaService.VerifyAsync(model.Token, model.Position).ConfigureAwait(false);
            return Json(new ResponseModel(result.Code, result.Reason));
        }
    }
}
