using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Core.Services;
using Alpha.SliderCaptcha.ImageCaptcha.Services;

namespace Alpha.SliderCaptcha.AspNetCore
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddSliderCaptcha(this IServiceCollection services, IConfiguration configuration)
        {
            var captchaOptions = new CaptchaOptions();
            configuration.Bind("Alpha.SliderCaptcha", captchaOptions);
            services.AddSingleton(captchaOptions);

            services.AddSingleton<IHttpContextService, HttpContextService>();
            services.AddSingleton<ITokenService, TokenService>();
            services.AddSingleton<IRandomService, RandomService>();
            services.AddSingleton<IFileProvider, FileProvider>();
            services.AddSingleton<ICaptchaService, CaptchaService>();

            return services;
        }
    }
}