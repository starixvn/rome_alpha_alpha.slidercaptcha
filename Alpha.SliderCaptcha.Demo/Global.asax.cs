using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Alpha.SliderCaptcha.Core;
using Alpha.SliderCaptcha.Mvc;

namespace Alpha.SliderCaptcha.Demo
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            Configuration.Use(new CaptchaOptions("~/App_Data/slider-captcha", 5, 5, 1));
        }
    }
}
