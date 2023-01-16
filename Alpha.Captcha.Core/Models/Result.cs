namespace Alpha.Captcha.Core.Models
{
    public class Result
    {
        public const int Correct = 0;
        public const int Incorrect = 1;
        public const int InvalidToken = 2;
        public const int Timeout = 3;

        public int Code { get; }

        public string Reason { get; }

        public string Detail { get; }

        public bool IsSuccess => Code == Correct;

        public Result(int code, string reason)
            : this(code, reason, string.Empty)
        {
        }

        public Result(int code, string reason, string detail)
        {
            Code = code;
            Reason = reason;
            Detail = detail;
        }
    }
}