using Alpha.Captcha.Core.Models;

namespace Alpha.Captcha.Core.Services
{
    public interface ICaptchaHandler
    {
        IGenerateModel Generate();

        int Validate(string input, string expected);
    }
}
