using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Alpha.SliderCaptcha.AspNetCore.Demo.Models;
using Fanex.Caching;
using Alpha.Captcha.Core.Services;

namespace Alpha.SliderCaptcha.AspNetCore.Demo.Controllers;

public class HomeController : Controller
{
    private readonly ICaptchaService captchaService;
    private readonly ICacheService cacheService;
    private readonly IHttpContextService httpContextService;

    public HomeController(ICaptchaService captchaService, ICacheService cacheService, IHttpContextService httpContextService)
    {
        this.captchaService = captchaService;
        this.cacheService = cacheService;
        this.httpContextService = httpContextService;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View(new IndexViewModel());
    }

    [HttpPost]
    public async Task<ActionResult> Index(IndexModel model)
    {
        var isSuccess = false;
        var key = GetLoginCacheKey(model);
        string message;
        if (cacheService.Contain(key))
        {
            var isVerifiedResult = await captchaService.IsVerified(model.Token).ConfigureAwait(false);
            if (isVerifiedResult.IsSuccess)
            {
                cacheService.Remove(key);
                return View(VerifyLogin(model));
            }
            else
            {
                message = "Please verify you are not a robot";
            }
        }
        else
        {
            return View(VerifyLogin(model));
        }

        return View(new IndexViewModel
        {
            Username = model.Username,
            Message = message,
            IsTokenRequired = !isSuccess
        });
    }

    private string GetLoginCacheKey(IndexModel model)
    {
        return $"{model.Username}_{httpContextService.GetClientIP()}";
    }

    private IndexViewModel VerifyLogin(IndexModel model)
    {
        var isSuccess = model.Username == "admin" && model.Password == "admin";
        if (isSuccess)
        {
            return new IndexViewModel
            {
                Username = model.Username,
                Message = "Login successfully",
                IsTokenRequired = false
            };
        }
        else
        {
            var key = GetLoginCacheKey(model);
            cacheService.Set(key, 1, new CacheItemOptions
            {
                SlidingExpiration = TimeSpan.FromMinutes(5)
            });
            return new IndexViewModel
            {
                Username = model.Username,
                Message = "Wrong username/password",
                IsTokenRequired = true
            };
        }
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
