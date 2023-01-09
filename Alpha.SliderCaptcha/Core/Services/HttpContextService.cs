namespace Alpha.SliderCaptcha.Core.Services
{
    public interface IHttpContextService
    {
        string GetClientIP();
        void SaveCookieToken(string token);
        void RemoveCookieToken();
        string TakeCookieToken();
    }
}
