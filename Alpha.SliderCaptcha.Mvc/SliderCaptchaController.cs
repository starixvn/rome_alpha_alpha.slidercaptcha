using System.Threading.Tasks;
using System.Web.Mvc;
using Alpha.SliderCaptcha.Core.Models;
using Alpha.SliderCaptcha.Core.Services;
using Alpha.SliderCaptcha.Mvc.Models;

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
            var result = await captchaService.GenerateAsync(model.Token, (CaptchaStyle)model.Style).ConfigureAwait(false);
            return Json(result);
        }

        [HttpPost]
        public async Task<ActionResult> Verify(VerifyRequestModel model)
        {
            var result = await captchaService.VerifyAsync(model.Token, model.Data).ConfigureAwait(false);
            return Json(new ResponseModel(result.Code, result.Reason));
        }
    }
}
