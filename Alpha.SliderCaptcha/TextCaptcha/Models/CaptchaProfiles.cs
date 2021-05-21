using System.Drawing;

namespace Alpha.SliderCaptcha.TextCaptcha.Models
{
    public static class CaptchaProfiles
    {
        private static readonly int DefaultWidth = 250;
        private static readonly int DefaultHeight = 50;
        private static readonly Color DefaultBackColor = Color.White;
        private static readonly Color DefaultFontColor = Color.Black;
        private static readonly Color DefaultNoiseColor = Color.Black;
        private static readonly Color DefaultLineColor = Color.Black;

        private static readonly string[] DefaultFonts = new[] {
            "arial",
            "arial black",
            "comic sans ms",
            "courier new",
            "estrangelo edessa",
            "franklin gothic medium",
            "georgia",
            "lucida console",
            "lucida sans unicode",
            "mangal",
            "microsoft sans serif",
            "palatino linotype",
            "sylfaen",
            "tahoma",
            "times new roman",
            "trebuchet ms",
            "verdana"
        };

        public static readonly GenerateOptions Low = new GenerateOptions(
            DefaultWidth,
            DefaultHeight,
            DefaultBackColor,
            DefaultFontColor,
            DefaultNoiseColor,
            DefaultLineColor,
            FontWarpFactors.Low,
            BackgroundNoiseLevels.Low,
            LineNoiseLevels.Low,
            DefaultFonts);

        public static readonly GenerateOptions Medium = new GenerateOptions(
            DefaultWidth,
            DefaultHeight,
            DefaultBackColor,
            DefaultFontColor,
            DefaultNoiseColor,
            DefaultLineColor,
            FontWarpFactors.Medium,
            BackgroundNoiseLevels.Medium,
            LineNoiseLevels.Medium,
            DefaultFonts);

        public static readonly GenerateOptions High = new GenerateOptions(
            DefaultWidth,
            DefaultHeight,
            DefaultBackColor,
            DefaultFontColor,
            DefaultNoiseColor,
            DefaultLineColor,
            FontWarpFactors.High,
            BackgroundNoiseLevels.High,
            LineNoiseLevels.High,
            DefaultFonts);

        public static readonly GenerateOptions Extreme = new GenerateOptions(
            DefaultWidth,
            DefaultHeight,
            DefaultBackColor,
            DefaultFontColor,
            DefaultNoiseColor,
            DefaultLineColor,
            FontWarpFactors.Extreme,
            BackgroundNoiseLevels.Extreme,
            LineNoiseLevels.Extreme,
            DefaultFonts);
    }
}
