using Alpha.SliderCaptcha.Core.Models;

namespace Alpha.SliderCaptcha.Mvc.Models
{
    public class GenerateRequestModel
    {
        public string Token { get; set; }

        public byte Style { get; } = (byte)CaptchaStyle.Image;
    }
}