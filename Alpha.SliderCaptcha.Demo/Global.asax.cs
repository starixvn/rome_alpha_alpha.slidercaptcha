using System.Configuration;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Alpha.SliderCaptcha.Mvc;
using Fanex.Logging;
using Fanex.Logging.Extensions;
using Fanex.Logging.Extensions.Web;
using Fanex.Logging.RabbitMQ;

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
            LogManager.SetDefaultLogCategory(ConfigurationManager.AppSettings["Fanex.Logging:DefaultCategory"])
                .Use(new RabbitMQLogging(ConfigurationManager.AppSettings["Fanex.Logging:RabbitMQConnectionStrings"]));
            ExceptionHandler.UseConfig(new LoggingConfiguration());
            SliderCaptchaHandler.Use();
        }
    }
}
