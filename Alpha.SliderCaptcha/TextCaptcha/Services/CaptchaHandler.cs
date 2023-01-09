using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using Alpha.SliderCaptcha.Core.Models;
using Alpha.SliderCaptcha.Core.Services;
using Alpha.SliderCaptcha.TextCaptcha.Models;

namespace Alpha.SliderCaptcha.TextCaptcha.Services
{
    public class CaptchaHandler : ICaptchaHandler
    {
        private readonly IRandomService randomService;

        public CaptchaHandler(IRandomService randomService)
        {
            this.randomService = randomService ?? throw new ArgumentNullException(nameof(randomService));
        }

        public int Validate(string input, string expected)
        {
            return string.Compare(input, expected, true) == 0 ? Result.Correct : Result.Incorrect;
        }

        public IGenerateModel Generate()
        {
            var generateOptions = CaptchaProfiles.Medium;
            var text = randomService.Random(generateOptions.DefaultChars, generateOptions.TextLength);
            var image = Generate(text, generateOptions);
            return new GenerateModel(image, text);
        }

        private Bitmap Generate(string text, GenerateOptions generateOptions)
        {
            var imageSize = new Rectangle(0, 0, generateOptions.Width, generateOptions.Height);
            var captchaImage = new Bitmap(imageSize.Width, imageSize.Height, PixelFormat.Format24bppRgb);
            using (var gr = Graphics.FromImage(captchaImage))
            {
                using (var br = new SolidBrush(generateOptions.BackColor))
                {
                    gr.FillRectangle(br, imageSize);
                }

                var charOffset = 0;
                var charWidth = generateOptions.Width / text.Length;
                using (var br = new SolidBrush(generateOptions.FontColor))
                {
                    foreach (var c in text)
                    {
                        using (var fnt = GetFont(generateOptions))
                        {
                            var rectChar = new Rectangle(Convert.ToInt32(charOffset * charWidth), 0, Convert.ToInt32(charWidth), generateOptions.Height);
                            using (var graphics = TextPath(c.ToString(), fnt, rectChar))
                            {
                                WarpText(generateOptions, graphics, rectChar);
                                gr.FillPath(br, graphics);
                            }
                        }
                        charOffset += 1;
                    }
                }

                AddNoise(generateOptions, gr, imageSize);
                AddLine(generateOptions, gr, imageSize);
            }

            return captchaImage;
        }

        private string RandomFontFamily(GenerateOptions generateOptions)
        {
            return generateOptions.Fonts[randomService.Next(generateOptions.Fonts.Length)];
        }

        private PointF RandomPoint(Rectangle rect)
        {
            return RandomPoint(rect.Left, rect.Width, rect.Top, rect.Bottom);
        }

        private PointF RandomPoint(int xmin, int xmax, int ymin, int ymax)
        {
            return new PointF(randomService.Next(xmin, xmax), randomService.Next(ymin, ymax));
        }

        private GraphicsPath TextPath(string s, Font f, Rectangle r)
        {
            using (var sf = new StringFormat
            {
                Alignment = StringAlignment.Near,
                LineAlignment = StringAlignment.Near
            })
            {
                var gp = new GraphicsPath();
                gp.AddString(s, f.FontFamily, (int)f.Style, f.Size, r, sf);
                return gp;
            }
        }

        private Font GetFont(GenerateOptions generateOptions)
        {
            var density = 0f;
            switch (generateOptions.FontWarp)
            {
                case FontWarpFactors.None:
                    density = 0.7f;
                    break;
                case FontWarpFactors.Low:
                    density = 0.8f;
                    break;
                case FontWarpFactors.Medium:
                    density = 0.85f;
                    break;
                case FontWarpFactors.High:
                    density = 0.9f;
                    break;
                case FontWarpFactors.Extreme:
                    density = 0.95f;
                    break;
            }

            var fname = RandomFontFamily(generateOptions);
            var fsize = Convert.ToInt32(generateOptions.Height * density);
            return new Font(fname, fsize, FontStyle.Bold);
        }

