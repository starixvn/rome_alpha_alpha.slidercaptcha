using System;
using System.Web;

namespace Alpha.SliderCaptcha.Services
{
    public interface IHttpContextService
    {
        string GetClientIP();
        void SaveCookieToken(string token);
        void RemoveCookieToken();
        string TakeCookieToken();
    }

    public class HttpContextService : IHttpContextService
    {
        private const string TokenCookieKey = "__asct";
        private readonly HttpContext httpContext;
        private readonly CaptchaOptions captchaOptions;

        public HttpContextService()
            : this(null, null)
        {
        }

        public HttpContextService(HttpContext httpContext, CaptchaOptions captchaOptions)
        {
            this.httpContext = httpContext ?? throw new ArgumentNullException(nameof(httpContext));
            this.captchaOptions = captchaOptions ?? throw new ArgumentNullException(nameof(captchaOptions));
        }

        public string GetClientIP()
        {
            var ip = this.httpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ??
                this.httpContext.Request.ServerVariables["REMOTE_ADDR"];

            return (string.IsNullOrEmpty(ip) || ip.Equals("::1")) ? "127.0.0.1" : ip.Split(',')[0];
        }

        public void SaveCookieToken(string token)
        {
            RemoveCookieToken();
            var cookie = new HttpCookie(TokenCookieKey)
            {
                Value = token,
                Expires = DateTime.Now.AddMinutes(captchaOptions.VerifiedMinutes),
                Secure = true
            };
            httpContext.Response.Cookies.Add(cookie);
        }

        public void RemoveCookieToken()
        {
            httpContext.Response.Cookies.Remove(TokenCookieKey);
        }

        public string TakeCookieToken()
        {
            var cookie = httpContext.Request.Cookies[TokenCookieKey];
            var token = string.Empty;
            if (cookie != null)
            {
                token = cookie.Value;
                httpContext.Response.Cookies.Remove(TokenCookieKey);
            }

            return token;
        }
    }
}
