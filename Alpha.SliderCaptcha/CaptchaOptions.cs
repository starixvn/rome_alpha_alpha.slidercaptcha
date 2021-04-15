using System.IO;

namespace Alpha.SliderCaptcha
{
    public class CaptchaOptions
    {
        private static readonly string DefaultImagePath = Path.Combine("wwwroot", "slider-captcha");

        private const int DefaultAcceptRange = 5;
        private const int DefaultTimeoutMinutes = 5;
        private const int DefaultVerifiedMinutes = 5;

        public string ImagePath { get; }

        public int TimeoutMinutes { get; set; }

        public int AcceptRange { get; }

        public int VerifiedMinutes { get; }

        public CaptchaOptions() :
            this(DefaultImagePath, DefaultAcceptRange, DefaultTimeoutMinutes, DefaultVerifiedMinutes)
        {
        }

        public CaptchaOptions(string imagePath, int acceptRange, int timeoutMinutes, int verifiedMinutes)
        {
            ImagePath = imagePath;
            AcceptRange = acceptRange;
            TimeoutMinutes = timeoutMinutes;
            VerifiedMinutes = verifiedMinutes;
        }
    }
}
