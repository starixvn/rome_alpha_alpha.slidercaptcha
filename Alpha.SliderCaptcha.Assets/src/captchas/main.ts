import { captchaTimeout, refreshSvg } from "../consts";
import {
  CaptchaEvent,
  CaptchaMediator,
  CaptchaOptions,
  CaptchaStatus,
  CaptchaStyle,
  GenerateRequest,
  GenerateResponse,
  GenerateResponseCallback,
  ISliderCaptcha,
  LangResource,
  ValidateRequest,
  ValidateResponse,
  ValidateResponseCallback,
} from "../types";
import {
  createElement,
  createHiddenInput,
  getClientWidth,
  getDefaultLang,
  getLangResource,
  hideElement,
  joinURL,
  makeRequest,
  showElement,
} from "../utils";
import { BaseCaptcha } from "./base-captcha";
import { ImageCaptcha } from "./image-captcha";
import { TextCaptcha } from "./text-captcha";

const ImageCaptchaWidthLimit = 340;
const SuccessCode = 0;

export class SliderCaptcha implements ISliderCaptcha {
  static defaultOptions: CaptchaOptions = {
    lang: getDefaultLang(),
    baseUri: document.baseURI,
    topElement: document.body,
  };

  private _element: HTMLElement;
  private _topElement: HTMLElement;
  private _headerElement: HTMLElement;
  private _bodyElement: HTMLElement;
  private _footerElement: HTMLElement;
  private _messageElement: HTMLElement;
  private _containerElement: HTMLElement;
  private _titleElement: HTMLElement;
  private _refreshElement: HTMLElement;

  private _options: CaptchaOptions = SliderCaptcha.defaultOptions;
  private _langResource: LangResource;
  private _baseUrl: string;
  private _token: string | undefined;
  private _input: HTMLInputElement;

  private _captcha: BaseCaptcha;
  private _status: CaptchaStatus = CaptchaStatus.Loading;

  constructor(element: HTMLElement, options = SliderCaptcha.defaultOptions) {
    this._element = element;
    this._options = { ...SliderCaptcha.defaultOptions, ...options };
    this.readOptions();
    this.initCaptchaStyle();
    this.initDOM();
    this.reset(true);
  }

  private readOptions = () => {
    // init language
    this._langResource = getLangResource(this._options.lang);

    // init baseUrl
    const locationOrigin =
      location.origin ??
      `${location.protocol}//${location.hostname}${
        location.port ? ":" + location.port : ""
      }`;
    if (
      !locationOrigin
        .toLowerCase()
        .startsWith(this._options.baseUri.toLowerCase())
    ) {
      this._baseUrl = joinURL(locationOrigin, this._options.baseUri);
    }

    // init topElement
    if (typeof this._options.topElement === "string") {
      this._topElement = document.getElementById(this._options.topElement);
    } else {
      this._topElement = this._options.topElement;
    }

    if (!this._topElement) {
      throw "topElement is required";
    }
  };

  private initCaptchaStyle = () => {
    let style = this._options.style;
    if (!style) {
      const width = getClientWidth(this._topElement);
      console.log(`client width: ${width}`);
      style =
        width < ImageCaptchaWidthLimit ? CaptchaStyle.Text : CaptchaStyle.Image;
    }

    const mediator: CaptchaMediator = {
      getLangResource: () => this._langResource,
      getTopElement: () => this._topElement,
      makeGenerateRequest: this.makeGenerateRequest,
      makeValidateRequest: this.makeValidateRequest,
      setStatus: this.setStatus,
      getStatus: () => this._status,
      showMessage: this.showMessage,
      hideMessage: this.hideMessage,
    };

    switch (style) {
      case CaptchaStyle.Image:
        this._captcha = new ImageCaptcha(mediator);
        break;
      case CaptchaStyle.Text:
        this._captcha = new TextCaptcha(mediator);
        break;
      default:
        throw `Unknown style: ${style}`;
    }
  };

  private setStatus = (status: CaptchaStatus) => {
    this._status = status;
    const statusClassName = `captcha-status-${CaptchaStatus[
      status
    ].toLowerCase()}`;
    const styleClassName = `captcha-style-${CaptchaStyle[
      this.getStyle()
    ].toLowerCase()}`;
    this._containerElement.className = `captcha-container ${statusClassName} ${styleClassName}`;
  };

