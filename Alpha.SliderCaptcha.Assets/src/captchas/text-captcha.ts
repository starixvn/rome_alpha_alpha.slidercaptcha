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
  private _backgroundCanvas: HTMLCanvasElement;
  private _loading: HTMLElement;
  private _inputElement: HTMLInputElement;
  private _buttonElement: HTMLButtonElement;

  private get backgroundCanvasContext() {
    return this._backgroundCanvas.getContext("2d");
  }

  constructor(_mediator: CaptchaMediator) {
    super(_mediator);
    this.initDOM();
  }

  private initDOM() {}

  isForceReset = () => false;

  initBody = (captchaBody: HTMLElement) => {
    const captchaWidget = captchaBody.appendChild(
      createElement("div", "captcha-widget")
    );
    setClientSize(captchaWidget, imageWidth, imageHeight);
    this._backgroundCanvas = captchaWidget.appendChild(
      createCanvas(imageWidth, imageHeight, "captcha-background")
    );
    const loading = captchaWidget.appendChild(
      createElement("div", "captcha-loading")
    );
    loading.appendChild(
      createElement("div", "captcha-loading-icon", loadingSvg)
    );
    this._loading = loading.appendChild(
      createElement(
        "span",
        "",
        this._mediator.getLangResource().captcha_loading
      )
    );
  };

  initFooter = (captchaFooter: HTMLElement) => {
    const langResource = this._mediator.getLangResource();
    this._inputElement = captchaFooter.appendChild(
      createElement("input", "captcha-verify-input")
    ) as HTMLInputElement;
    this._inputElement.placeholder = langResource.validate_placeholder;
    this._buttonElement = captchaFooter.appendChild(
      createElement(
        "button",
        "captcha-verify-button",
        langResource.validate_button
      )
    ) as HTMLButtonElement;
    this._buttonElement.addEventListener("click", (e) => this.verifyClicked(e));
  };

  private verifyClicked = (e: MouseEvent) => {
    e.preventDefault();
    const status = this._mediator.getStatus();
    if (status === CaptchaStatus.Loading || status === CaptchaStatus.Validate) {
      return;
    }

    const langResource = this._mediator.getLangResource();
    const value = this._inputElement.value;
    if (!value) {
      this._mediator.setStatus(CaptchaStatus.Fail);
      this._mediator.showMessage(langResource.validate_fail_message);
      return;
    }

    this._buttonElement.disabled = true;
    this._mediator.makeValidateRequest(value, () => {
      this._buttonElement.disabled = false;
      const status = this._mediator.getStatus();
      if (status === CaptchaStatus.Fail) {
        this._mediator.showMessage(langResource.validate_fail_message);
      }
    });
  };

  reset = (isRefresh: boolean) => {
    if (isRefresh) {
      const clearCanvasContext = (canvasContext: CanvasRenderingContext2D) => {
        canvasContext.clearRect(0, 0, imageWidth, imageHeight);
      };
      this._inputElement.value = "";
      this._mediator.setStatus(CaptchaStatus.Loading);
      clearCanvasContext(this.backgroundCanvasContext);
      this.loadImages();
    } else {
      this._mediator.hideMessage();
    }
  };

  private loadImages = () => {
    this._mediator.makeGenerateRequest((response) => {
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
    const langResource = this._mediator.getLangResource();
    this._loading.innerHTML = langResource.captcha_loading;
    this._buttonElement.innerHTML = langResource.validate_button;
  };
}
