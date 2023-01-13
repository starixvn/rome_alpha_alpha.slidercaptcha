using System;
using System.Drawing;
using System.Drawing.Imaging;
using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Core.Models;

namespace Alpha.SliderCaptcha.TextCaptcha.Models
{
    public class GenerateModel : IGenerateModel
    {
        bool disposed = false;

        public Bitmap Background { get; }

        public string Text { get; }

        public GenerateModel(Bitmap background, string text)
        {
            Background = background;
            Text = text;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                Background.Dispose();
            }

            disposed = true;
        }

        public string GetCacheData()
        {
            return Text;
        }

        public object GetResponseData()
        {
            return new
            {
                //Background = Background.ToBase64String(ImageFormat.Jpeg)
            };
        }
    }
}