using Alpha.SliderCaptcha.Core;

namespace Alpha.SliderCaptcha.Mvc
{
    public static class SliderCaptchaHandler
    {
        public const string BackgroundPath = "backgrounds";

        public const string SliderPath = "sliders";

        public static CaptchaOptions CaptchaOptions { get; private set; }

        public static IServiceFactory ServiceFactory { get; private set; }

        public static void Use(IServiceFactory serviceFactory, CaptchaOptions captchaOptions)
        {
            ServiceFactory = serviceFactory;
            CaptchaOptions = captchaOptions;
        }

        public static void Use(IServiceFactory serviceFactory)
        {
            var configuration = SliderCaptchaConfiguration.Default;
            var captchaOptions = new CaptchaOptions(configuration.LogEnabled, configuration.ImagePath, configuration.AcceptRange, configuration.DragTimeout, configuration.VerifyTimeout);
            Use(serviceFactory, captchaOptions);
        }

        public static void Use()
        {
            Use(new ServiceFactory());
        }
    }
}