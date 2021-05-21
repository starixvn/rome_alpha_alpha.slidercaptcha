using Alpha.SliderCaptcha.Core;

namespace Alpha.SliderCaptcha.Mvc
{
    public static class Configuration
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

        public static void Use(CaptchaOptions captchaOptions)
        {
            Use(new ServiceFactory(), captchaOptions);
        }

        public static void Use()
        {
            Use(new ServiceFactory(), new CaptchaOptions());
        }
    }
}