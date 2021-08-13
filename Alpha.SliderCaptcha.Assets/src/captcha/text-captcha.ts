import { _loadingSvg } from "../constants";
import { _CaptchaMediator, _CaptchaStatus, _TextCaptchaData } from "../types";
import {
  _createCanvas,
  _createElement,
  _loadImage,
  _setClientSize,
} from "../utils";
import { _BaseCaptcha } from "./base-captcha";

const _imageWidth = 240;
const _imageHeight = _imageWidth / 4;

export class _TextCaptcha extends _BaseCaptcha {
  private _backgroundCanvas: HTMLCanvasElement;
  private _loading: HTMLElement;
  private _inputElement: HTMLInputElement;
  private _buttonElement: HTMLButtonElement;
  private _buttonEvent;

  private get _backgroundCanvasContext() {
    return this._backgroundCanvas.getContext("2d");
  }

  constructor(_mediator: _CaptchaMediator) {
    super(_mediator);
    this._initDOM();
  }

  private _initDOM() {}

  _initBody = (captchaBody: HTMLElement) => {
    const captchaWidget = captchaBody.appendChild(
      _createElement("div", "captcha-widget")
    );
    _setClientSize(captchaWidget, _imageWidth, _imageHeight);
    this._backgroundCanvas = captchaWidget.appendChild(
      _createCanvas(_imageWidth, _imageHeight, "captcha-background")
    );
    const loading = captchaWidget.appendChild(
      _createElement("div", "captcha-loading")
    );
    loading.appendChild(
      _createElement("div", "captcha-loading-icon", _loadingSvg)
    );
    this._loading = loading.appendChild(
      _createElement(
        "span",
        "",
        this._mediator._getLangResource()._captcha_loading
      )
    );
  };

  _initFooter = (captchaFooter: HTMLElement) => {
    const langResource = this._mediator._getLangResource();
    this._inputElement = captchaFooter.appendChild(
      _createElement("input", "captcha-verify-input")
    ) as HTMLInputElement;
    this._inputElement.placeholder = langResource._validate_placeholder;
    this._inputElement.autocomplete = 'off';
    this._buttonElement = captchaFooter.appendChild(
      _createElement(
        "button",
        "captcha-verify-button",
        langResource._validate_button
      )
    ) as HTMLButtonElement;
    this._buttonElement.addEventListener(
      "click",
      (this._buttonEvent = (e: MouseEvent) => this._verifyClicked(e))
    );
  };

  private _verifyClicked = (e: MouseEvent) => {
    e.preventDefault();
    const status = this._mediator._getStatus();
    if (status === _CaptchaStatus.Loading || status === _CaptchaStatus.Validate) {
      return;
    }

    const langResource = this._mediator._getLangResource();
    const value = this._inputElement.value;
    if (!value) {
      this._mediator._setStatus(_CaptchaStatus.Fail);
      this._mediator._showMessage(langResource._validate_fail_message);
      return;
    }

    this._buttonElement.disabled = true;
    this._mediator._makeValidateRequest(value, () => {
      this._buttonElement.disabled = false;
      const status = this._mediator._getStatus();
      if (status === _CaptchaStatus.Fail) {
        this._mediator._showMessage(langResource._validate_fail_message);
      }
    });
  };

  private _loadImages = () => {
    this._mediator._makeGenerateRequest((response) => {
      const data = response.Data as _TextCaptchaData;
      _loadImage(data.Background, (image) => {
        this._backgroundCanvasContext.drawImage(
          image,
          0,
          0,
          image.width,
          image.height
        );
      });
    });
  };

  reset = (isRefresh: boolean) => {
    if (isRefresh) {
      const clearCanvasContext = (canvasContext: CanvasRenderingContext2D) => {
        canvasContext.clearRect(0, 0, _imageWidth, _imageHeight);
      };
      this._inputElement.value = "";
      this._mediator._setStatus(_CaptchaStatus.Loading);
      clearCanvasContext(this._backgroundCanvasContext);
      this._loadImages();
    } else {
      this._mediator._hideMessage();
    }
  };

  cleanup = () => {
    this._buttonElement.removeEventListener("click", this._buttonEvent);
  };

  changeLanguage = () => {
    const langResource = this._mediator._getLangResource();
    this._loading.innerHTML = langResource._captcha_loading;
    this._buttonElement.innerHTML = langResource._validate_button;
  };
}
