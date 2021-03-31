using System;
using System.Drawing;

namespace Alpha.SliderCaptcha.Models
{
    public class GenerateModel : IDisposable
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
    }
}