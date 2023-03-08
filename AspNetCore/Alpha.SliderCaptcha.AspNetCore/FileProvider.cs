using Alpha.Captcha.Core;
using Alpha.Captcha.Core.Services;
using Alpha.SliderCaptcha.Services;
using Microsoft.AspNetCore.Hosting;

namespace Alpha.SliderCaptcha.AspNetCore
{
    public class FileProvider : IFileProvider
    {
        private readonly string[] sliderPaths;
        private readonly string[] backgroundFiles;
        private readonly IRandomService randomService;

        public FileProvider(
            IHostingEnvironment hostingEnvironment,
            CaptchaOptions captchaOptions,
            IRandomService randomService)
        {
            this.randomService = randomService;

            var imagePath = Path.Combine(hostingEnvironment?.ContentRootPath, captchaOptions?.ImagePath);
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