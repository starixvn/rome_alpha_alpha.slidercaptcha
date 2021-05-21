import { loadingSvg } from "../consts";
import { CaptchaMediator, TextCaptchaData } from "../types";
import { createCanvas, createElement, loadImage } from "../utils";
import { BaseCaptcha } from "./base-captcha";

const imageWidth = 250;
const imageHeight = 50;

export class TextCaptcha extends BaseCaptcha {
  private backgroundCanvas: HTMLCanvasElement;

  private get backgroundCanvasContext() {
    return this.backgroundCanvas.getContext("2d");
  }

  constructor(mediator: CaptchaMediator) {
    super(mediator);
    this.initDOM();
  }

  private initDOM() {}

  initBody = (captchaBody: HTMLElement) => {
    const captchaWidget = captchaBody.appendChild(
      createElement("div", "captcha-widget")
    );
    this.backgroundCanvas = captchaWidget.appendChild(
      createCanvas(imageWidth, imageHeight, "captcha-background")
    );
    const loading = captchaWidget.appendChild(
      createElement("div", "captcha-loading")
    );
    loading.appendChild(
      createElement("div", "captcha-loading-icon", loadingSvg)
    );
  };

  initFooter = (captchaFooter: HTMLElement) => {};

  reset = () => {
    this.loadImages();
  };

  private loadImages = () => {
    this.mediator.generateRequest((response) => {
      const data = response.Data as TextCaptchaData;
      loadImage(data.Background, (image) => {
        this.backgroundCanvasContext.drawImage(
          image,
          0,
          0,
          image.width,
          image.height
        );
      });
    });
  };
}
