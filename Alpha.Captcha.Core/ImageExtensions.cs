using System;
using System.IO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;

namespace Alpha.SliderCaptcha.Core
{
    public static class ImageExtensions
    {
        public static string ToBase64String(this Image image, IImageEncoder encoder)
        {
            using (var stream = new MemoryStream())
            {
                image.Save(stream, encoder);
                byte[] imageBytes = stream.ToArray();
                return "data:image/jpg;base64," + Convert.ToBase64String(imageBytes);
            }
        }
    }
}