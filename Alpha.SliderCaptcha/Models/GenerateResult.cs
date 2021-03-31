namespace Alpha.SliderCaptcha.Models
{
    public class GenerateResult
    {
        public string Token { get; }

        public string Background { get; }

        public string Slice { get; }

        public int Position { get; }

        public GenerateResult(string token, string background, string slice, int position)
        {
            Token = token;
            Background = background;
            Slice = slice;
            Position = position;
        }
    }
}