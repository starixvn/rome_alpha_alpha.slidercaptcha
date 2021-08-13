using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web.Mvc;
using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Core.Models;
using Alpha.SliderCaptcha.Core.Services;
using Alpha.SliderCaptcha.Mvc.Models;
using Fanex.Logging.Extensions.Web;

namespace Alpha.SliderCaptcha.Mvc
{
    public class SliderCaptchaController : Controller
    {
        private readonly CaptchaOptions captchaOptions;
        private readonly ICaptchaService captchaService;

        public SliderCaptchaController()
        {
            captchaOptions = SliderCaptchaHandler.CaptchaOptions;
            var serviceFactory = SliderCaptchaHandler.ServiceFactory;
            captchaService = serviceFactory.CaptchaService;
        }

        [HttpPost]
        public async Task<ActionResult> Generate(GenerateRequestModel request)
        {
            var result = await captchaService.GenerateAsync(request.Token, (CaptchaStyle)request.Style).ConfigureAwait(false);
            WriteLog(request, result);
            return Json(result);
        }

        [HttpPost]
        public async Task<ActionResult> Verify(VerifyRequestModel request)
        {
            var result = await captchaService.VerifyAsync(request.Token, request.Data).ConfigureAwait(false);
            WriteLog(request, result);
            return Json(new ResponseModel(result.Code, result.Reason));
        }

        private void WriteLog(GenerateRequestModel request, GenerateResult result)
        {
            var message = $"Generate captcha: token={result.Token}, key={request.Key}, data={result.Data}";
            WriteLog(message);
        }

        private void WriteLog(VerifyRequestModel request, Result result)
        {
            if (result.Code != Result.Correct)
            {
                var message = $"Verify captcha: token={request.Token}, key={request.Key} data={request.Data}, code={result.Code}, reason={result.Reason}, detail={result.Detail}";
                WriteLog(message);
            }
        }

        private void WriteLog(string message)
        {
            if (captchaOptions.LogEnabled)
            {
                ExceptionHandler.Handle(new Exception(message), TraceEventType.Warning);
            }
        }
    }
}
