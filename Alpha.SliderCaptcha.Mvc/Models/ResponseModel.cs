namespace Alpha.SliderCaptcha.Mvc.Models
{
    public class ResponseModel
    {
        public const int SuccessCode = 0;

        public int Code { get; }

        public string Message { get; }

        public bool IsSuccess => Code == SuccessCode;

        public ResponseModel(int code, string message)
        {
            Code = code;
            Message = message;
        }

        public static ResponseModel Success => new ResponseModel(SuccessCode, string.Empty);
    }
}