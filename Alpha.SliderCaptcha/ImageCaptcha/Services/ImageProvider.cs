using System.Drawing;
using System.IO;

namespace Alpha.SliderCaptcha.ImageCaptcha.Services
{
    public interface IImageProvider
    {
        Bitmap LoadBackground();

        Bitmap LoadSliderAlpha();

        Bitmap LoadSliderBorder();

        Bitmap LoadSliderBase();

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

        public Bitmap LoadBackground()
        {
            return new Bitmap(backgroundFile);
        }

        public Bitmap LoadSliderAlpha()
        {
            return new Bitmap(Path.Combine(sliderPath, "alpha.png"));
        }

        public Bitmap LoadSliderBorder()
        {
            return new Bitmap(Path.Combine(sliderPath, "border.png"));
        }

        public Bitmap LoadSliderBase()
        {
            return new Bitmap(Path.Combine(sliderPath, "base.png"));
        }
    }
}