using Alpha.SliderCaptcha.Core.Models;

namespace Alpha.SliderCaptcha.Core.Services
{
    public interface ICaptchaHandler
    {
        IGenerateModel Generate();

        int Validate(string input, string expected);
    }
}
