using System;

namespace Alpha.SliderCaptcha.Services
{
    public interface IRandomService
    {
        int Next(int maxValue);

        int Next(int minValue, int maxValue);
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
    }
}