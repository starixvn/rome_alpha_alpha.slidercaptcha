using Alpha.Captcha.Core;
using Alpha.Captcha.Core.Services;
using Microsoft.AspNetCore.Http;

namespace Alpha.SliderCaptcha.AspNetCore
{
    public class HttpContextService : IHttpContextService
    {
        private const string TokenCookieKey = "__asct";

        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly CaptchaOptions captchaOptions;

        public HttpContextService(IHttpContextAccessor httpContextAccessor, CaptchaOptions captchaOptions)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.captchaOptions = captchaOptions;
        }

        public string GetClientIP()
        {
            var httpContext = httpContextAccessor.HttpContext;
            var xForwardedFor = httpContext.Request.Headers["X-Forwarded-For"].ToString();
            var ip = !string.IsNullOrEmpty(xForwardedFor) ? xForwardedFor : httpContext.Connection.RemoteIpAddress.ToString();

            return (string.IsNullOrEmpty(ip) || ip.Equals("::1", StringComparison.OrdinalIgnoreCase)) ? "127.0.0.1" : ip.Split(',')[0];
        }

        public void RemoveCookieToken()
        {
            httpContextAccessor.HttpContext.Response.Cookies.Delete(TokenCookieKey);
        }

        public void SaveCookieToken(string token)
        {
            RemoveCookieToken();
            var httpContext = httpContextAccessor.HttpContext;
            httpContext.Response.Cookies.Append(TokenCookieKey, token, new CookieOptions
            {
                Secure = true,
                Expires = DateTime.Now.AddMinutes(captchaOptions.VerifyTimeout)
            });
        }

        public string TakeCookieToken()
        {
            var httpContext = httpContextAccessor.HttpContext;
            var cookie = httpContext.Request.Cookies[TokenCookieKey];
            var token = string.Empty;
            if (!string.IsNullOrEmpty(cookie))
            {
                token = cookie;
                httpContext.Response.Cookies.Delete(TokenCookieKey);
            }

            return token;
        }
    }
}