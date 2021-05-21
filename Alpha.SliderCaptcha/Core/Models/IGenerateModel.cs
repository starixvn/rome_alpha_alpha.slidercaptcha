using System;

namespace Alpha.SliderCaptcha.Core.Models
{
    public interface IGenerateModel: IDisposable
    {
        string GetKey();

        object GetData();
    }
}
