using System;

namespace Alpha.Captcha.Core.Models
{
    public interface IGenerateModel : IDisposable
    {
        string GetCacheData();

        object GetResponseData();
    }
}
