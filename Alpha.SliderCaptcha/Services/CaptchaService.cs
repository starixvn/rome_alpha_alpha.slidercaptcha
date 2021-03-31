using System;
using System.Threading.Tasks;
using Alpha.SliderCaptcha.Extensions;
using Alpha.SliderCaptcha.Models;
using Fanex.Caching;

namespace Alpha.SliderCaptcha.Services
{
    public interface ICaptchaService
    {
        Task<GenerateResult> Generate(string token);

        Task<VerifyResult> Verify(string token, int position);

        Task<bool> IsVerified(string token);
    }

    public class CaptchaService : ICaptchaService
    {
        private readonly CaptchaOptions captchaOptions;
        private readonly ICacheService cacheService;
        private readonly ITokenService tokenService;
        private readonly IGenerateService generateService;

        public CaptchaService(CaptchaOptions captchaOptions, IGenerateService generateService, ICacheService cacheService, ITokenService tokenService)
        {
            this.captchaOptions = captchaOptions ?? throw new ArgumentNullException(nameof(captchaOptions));
            this.generateService = generateService ?? throw new ArgumentNullException(nameof(generateService));
            this.cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
            this.tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        private string GetVerifyingCacheKey(string token)
        {
            return $"{Configuration.CachePrefix}_{token}_Verifying";
        }

        private string GetVerifiedCacheKey(string token)
        {
            return $"{Configuration.CachePrefix}_{token}_Verified";
        }

        public async Task<GenerateResult> Generate(string token)
        {
            token = tokenService.IsValid(token) ? token : tokenService.Generate();
            using (var model = generateService.Generate())
            {
                var cacheKey = GetVerifyingCacheKey(token);
                await cacheService.SetAsync(cacheKey, model.Point.X);
                var backgroundBase64String = model.Background.ToBase64String();
                var sliceBase64String = model.Slice.ToBase64String();
                return new GenerateResult(token, backgroundBase64String, sliceBase64String, model.Point.Y);
            }
        }

        public async Task<VerifyResult> Verify(string token, int position)
        {
            if (!tokenService.IsValid(token))
            {
                return new VerifyResult(VerifyResult.InvalidToken, "Invalid request");
            }

            var verifyingCacheKey = GetVerifyingCacheKey(token);
            var currentPosition = await cacheService.GetAsync<int>(verifyingCacheKey);
            if (currentPosition == 0)
            {
                return new VerifyResult(VerifyResult.Timeout, "Timeout error. Please try again");
            }

            var isSuccess = Math.Abs(currentPosition - position) <= captchaOptions.AcceptRange;
            if (!isSuccess)
            {
                return new VerifyResult(VerifyResult.Incorrect, "Incorrect. Please try again");
            }

            await cacheService.RemoveAsync(verifyingCacheKey);
            await cacheService.SetAsync(GetVerifiedCacheKey(token), DateTime.UtcNow);
            return new VerifyResult(VerifyResult.Correct, "Success");
        }

        public async Task<bool> IsVerified(string token)
        {
            if (!tokenService.IsValid(token))
            {
                return false;
            }

            var verifiedCacheKey = GetVerifiedCacheKey(token);
            if (!await cacheService.ContainAsync(verifiedCacheKey))
            {
                return false;
            }

            await cacheService.RemoveAsync(verifiedCacheKey);
            return true;
        }
    }
}