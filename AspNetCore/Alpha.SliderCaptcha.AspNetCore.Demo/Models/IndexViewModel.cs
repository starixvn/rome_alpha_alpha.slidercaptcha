namespace Alpha.SliderCaptcha.AspNetCore.Demo.Models
{
    public class IndexViewModel
    {
        public string Username { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public bool IsTokenRequired { get; set; }
    }
}