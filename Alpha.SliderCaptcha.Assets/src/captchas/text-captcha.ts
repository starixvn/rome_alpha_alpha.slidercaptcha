import { loadingSvg } from "../consts";
import { CaptchaMediator, CaptchaStatus, TextCaptchaData } from "../types";
import {
  createCanvas,
  createElement,
  loadImage,
  setClientSize,
} from "../utils";
import { BaseCaptcha } from "./base-captcha";

const imageWidth = 240;
const imageHeight = imageWidth / 4;

export class TextCaptcha extends BaseCaptcha {
  private backgroundCanvas: HTMLCanvasElement;
  private loading: HTMLElement;
  private input: HTMLInputElement;
  private button: HTMLButtonElement;

  private get backgroundCanvasContext() {
    return this.backgroundCanvas.getContext("2d");
  }

  constructor(mediator: CaptchaMediator) {
    super(mediator);
    this.initDOM();
  }

  private initDOM() {}

  isForceReset = () => false;

  initBody = (captchaBody: HTMLElement) => {
    const captchaWidget = captchaBody.appendChild(
      createElement("div", "captcha-widget")
    );
    setClientSize(captchaWidget, imageWidth, imageHeight);
    this.backgroundCanvas = captchaWidget.appendChild(
      createCanvas(imageWidth, imageHeight, "captcha-background")
    );
    const loading = captchaWidget.appendChild(
      createElement("div", "captcha-loading")
    );
    loading.appendChild(
      createElement("div", "captcha-loading-icon", loadingSvg)
    );
    this.loading = loading.appendChild(
      createElement("span", "", this.mediator.getLangResource().captcha_loading)
    );
  };

  initFooter = (captchaFooter: HTMLElement) => {
    const langResource = this.mediator.getLangResource();
    this.input = captchaFooter.appendChild(
      createElement("input", "captcha-verify-input")
    ) as HTMLInputElement;
    this.input.placeholder = langResource.verify_placeholder;
    this.button = captchaFooter.appendChild(
      createElement("button", "captcha-verify-button", langResource.verify)
    ) as HTMLButtonElement;
    this.button.addEventListener("click", (e) => this.verifyClicked(e));
  };

  private verifyClicked = (e: MouseEvent) => {
    e.preventDefault();
    const status = this.mediator.getStatus();
    if (status === CaptchaStatus.Lock) {
      return;
    }

    const langResource = this.mediator.getLangResource();
    const value = this.input.value;
    if (!value) {
      this.mediator.setStatus(CaptchaStatus.Fail);
      this.mediator.showMessage(langResource.fail_message);
      return;
    }

    this.button.disabled = true;
    this.mediator.validateRequest(value, () => {
      this.button.disabled = false;
      const status = this.mediator.getStatus();
      if (status === CaptchaStatus.Fail) {
        this.mediator.showMessage(langResource.fail_message);
      }
    });
  };

  reset = () => {
    const clearCanvasContext = (canvasContext: CanvasRenderingContext2D) => {
      canvasContext.clearRect(0, 0, imageWidth, imageHeight);
    };

    this.mediator.setStatus(CaptchaStatus.Loading);
    clearCanvasContext(this.backgroundCanvasContext);
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

  changeLanguage = () => {
    const langResource = this.mediator.getLangResource();
    this.loading.innerHTML = langResource.captcha_loading;
    this.button.innerHTML = langResource.verify;
  };
}
