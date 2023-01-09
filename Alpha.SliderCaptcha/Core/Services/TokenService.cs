using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Alpha.SliderCaptcha.Core.Services
{
    public interface ITokenService
    {
        string Generate();

        bool IsValid(string token);
    }

    public class TokenService : ITokenService
    {
        private const string Secret = "nExDev";
        private const int TokenLength = 44;
        private const int ExpiredMinutes = 15;
        private readonly IHttpContextService httpContextService;

        public TokenService()
            : this(null)
        {
        }

        public TokenService(IHttpContextService httpContextService)
        {
            this.httpContextService = httpContextService ?? new HttpContextService();
        }

        public string Generate()
        {
            var nowString = DateTime.UtcNow.Ticks.ToString("x16");
            var clientIP = httpContextService.GetClientIP();
            var content = GenerateSHA1($"{nowString}_{clientIP}", Secret);
            return $"{nowString}{content}";
        }

        public bool IsValid(string token)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(token) && token.Length == TokenLength)
                {
                    var dateString = token.Substring(0, 16);
                    var date = new DateTime(Convert.ToInt64(dateString, 16));
                    var totalMinutes = DateTime.UtcNow.Subtract(date).TotalMinutes;
                    if (totalMinutes <= 0 || totalMinutes > ExpiredMinutes)
                    {
                        return false;
                    }

                    var tokenContent = token.Substring(16);
                    var clientIP = httpContextService.GetClientIP();
                    var content = GenerateSHA1($"{dateString}_{clientIP}", Secret);
                    if (tokenContent != content)
                    {
                        return false;
                    }

                    return true;
                }
            }
            catch
            {
                return false;
            }

            return false;
        }

        private static string GenerateSHA1(string body, string secret)
        {
            using (var sha1 = SHA1.Create())
            {
                var key1 = sha1.ComputeHash(Encoding.UTF8.GetBytes(body));
                var key2 = key1.Concat(Encoding.UTF8.GetBytes(secret)).ToArray();
                var key3 = sha1.ComputeHash(key2);
                return Convert.ToBase64String(key3);
            }
        }
    }
}