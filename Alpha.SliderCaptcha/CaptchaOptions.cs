using System.IO;

namespace Alpha.SliderCaptcha
{
    public class CaptchaOptions
    {
        private static readonly string DefaultImagePath = Path.Combine("wwwroot", "slider-captcha");

        private const int DefaultAcceptRange = 5;

        public string ImagePath { get; }

        public int AcceptRange { get; }

        public CaptchaOptions() :
            this(DefaultImagePath, DefaultAcceptRange)
        {
        }

        public CaptchaOptions(string imagePath, int acceptRange)
        {
            ImagePath = imagePath;
            AcceptRange = acceptRange;
        }
    }
}
