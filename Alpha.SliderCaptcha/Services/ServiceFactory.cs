using System.Web.Mvc;
using Fanex.Caching;

namespace Alpha.SliderCaptcha.Services
{
    public interface IServiceFactory
    {
        ICaptchaService CaptchaService { get; }

        IFileProvider FileProvider { get; }

        IGenerateService GenerateService { get; }

        IRandomService RandomService { get; }

        ITokenService TokenService { get; }

        ICacheService CacheService { get; }
    }

    public class ServiceFactory : IServiceFactory
    {
        private IFileProvider fileProvider;

        public virtual ICaptchaService CaptchaService => DependencyResolver.Current.GetService(typeof(ICaptchaService)) as ICaptchaService ?? new CaptchaService(Configuration.CaptchaOptions, GenerateService, CacheService, TokenService);

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

        public virtual IGenerateService GenerateService => DependencyResolver.Current.GetService(typeof(IGenerateService)) as IGenerateService ?? new GenerateService(RandomService, FileProvider);

        public virtual IRandomService RandomService => DependencyResolver.Current.GetService(typeof(IRandomService)) as IRandomService ?? new RandomService();

        public virtual ITokenService TokenService => DependencyResolver.Current.GetService(typeof(ITokenService)) as ITokenService ?? new TokenService();

        public virtual ICacheService CacheService => DependencyResolver.Current.GetService(typeof(ICacheService)) as ICacheService ?? new CacheService();
    }
}
