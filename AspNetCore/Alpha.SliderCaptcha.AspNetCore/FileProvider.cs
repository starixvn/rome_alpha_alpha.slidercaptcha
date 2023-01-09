using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Core.Services;
using Alpha.SliderCaptcha.ImageCaptcha.Services;

namespace Alpha.SliderCaptcha.AspNetCore
{
    public class FileProvider : IFileProvider
    {
        private readonly string[] sliderPaths;
        private readonly string[] backgroundFiles;
        private readonly IRandomService randomService;

        public FileProvider(
            IWebHostEnvironment webHostEnvironment,
            CaptchaOptions captchaOptions,
            IRandomService randomService)
        {
            this.randomService = randomService;

            var imagePath = Path.Combine(webHostEnvironment.ContentRootPath, captchaOptions.ImagePath);
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