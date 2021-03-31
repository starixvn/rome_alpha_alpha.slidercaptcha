using System;
using System.Drawing;
using System.IO;

namespace Alpha.SliderCaptcha.Extensions
{
    public static class BitmapExtensions
    {
        public static string ToBase64String(this Bitmap image)
        {
            using (var stream = new MemoryStream())
            {
                image.Save(stream, image.RawFormat);
                byte[] imageBytes = stream.ToArray();
                return "data:image/jpg;base64," + Convert.ToBase64String(imageBytes);
            }
        }

        public static void Copy(Bitmap source, Point point, Bitmap target)
        {
            for (var targetX = 0; targetX < target.Width; targetX++)
            {
                var sourceX = targetX + point.X;
                for (var targetY = 0; targetY < target.Height; targetY++)
                {
                    var sourceY = targetY + point.Y;
                    var sourceColor = source.GetPixel(sourceX, sourceY);
                    var targetColor = target.GetPixel(targetX, targetY);
                    target.SetPixel(targetX, targetY, Color.FromArgb(targetColor.A, sourceColor));
                }
            }
        }
    }
}