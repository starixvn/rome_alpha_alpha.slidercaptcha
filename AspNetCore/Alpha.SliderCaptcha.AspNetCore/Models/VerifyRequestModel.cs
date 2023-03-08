namespace Alpha.SliderCaptcha.AspNetCore.Models
{
    public class VerifyRequestModel
    {
        public string Token { get; set; }

        public string Key { get; set; }

        public string Data { get; set; }
    }
}