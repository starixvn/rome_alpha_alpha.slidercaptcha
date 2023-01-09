namespace Alpha.SliderCaptcha.Core
{
    public class CaptchaOptions
    {
        public bool LogEnabled { get; set; }

        public string ImagePath { get; set; }

        public int AcceptRange { get; set; }

        public int DragTimeout { get; set; }

        public int VerifyTimeout { get; set; }
    }
}
