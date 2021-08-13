namespace Alpha.SliderCaptcha.Core
{
    public class CaptchaOptions
    {
        public bool LogEnabled { get; }

        public string ImagePath { get; }

        public int AcceptRange { get; }

        public int DragTimeout { get; set; }

        public int VerifyTimeout { get; }

        public CaptchaOptions(bool logEnabled, string imagePath, int acceptRange, int dragTimeout, int verifyTimeout)
        {
            LogEnabled = logEnabled;
            ImagePath = imagePath;
            AcceptRange = acceptRange;
            DragTimeout = dragTimeout;
            VerifyTimeout = verifyTimeout;
        }
    }
}
