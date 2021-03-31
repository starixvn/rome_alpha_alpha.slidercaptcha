namespace Alpha.SliderCaptcha.Models
{
    public class VerifyResult
    {
        public const int Correct = 0;
        public const int Incorrect = 1;
        public const int InvalidToken = 2;
        public const int Timeout = 3;

        public int Code { get; }

        public string Reason { get; }

        public VerifyResult(int code, string reason)
        {
            Code = code;
            Reason = reason;
        }
    }
}