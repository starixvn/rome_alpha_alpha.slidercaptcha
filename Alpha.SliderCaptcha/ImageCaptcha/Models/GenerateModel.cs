using System;
using System.Drawing;
using System.Drawing.Imaging;
using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Core.Models;

namespace Alpha.SliderCaptcha.ImageCaptcha.Models
{
    public class GenerateModel : IGenerateModel
    {
        bool disposed = false;

        public Bitmap Background { get; }

        public Bitmap Slice { get; }

        public Point Point { get; }

        public GenerateModel(Bitmap background, Bitmap slice, Point point)
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
                Background = Background.ToBase64String(ImageFormat.Jpeg),
                Slice = Slice.ToBase64String(ImageFormat.Png),
                Position = Point.Y
            };
        }
    }
}