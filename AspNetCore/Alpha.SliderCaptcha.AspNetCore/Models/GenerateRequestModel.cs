using Alpha.SliderCaptcha.Core.Models;

namespace Alpha.SliderCaptcha.AspNetCore.Models
{
    public class GenerateRequestModel
    {
        public string Token { get; set; }

        public string Key { get; set; }

        public byte Style { get; } = (byte)CaptchaStyle.Image;
    }
}