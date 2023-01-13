using System;
using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Core.Models;
using Alpha.SliderCaptcha.Core.Services;
using Alpha.SliderCaptcha.ImageCaptcha.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

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
                return Result.Incorrect;
            }

            var isSuccess = Math.Abs(inputPosition - expectedPosition) <= captchaOptions.AcceptRange;
            if (!isSuccess)
            {
                return Result.Incorrect;
            }

            return Result.Correct;
        }

        public IGenerateModel Generate()
        {
            var imageProvider = fileProvider.CreateImageProvider();
            var background = Image.Load<Rgba32>(imageProvider.BackgroundFile);
            var sliderAlpha = Image.Load<Rgba32>(imageProvider.AlphaSliderPath);
            var x = randomService.Next(sliderAlpha.Width, background.Width - sliderAlpha.Width);
            var y = randomService.Next(background.Height - sliderAlpha.Height);
            var point = new Point(x, y);
            var targetArea = sliderAlpha.Bounds();
            var height = targetArea.Height;
            sliderAlpha.ProcessPixelRows(background, (targetAccessor, sourceAccessor) =>
            {
                for (int i = 0; i < targetAccessor.Height; i++)
                {
                    Span<Rgba32> sourceRow = sourceAccessor.GetRowSpan(point.Y + i);
                    Span<Rgba32> targetRow = targetAccessor.GetRowSpan(i);
                    for (int j = 0; j < targetRow.Length; j++)
                    {
                        ref Rgba32 pixel = ref targetRow[j];
                        if (pixel.A != 0)
                        {
                            pixel = sourceRow[j];
                        }
                    }

                }
            });

            var sliderBorder = Image.Load(imageProvider.BorderPath);
            var sliderBase = Image.Load(imageProvider.BasePath);
            sliderAlpha.Mutate(p => p.DrawImage(sliderBorder, new Point(0, 0), 1));
            background.Mutate(p => p.DrawImage(sliderBase, point, 1));

            return new GenerateModel(background, sliderAlpha, point);
        }
    }
}