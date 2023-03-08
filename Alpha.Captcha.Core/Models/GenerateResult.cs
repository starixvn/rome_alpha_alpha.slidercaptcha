namespace Alpha.Captcha.Core.Models
{
    public class GenerateResult
    {
        public string Token { get; }

        public object Data { get; }

        public GenerateResult(string token, object data)
        {
            Token = token;
            Data = data;
        }
    }
}