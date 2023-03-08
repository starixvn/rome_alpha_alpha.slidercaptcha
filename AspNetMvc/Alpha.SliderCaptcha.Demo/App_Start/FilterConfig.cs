using System.Web;
using System.Web.Mvc;

namespace Alpha.SliderCaptcha.Demo
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
