using System;
using System.Threading.Tasks;
using Alpha.SliderCaptcha.Core.Models;
using Alpha.SliderCaptcha.ImageCaptcha.Services;
using Fanex.Caching;

namespace Alpha.SliderCaptcha.Core.Services
{
    public interface ICaptchaService
    {
        GenerateResult Generate(string token, CaptchaStyle style);

        Task<GenerateResult> GenerateAsync(string token, CaptchaStyle style);

        VerifyResult Verify(string token, string data);

        Task<VerifyResult> VerifyAsync(string token, string data);

        bool IsVerfied(string token);

        Task<bool> IsVerifiedAsync(string token);
    }

    public class CaptchaService : ICaptchaService
    {
        private const string CachePrefix = "Alpha.SliderCaptcha";
        private readonly CaptchaOptions captchaOptions;
        private readonly ICacheService cacheService;
        private readonly ITokenService tokenService;
        private readonly IHttpContextService httpContextService;
        private readonly IRandomService randomService;
        private readonly IFileProvider fileProvider;

        public CaptchaService(
            CaptchaOptions captchaOptions,
            ICacheService cacheService,
            ITokenService tokenService,
            IHttpContextService httpContextService,
            IRandomService randomService,
            IFileProvider fileProvider)
        {
            this.captchaOptions = captchaOptions ?? throw new ArgumentNullException(nameof(captchaOptions));
            this.cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
            this.tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            this.httpContextService = httpContextService ?? throw new ArgumentNullException(nameof(httpContextService));
            this.randomService = randomService ?? throw new ArgumentNullException(nameof(randomService));
            this.fileProvider = fileProvider ?? throw new ArgumentNullException(nameof(fileProvider));
        }

        private string GetVerifyingCacheKey(string token)
        {
            return $"{CachePrefix}_{token}_Verifying";
        }

        private string GetVerifiedCacheKey(string token)
        {
            return $"{CachePrefix}_{token}_Verified";
        }

        private ICaptchaHandler GetCaptchaHandler(CaptchaStyle style)
        {
            switch (style)
            {
                case CaptchaStyle.Image:
                    return new CaptchaHandler(captchaOptions, randomService, fileProvider);
                case CaptchaStyle.Text:
                    return new TextCaptcha.Services.CaptchaHandler(randomService);
                default:
                    throw new NotImplementedException(nameof(style));
            }
        }

        public GenerateResult Generate(string token, CaptchaStyle style)
        {
            if (!tokenService.IsValid(token))
            {
                token = tokenService.Generate();
            }

            var generateService = GetCaptchaHandler(style);
            using (var model = generateService.Generate())
            {
                var cacheKey = GetVerifyingCacheKey(token);
                var cacheData = new CacheData
                {
                    Style = (byte)style,
                    Data = model.GetCacheData()
                };
                cacheService.Set(cacheKey, cacheData, new CacheItemOptions
                {
                    RelativeExpiration = TimeSpan.FromMinutes(captchaOptions.TimeoutMinutes)
                });
                return new GenerateResult(token, model.GetResponseData());
            }
        }

        public async Task<GenerateResult> GenerateAsync(string token, CaptchaStyle style)
        {
            if (!tokenService.IsValid(token))
            {
                token = tokenService.Generate();
            }

            var captchaHandler = GetCaptchaHandler(style);
            using (var model = captchaHandler.Generate())
            {
                var cacheKey = GetVerifyingCacheKey(token);
                var cacheData = new CacheData
                {
                    Style = (byte)style,
                    Data = model.GetCacheData()
                };
                await cacheService.SetAsync(cacheKey, cacheData, new CacheItemOptions
                {
                    RelativeExpiration = TimeSpan.FromMinutes(captchaOptions.TimeoutMinutes)
                }).ConfigureAwait(false);
                return new GenerateResult(token, model.GetResponseData());
            }
        }

        public VerifyResult Verify(string token, string data)
        {
            if (!tokenService.IsValid(token))
            {
                return new VerifyResult(VerifyResult.InvalidToken, "Invalid request");
            }

            var verifyingCacheKey = GetVerifyingCacheKey(token);
            var cacheData = cacheService.Get<CacheData>(verifyingCacheKey);
            if (cacheData == null)
            {
                return new VerifyResult(VerifyResult.Timeout, "Timeout error. Please try again");
            }

            cacheService.Remove(verifyingCacheKey);
            var captchaHandler = GetCaptchaHandler((CaptchaStyle)cacheData.Style);
            var verifyCode = captchaHandler.Validate(data, cacheData.Data);
            if (verifyCode != VerifyResult.Correct)
            {
                return new VerifyResult(VerifyResult.Incorrect, "Incorrect");
            }

            cacheService.Set(GetVerifiedCacheKey(token), DateTime.UtcNow, new CacheItemOptions
            {
                SlidingExpiration = TimeSpan.FromMinutes(captchaOptions.VerifiedMinutes)
            });

            httpContextService.SaveCookieToken(token);
            return new VerifyResult(VerifyResult.Correct, "Success");
        }

        public async Task<VerifyResult> VerifyAsync(string token, string data)
        {
            if (!tokenService.IsValid(token))
            {
                return new VerifyResult(VerifyResult.InvalidToken, "Invalid request");
            }

            var verifyingCacheKey = GetVerifyingCacheKey(token);
            var cacheData = await cacheService.GetAsync<CacheData>(verifyingCacheKey).ConfigureAwait(false);
            if (cacheData == null)
            {
                return new VerifyResult(VerifyResult.Timeout, "Timeout error. Please try again");
            }

            await cacheService.RemoveAsync(verifyingCacheKey).ConfigureAwait(false);
            var captchaHandler = GetCaptchaHandler((CaptchaStyle)cacheData.Style);
            var verifyCode = captchaHandler.Validate(data, cacheData.Data);
            if (verifyCode != VerifyResult.Correct)
            {
                return new VerifyResult(VerifyResult.Incorrect, "Incorrect");
            }

            await cacheService.SetAsync(GetVerifiedCacheKey(token), DateTime.UtcNow, new CacheItemOptions
            {
                SlidingExpiration = TimeSpan.FromMinutes(captchaOptions.VerifiedMinutes)
            }).ConfigureAwait(false);

            httpContextService.SaveCookieToken(token);
            return new VerifyResult(VerifyResult.Correct, "Success");
        }

        public bool IsVerfied(string token)
        {
            token = string.IsNullOrEmpty(token) ? httpContextService.TakeCookieToken() : token;
            if (!tokenService.IsValid(token))
            {
                return false;
            }

            var verifiedCacheKey = GetVerifiedCacheKey(token);
            if (!cacheService.Contain(verifiedCacheKey))
            {
                return false;
            }

            cacheService.Remove(verifiedCacheKey);
            return true;
        }

        public async Task<bool> IsVerifiedAsync(string token)
        {
            token = string.IsNullOrEmpty(token) ? httpContextService.TakeCookieToken() : token;
            if (!tokenService.IsValid(token))
            {
                return false;
            }

            var verifiedCacheKey = GetVerifiedCacheKey(token);
            if (!await cacheService.ContainAsync(verifiedCacheKey).ConfigureAwait(false))
            {
                return false;
            }

            await cacheService.RemoveAsync(verifiedCacheKey).ConfigureAwait(false);
            return true;
        }
    }
}