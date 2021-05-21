using System;
using System.IO;
using System.Web;
using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Core.Services;

namespace Alpha.SliderCaptcha.ImageCaptcha.Services
{
    public interface IFileProvider
    {
        IImageProvider CreateImageProvider();
    }

    public class FileProvider : IFileProvider
    {
        private readonly IRandomService randomService;
        private readonly string[] sliderPaths;
        private readonly string[] backgroundFiles;

        public FileProvider(CaptchaOptions captchaOptions, IRandomService randomService)
        {
            captchaOptions = captchaOptions ?? throw new ArgumentNullException(nameof(captchaOptions));
            this.randomService = randomService ?? throw new ArgumentNullException(nameof(randomService));

            var imagePath = captchaOptions.ImagePath.StartsWith("~") ? HttpContext.Current.Server.MapPath(captchaOptions.ImagePath) : captchaOptions.ImagePath;
            sliderPaths = Directory.GetDirectories(Path.Combine(imagePath, "sliders"));
            backgroundFiles = Directory.GetFiles(Path.Combine(imagePath, "backgrounds"));
        }

        public IImageProvider CreateImageProvider()
        {
            var backgroundFile = backgroundFiles[randomService.Next(backgroundFiles.Length)];
            var sliderPath = sliderPaths[randomService.Next(sliderPaths.Length)];
            return new ImageProvider(backgroundFile, sliderPath);
        }
    }
}