namespace Alpha.SliderCaptcha.Services
{
    public interface IFileProvider
    {
        IImageProvider CreateImageProvider();
    }
}