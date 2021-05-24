using System;
using System.Drawing;
using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Core.Models;
using Alpha.SliderCaptcha.Core.Services;
using Alpha.SliderCaptcha.ImageCaptcha.Models;

namespace Alpha.SliderCaptcha.ImageCaptcha.Services
{
    public class CaptchaHandler : ICaptchaHandler
    {
        private readonly CaptchaOptions captchaOptions;
        private readonly IRandomService randomService;
        private readonly IFileProvider fileProvider;

        public CaptchaHandler(CaptchaOptions captchaOptions, IRandomService randomService, IFileProvider fileProvider)
        {
            this.captchaOptions = captchaOptions ?? throw new ArgumentNullException(nameof(captchaOptions));
            this.randomService = randomService ?? throw new ArgumentNullException(nameof(randomService));
            this.fileProvider = fileProvider ?? throw new ArgumentNullException(nameof(fileProvider));
        }

        public int Validate(string input, string expected)
        {
            if (!int.TryParse(input, out var inputPosition) || !int.TryParse(expected, out var expectedPosition))
            {
                return VerifyResult.Incorrect;
            }

            var isSuccess = Math.Abs(inputPosition - expectedPosition) <= captchaOptions.AcceptRange;
            if (!isSuccess)
            {
                return VerifyResult.Incorrect;
            }

            return VerifyResult.Correct;
        }

        public IGenerateModel Generate()
        {
            var imageProvider = fileProvider.CreateImageProvider();
            var background = imageProvider.LoadBackground();
            var sliderAlpha = imageProvider.LoadSliderAlpha();
            var x = randomService.Next(sliderAlpha.Width, background.Width - sliderAlpha.Width);
            var y = randomService.Next(background.Height - sliderAlpha.Height);
            var point = new Point(x, y);
            using (var sliderBorder = imageProvider.LoadSliderBorder())
            using (var sliderBase = imageProvider.LoadSliderBase())
            {
                BitmapExtensions.Copy(background, point, sliderAlpha);
                using (var sliderGraphics = Graphics.FromImage(sliderAlpha))
                using (var backgroundGraphics = Graphics.FromImage(background))
                {
                    sliderGraphics.DrawImage(sliderBorder, 0, 0, sliderBorder.Width, sliderBorder.Height);
                    backgroundGraphics.DrawImage(sliderBase, point.X, point.Y, sliderBase.Width, sliderBase.Height);
                }
            }

            return new GenerateModel(background, sliderAlpha, point);
        }
    }
}