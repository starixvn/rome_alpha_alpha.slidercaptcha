using System.Web;
using System.Web.Mvc;
using Alpha.SliderCaptcha.Core.Services;
using Alpha.SliderCaptcha.ImageCaptcha.Services;
using Fanex.Caching;

namespace Alpha.SliderCaptcha.Mvc
{
    public interface IServiceFactory
    {
        ICaptchaService CaptchaService { get; }

        IFileProvider FileProvider { get; }

        IRandomService RandomService { get; }

        ITokenService TokenService { get; }

        ICacheService CacheService { get; }

        IHttpContextService HttpContextService { get; }
    }

    public class ServiceFactory : IServiceFactory
    {
        private IFileProvider fileProvider;

        public virtual ICaptchaService CaptchaService =>
            DependencyResolver.Current.GetService(typeof(ICaptchaService)) as ICaptchaService ??
            new CaptchaService(Configuration.CaptchaOptions, CacheService, TokenService, HttpContextService, RandomService, FileProvider);

        public virtual IFileProvider FileProvider
        {
            get
            {
                if (fileProvider == null)
                {
                    fileProvider = DependencyResolver.Current.GetService(typeof(IFileProvider)) as IFileProvider ?? new FileProvider(Configuration.CaptchaOptions, RandomService);
                }

                return fileProvider;
            }
        }

        public virtual IRandomService RandomService => DependencyResolver.Current.GetService(typeof(IRandomService)) as IRandomService ?? new RandomService();

        public virtual ITokenService TokenService => DependencyResolver.Current.GetService(typeof(ITokenService)) as ITokenService ?? new TokenService(HttpContextService);

        public virtual ICacheService CacheService => DependencyResolver.Current.GetService(typeof(ICacheService)) as ICacheService ?? new CacheService();

        public virtual IHttpContextService HttpContextService => DependencyResolver.Current.GetService(typeof(IHttpContextService)) as IHttpContextService ?? new HttpContextService(HttpContext.Current, Configuration.CaptchaOptions);
    }
}
