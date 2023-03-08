using System;
using Alpha.Captcha.Core.Models;
using Alpha.SliderCaptcha.Core;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;

namespace Alpha.SliderCaptcha.Models
{
    public class GenerateModel : IGenerateModel
    {
        bool disposed = false;

        public Image Background { get; }

        public Image Slice { get; }

        public Point Point { get; }

        public GenerateModel(Image background, Image slice, Point point)
        {
            Background = background;
            Slice = slice;
            Point = point;
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
                Slice.Dispose();
            }

            disposed = true;
        }

        public string GetCacheData()
        {
            return Point.X.ToString();
        }

        public object GetResponseData()
        {
            return new
            {
                Background = Background.ToBase64String(new JpegEncoder()),
                Slice = Slice.ToBase64String(new PngEncoder()),
                Position = Point.Y
            };
        }
    }
}