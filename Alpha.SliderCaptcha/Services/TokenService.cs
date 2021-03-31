using System;

namespace Alpha.SliderCaptcha.Services
{
    public interface ITokenService
    {
        string Generate();

        bool IsValid(string token);
    }

    public class TokenService : ITokenService
    {
        private static readonly int TokenLength = GenerateNewGuid().Length;

        private static string GenerateNewGuid()
        {
            return Guid.NewGuid().ToString("N");
        }

        public string Generate()
        {
            return GenerateNewGuid();
        }

        public bool IsValid(string token)
        {
            return !string.IsNullOrWhiteSpace(token) && token.Length == TokenLength;
        }
    }
}