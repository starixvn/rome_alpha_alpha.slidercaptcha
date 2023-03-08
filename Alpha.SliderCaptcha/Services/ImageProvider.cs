using System.IO;

namespace Alpha.SliderCaptcha.Services
{
    public interface IImageProvider
    {
        string BackgroundFile { get; }

        string AlphaSliderPath { get; }

        string BasePath { get; }

        string BorderPath { get; }
    }

    public class ImageProvider : IImageProvider
    {
        private readonly string backgroundFile;
        private readonly string sliderPath;

        public ImageProvider(string backgroundFile, string sliderPath)
        {
            this.backgroundFile = backgroundFile;
            this.sliderPath = sliderPath;
        }

        public string BackgroundFile => backgroundFile;

        public string AlphaSliderPath => Path.Combine(sliderPath, "alpha.png");

        public string BasePath => Path.Combine(sliderPath, "base.png");

        public string BorderPath => Path.Combine(sliderPath, "border.png");
    }
}