using Alpha.Captcha.Core;
using Alpha.Captcha.Core.Services;
using Alpha.SliderCaptcha.Services;
using Fanex.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
            services.AddSingleton<ICaptchaHandler, CaptchaHandler>();
            services.AddSingleton<ICaptchaService, CaptchaService>();

            return services;
        }
    }
}