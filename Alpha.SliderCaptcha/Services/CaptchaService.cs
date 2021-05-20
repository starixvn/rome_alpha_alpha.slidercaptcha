using System;
using System.Threading.Tasks;
using Alpha.SliderCaptcha.Extensions;
using Alpha.SliderCaptcha.Models;
using Fanex.Caching;

namespace Alpha.SliderCaptcha.Services
{
    public interface ICaptchaService
    {
        GenerateResult Generate(string token);

        Task<GenerateResult> GenerateAsync(string token);

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
        private readonly IGenerateService generateService;
        private readonly IHttpContextService httpContextService;

        public CaptchaService(CaptchaOptions captchaOptions, IGenerateService generateService, ICacheService cacheService, ITokenService tokenService, IHttpContextService httpContextService)
        {
            this.captchaOptions = captchaOptions ?? throw new ArgumentNullException(nameof(captchaOptions));
            this.generateService = generateService ?? throw new ArgumentNullException(nameof(generateService));
            this.cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
            this.tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            this.httpContextService = httpContextService ?? throw new ArgumentNullException(nameof(httpContextService));
        }

        private string GetVerifyingCacheKey(string token)
        {
            return $"{CachePrefix}_{token}_Verifying";
        }

        private string GetVerifiedCacheKey(string token)
        {
            return $"{CachePrefix}_{token}_Verified";
        }

        public GenerateResult Generate(string token)
        {
            token = tokenService.IsValid(token) ? token : tokenService.Generate();
            using (var model = generateService.Generate())
            {
                var cacheKey = GetVerifyingCacheKey(token);
                cacheService.Set(cacheKey, model.Point.X, new CacheItemOptions
                {
                    SlidingExpiration = TimeSpan.FromMinutes(captchaOptions.TimeoutMinutes)
                });
                var backgroundBase64String = model.Background.ToBase64String();
                var sliceBase64String = model.Slice.ToBase64String();
                return new GenerateResult(token, backgroundBase64String, sliceBase64String, model.Point.Y);
            }
        }

        public async Task<GenerateResult> GenerateAsync(string token)
        {
            token = tokenService.Generate();
            using (var model = generateService.Generate())
            {
                var cacheKey = GetVerifyingCacheKey(token);
                await cacheService.SetAsync(cacheKey, model.Point.X, new CacheItemOptions
                {
                    SlidingExpiration = TimeSpan.FromMinutes(captchaOptions.TimeoutMinutes)
                }).ConfigureAwait(false);
                var backgroundBase64String = model.Background.ToBase64String();
                var sliceBase64String = model.Slice.ToBase64String();
                return new GenerateResult(token, backgroundBase64String, sliceBase64String, model.Point.Y);
            }
        }

        public VerifyResult Verify(string token, string data)
        {
            if (!tokenService.IsValid(token))
            {
                return new VerifyResult(VerifyResult.InvalidToken, "Invalid request");
            }

            var verifyingCacheKey = GetVerifyingCacheKey(token);
            var currentPosition = cacheService.Get<int>(verifyingCacheKey);
            if (currentPosition == 0)
            {
                return new VerifyResult(VerifyResult.Timeout, "Timeout error. Please try again");
            }

            if (!int.TryParse(data, out var position))
            {
                return new VerifyResult(VerifyResult.Incorrect, "Invalid data");
            }

            var isSuccess = Math.Abs(currentPosition - position) <= captchaOptions.AcceptRange;
            if (!isSuccess)
            {
                return new VerifyResult(VerifyResult.Incorrect, "Incorrect. Please try again");
            }

            cacheService.Remove(verifyingCacheKey);
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
            var currentPosition = await cacheService.GetAsync<int>(verifyingCacheKey).ConfigureAwait(false);
            if (currentPosition == 0)
            {
                return new VerifyResult(VerifyResult.Timeout, "Timeout error. Please try again");
            }

            if (!int.TryParse(data, out var position))
            {
                return new VerifyResult(VerifyResult.Incorrect, "Invalid data");
            }

            var isSuccess = Math.Abs(currentPosition - position) <= captchaOptions.AcceptRange;
            if (!isSuccess)
            {
                return new VerifyResult(VerifyResult.Incorrect, "Incorrect. Please try again");
            }

            await cacheService.RemoveAsync(verifyingCacheKey).ConfigureAwait(false);
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