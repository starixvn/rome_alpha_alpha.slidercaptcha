using System.Configuration;

namespace Alpha.SliderCaptcha.Mvc
{
    public sealed class SliderCaptchaConfiguration : ConfigurationSection
    {
        public static readonly SliderCaptchaConfiguration Default = Get("Alpha.SliderCaptcha");

        public static SliderCaptchaConfiguration Get(string sectionName)
        {
            return ConfigurationManager.GetSection(sectionName) as SliderCaptchaConfiguration;
        }

        [ConfigurationProperty("logEnabled", DefaultValue = false)]
        public bool LogEnabled
        {
            get
            {
                return (bool)this["logEnabled"];
            }
        }

        [ConfigurationProperty("imagePath", IsRequired = true)]
        public string ImagePath
        {
            get
            {
                return (string)this["imagePath"];
            }
        }

        [ConfigurationProperty("dragTimeout", DefaultValue = 30)]
        public int DragTimeout
        {
            get
            {
                return (int)this["dragTimeout"];
            }
        }

        [ConfigurationProperty("verifyTimeout", DefaultValue = 30)]
        public int VerifyTimeout
        {
            get
            {
                return (int)this["verifyTimeout"];
            }
        }

        [ConfigurationProperty("acceptRange", DefaultValue = 5)]
        public int AcceptRange
        {
            get
            {
                return (int)this["acceptRange"];
            }
        }
    }
}
