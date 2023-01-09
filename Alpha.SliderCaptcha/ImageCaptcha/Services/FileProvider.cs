namespace Alpha.SliderCaptcha.ImageCaptcha.Services
{
    public interface IFileProvider
    {
        IImageProvider CreateImageProvider();
    }
}