        private void WarpText(GenerateOptions generateOptions, GraphicsPath textPath, Rectangle rect)
        {
            float WarpDivisor = 1.0f;
            float RangeModifier = 1.0f;
            switch (generateOptions.FontWarp)
            {
                case FontWarpFactors.None:
                    return;
                case FontWarpFactors.Low:
                    WarpDivisor = 6;
                    RangeModifier = 1;
                    break;
                case FontWarpFactors.Medium:
                    WarpDivisor = 5;
                    RangeModifier = 1.3f;
                    break;
                case FontWarpFactors.High:
                    WarpDivisor = 4.5f;
                    RangeModifier = 1.4f;
                    break;
                case FontWarpFactors.Extreme:
                    WarpDivisor = 4;
                    RangeModifier = 1.5f;
                    break;
            }

            var rectF = new RectangleF(Convert.ToSingle(rect.Left), 0, Convert.ToSingle(rect.Width), rect.Height);
            var hrange = Convert.ToInt32(rect.Height / WarpDivisor);
            var wrange = Convert.ToInt32(rect.Width / WarpDivisor);
            var left = Math.Max(rect.Left - Convert.ToInt32(wrange * RangeModifier), 0);
            var top = Math.Max(rect.Top - Convert.ToInt32(hrange * RangeModifier), 0);
            var width = Math.Min(rect.Left + rect.Width + Convert.ToInt32(wrange * RangeModifier), generateOptions.Width);
            var height = Math.Min(rect.Top + rect.Height + Convert.ToInt32(hrange * RangeModifier), generateOptions.Height);
            var leftTop = RandomPoint(left, left + wrange, top, top + hrange);
            var rightTop = RandomPoint(width - wrange, width, top, top + hrange);
            var leftBottom = RandomPoint(left, left + wrange, height - hrange, height);
            var rightBottom = RandomPoint(width - wrange, width, height - hrange, height);
            var points = new PointF[] { leftTop, rightTop, leftBottom, rightBottom };
            using (var m = new Matrix())
            {
                m.Translate(0, 0);
                textPath.Warp(points, rectF, m, WarpMode.Perspective, 0);
            }
        }

        private void AddNoise(GenerateOptions generateOptions, Graphics graphics, Rectangle rect)
        {
            int density = 0;
            int size = 0;
            switch (generateOptions.BackgroundNoise)
            {
                case BackgroundNoiseLevels.None:
                    return;
                case BackgroundNoiseLevels.Low:
                    density = 30;
                    size = 40;
                    break;
                case BackgroundNoiseLevels.Medium:
                    density = 18;
                    size = 40;
                    break;
                case BackgroundNoiseLevels.High:
                    density = 16;
                    size = 39;
                    break;
                case BackgroundNoiseLevels.Extreme:
                    density = 12;
                    size = 38;
                    break;
            }

            using (var br = new SolidBrush(generateOptions.NoiseColor))
            {
                var max = Convert.ToInt32(Math.Max(rect.Width, rect.Height) / size);
                for (var i = 0; i <= Convert.ToInt32((rect.Width * rect.Height) / density); i++)
                {
                    graphics.FillEllipse(br, randomService.Next(rect.Width), randomService.Next(rect.Height), randomService.Next(max), randomService.Next(max));
                }
            }
        }

        private void AddLine(GenerateOptions generateOptions, Graphics graphics, Rectangle rect)
        {
            int length = 0;
            float width = 1.0f;
            int linecount = 0;
            switch (generateOptions.LineNoise)
            {
                case LineNoiseLevels.None:
                    break;
                case LineNoiseLevels.Low:
                    length = 4;
                    width = Convert.ToSingle(generateOptions.Height / 31.25);
                    // 1.6
                    linecount = 1;
                    break;
                case LineNoiseLevels.Medium:
                    length = 5;
                    width = Convert.ToSingle(generateOptions.Height / 27.7777);
                    // 1.8
                    linecount = 1;
                    break;
                case LineNoiseLevels.High:
                    length = 3;
                    width = Convert.ToSingle(generateOptions.Height / 25);
                    // 2.0
                    linecount = 2;
                    break;
                case LineNoiseLevels.Extreme:
                    length = 3;
                    width = Convert.ToSingle(generateOptions.Height / 22.7272);
                    // 2.2
                    linecount = 3;
                    break;
            }

            var pf = new PointF[length + 1];
            using (var p = new Pen(generateOptions.LineColor, width))
            {
                for (var l = 1; l <= linecount; l++)
                {
                    for (var i = 0; i <= length; i++)
                    {
                        pf[i] = RandomPoint(rect);
                    }

                    graphics.DrawCurve(p, pf, 1.75f);
                }
            }
        }
    }
}