using System;
using System.Text;

namespace Alpha.SliderCaptcha.Core.Services
{
    public interface IRandomService
    {
        int Next(int maxValue);

        int Next(int minValue, int maxValue);

        string Random(char[] chars, int length);
    }

    public class RandomService : IRandomService
    {
        private readonly Random random = new Random(DateTime.Now.Millisecond);

        public int Next(int maxValue)
        {
            return random.Next(maxValue);
        }

        public int Next(int minValue, int maxValue)
        {
            return random.Next(minValue, maxValue);
        }

        public string Random(char[] chars, int length)
        {
            var sb = new StringBuilder(length);
            for (var i = 0; i < length; i++)
            {
                sb.Append(chars[Next(chars.Length)]);
            }

            return sb.ToString();
        }
    }
}