  private initDOM = () => {
    const elementClassName = "alpha-slider-captcha";
    if (!this._element.classList.contains(elementClassName)) {
      this._element.classList.add(elementClassName);
    }

    const elementName = this._element.getAttribute("name");
    if (!elementName) {
      throw "Element name is required";
    }

    // create input
    this._input = this._element.appendChild(createHiddenInput(elementName));

    // create container
    this._containerElement = this._element.appendChild(
      createElement("div", "captcha-container")
    );

    // header
    this._headerElement = this._containerElement.appendChild(
      createElement("div", "captcha-header")
    );
    this._titleElement = this._headerElement.appendChild(
      createElement("span", "", this._langResource.header_title)
    );
    const headerIcons = this._headerElement.appendChild(
      createElement("div", "captcha-header-icons")
    );
    this._refreshElement = headerIcons.appendChild(
      createElement("i", "captcha-refresh-icon", refreshSvg)
    );
    this._refreshElement.addEventListener("click", this.refreshClicked);

    // body
    this._bodyElement = this._containerElement.appendChild(
      createElement("div", "captcha-body")
    );
    this._captcha.initBody(this._bodyElement);

    // footer
    this._footerElement = this._containerElement.appendChild(
      createElement("div", "captcha-footer")
    );
    this._captcha.initFooter(this._footerElement);

    // message
    this._messageElement = this._containerElement.appendChild(
      createElement("div", "captcha-message")
    );
  };

  private showMessage = (message: string) => {
    showElement(this._messageElement);
    this._messageElement.innerHTML = message;
  };

  private hideMessage = () => {
    hideElement(this._messageElement);
  };

  private isLoading = () => {
    return (
      this._status === CaptchaStatus.Loading ||
      this._status === CaptchaStatus.Validate
    );
  };

  private refreshClicked = () => {
    if (this.isLoading()) {
      return;
    }

    this.reset(true);
  };

  private makeGenerateRequest = (callback: GenerateResponseCallback) => {
    const requestBody: GenerateRequest = {
      Token: this._token,
      Style: this.getStyle(),
    };
    makeRequest<GenerateResponse>(
      "POST",
      `${this._baseUrl}/slidercaptcha/generate`,
      requestBody,
      (response) => {
        this.setStatus(CaptchaStatus.Ready);
        this._token = response.Token;
        callback(response);
      },
      ({ statusText }) => {
        console.error(statusText);
      }
    );
  };

  private makeValidateRequest = (
    data: string,
    callback: ValidateResponseCallback
  ) => {
    hideElement(this._messageElement);
    this.setStatus(CaptchaStatus.Validate);
    const requestBody: ValidateRequest = {
      Token: this._token,
      Data: data,
    };
    makeRequest<ValidateResponse>(
      "POST",
      `${this._baseUrl}/slidercaptcha/verify`,
      requestBody,
      (response) => {
        const isSuccess = response.Code === SuccessCode;
        this.setStatus(isSuccess ? CaptchaStatus.Success : CaptchaStatus.Fail);
        if (isSuccess) {
          this._input.value = this._token;
          this.showMessage(this._langResource.validate_success_message);
        }

        callback(response);
        const event: CaptchaEvent = {
          preventDefault: false,
        };
        if (this._options.callback) {
          this._options.callback.call(this, response, event);
        }

        if (!event.preventDefault) {
          if (isSuccess) {
            this.cleanup();
          } else {
            setTimeout(() => {
              this.reset(false);
            }, captchaTimeout);
          }
        }
      },
      ({ statusText }) => {
        console.error(statusText);
      }
    );
  };

  reset = (isRefresh: boolean) => {
    this._captcha.reset(isRefresh);
  };

  cleanup = () => {
    this._captcha.cleanup();
    this._headerElement.remove();
    this._bodyElement.remove();
    this._footerElement.remove();
  };

  changeLanguage = (lang: string) => {
    this._langResource = getLangResource(lang);
    this._titleElement.innerHTML = this._langResource.header_title;
    this._messageElement.innerHTML =
      this._langResource.validate_success_message;
    this._captcha.changeLanguage();
  };

  getStyle(): CaptchaStyle {
    return this._captcha instanceof ImageCaptcha
      ? CaptchaStyle.Image
      : CaptchaStyle.Text;
  }
}
