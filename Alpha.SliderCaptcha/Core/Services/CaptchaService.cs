using System;
using System.Threading.Tasks;
using Alpha.SliderCaptcha.Core.Models;
using Alpha.SliderCaptcha.ImageCaptcha.Services;
using System.Text.Json;

namespace Alpha.SliderCaptcha.Core.Services
{
    public interface ICaptchaService
    {
        Task<GenerateResult> Generate(string token, CaptchaStyle style);

        Task<Result> Verify(string token, string data);

        Task<Result> IsVerified(string token);
    }

    public class CaptchaService : ICaptchaService
    {
        private const string CachePrefix = "Alpha.SliderCaptcha";
        private readonly CaptchaOptions captchaOptions;
        //private readonly ICacheService cacheService;
        private readonly ITokenService tokenService;
        private readonly IHttpContextService httpContextService;
        private readonly IRandomService randomService;
        private readonly IFileProvider fileProvider;

        public CaptchaService(
            CaptchaOptions captchaOptions,
            //ICacheService cacheService,
            ITokenService tokenService,
            IHttpContextService httpContextService,
            IRandomService randomService,
            IFileProvider fileProvider)
        {
            this.captchaOptions = captchaOptions ?? throw new ArgumentNullException(nameof(captchaOptions));
            // this.cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
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

        public async Task<GenerateResult> Generate(string token, CaptchaStyle style)
        {
            if (!tokenService.IsValid(token))
            {
                token = tokenService.Generate();
            }

            var captchaHandler = GetCaptchaHandler(style);
            using (var model = captchaHandler.Generate())
            {
                var cacheData = new CacheData
                {
                    Style = (byte)style,
                    Data = model.GetCacheData()
                };
                // await cacheService.SetAsync(GetVerifyingCacheKey(token), JsonSerializer.Serialize(cacheData), new CacheItemOptions
                // {
                //     RelativeExpiration = TimeSpan.FromMinutes(captchaOptions.DragTimeout)
                // }).ConfigureAwait(false);

                return new GenerateResult(token, model.GetResponseData());
            }
        }

        public async Task<Result> Verify(string token, string data)
        {
            if (!tokenService.IsValid(token))
            {
                return new Result(Result.InvalidToken, "Invalid request");
            }

            var verifyingCacheKey = GetVerifyingCacheKey(token);
            //var jsonString = await cacheService.GetAsync<string>(verifyingCacheKey).ConfigureAwait(false);
            // var cacheData = JsonSerializer.Deserialize<CacheData>(jsonString);
            // if (cacheData == null)
            // {
            //     return new Result(Result.Timeout, "Timeout error. Please try again");
            // }

            //await cacheService.RemoveAsync(verifyingCacheKey).ConfigureAwait(false);
            // var captchaHandler = GetCaptchaHandler((CaptchaStyle)cacheData.Style);
            // var verifyCode = captchaHandler.Validate(data, cacheData.Data);
            // if (verifyCode != Result.Correct)
            // {
            //     return new Result(Result.Incorrect, "Incorrect", $"Input={data}, Expected={cacheData.Data}, AcceptRange={captchaOptions.AcceptRange}");
            // }

            // await cacheService.SetAsync(GetVerifiedCacheKey(token), DateTime.UtcNow, new CacheItemOptions
            // {
            //     SlidingExpiration = TimeSpan.FromMinutes(captchaOptions.VerifyTimeout)
            // }).ConfigureAwait(false);

            httpContextService.SaveCookieToken(token);
            return new Result(Result.Correct, "Success");
        }

        public async Task<Result> IsVerified(string token)
        {
            token = string.IsNullOrEmpty(token) ? httpContextService.TakeCookieToken() : token;
            if (!tokenService.IsValid(token))
            {
                return new Result(Result.InvalidToken, "Invalid token");
            }

            var verifiedCacheKey = GetVerifiedCacheKey(token);
            // if (!await cacheService.ContainAsync(verifiedCacheKey).ConfigureAwait(false))
            // {
            //     return new Result(Result.Timeout, "Token is timeout");
            // }

            // await cacheService.RemoveAsync(verifiedCacheKey).ConfigureAwait(false);
            return new Result(Result.Correct, "Success");
        }
    }
}