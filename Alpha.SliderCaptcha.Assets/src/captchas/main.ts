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

const ImageCaptchaWidthLimit = 600;
const SuccessCode = 0;

export class SliderCaptcha implements ISliderCaptcha {
  static defaultOptions: CaptchaOptions = {
    lang: getDefaultLang(),
    baseUri: document.baseURI,
    topElement: document.body,
  };

  private element: HTMLElement;
  private topElement: HTMLElement;
  private headerElement: HTMLElement;
  private bodyElement: HTMLElement;
  private footerElement: HTMLElement;
  private messageElement: HTMLElement;
  private containerElement: HTMLElement;
  private titleElement: HTMLElement;
  private refreshElement: HTMLElement;

  private options: CaptchaOptions = SliderCaptcha.defaultOptions;
  private langResource: LangResource;
  private baseUrl: string;
  private token: string | undefined;
  private input: HTMLInputElement;

  private captcha: BaseCaptcha;
  private status: CaptchaStatus = CaptchaStatus.Loading;

  constructor(element: HTMLElement, options = SliderCaptcha.defaultOptions) {
    this.element = element;
    this.options = { ...SliderCaptcha.defaultOptions, ...options };
    this.readOptions();
    this.initCaptchaStyle();
    this.initDOM();
    this.reset(true);
  }

  private readOptions = () => {
    // init language
    this.langResource = getLangResource(this.options.lang);

    // init baseUrl
    const locationOrigin =
      location.origin ??
      `${location.protocol}//${location.hostname}${
        location.port ? ":" + location.port : ""
      }`;
    if (
      !locationOrigin
        .toLowerCase()
        .startsWith(this.options.baseUri.toLowerCase())
    ) {
      this.baseUrl = joinURL(locationOrigin, this.options.baseUri);
    }

    // init topElement
    if (typeof this.options.topElement === "string") {
      this.topElement = document.getElementById(this.options.topElement);
    } else {
      this.topElement = this.options.topElement;
    }

    if (!this.topElement) {
      throw "topElement is required";
    }
  };

  private initCaptchaStyle = () => {
    let style = this.options.style;
    if (!style) {
      const width = getClientWidth(this.topElement);
      console.log(`client width: ${width}`);
      style =
        width < ImageCaptchaWidthLimit ? CaptchaStyle.Text : CaptchaStyle.Image;
    }

    const mediator: CaptchaMediator = {
      getLangResource: () => this.langResource,
      getTopElement: () => this.topElement,
      generateRequest: this.generateRequest,
      validateRequest: this.validateRequest,
      setStatus: this.setStatus,
      getStatus: () => this.status,
      showMessage: this.showMessage,
    };

    switch (style) {
      case CaptchaStyle.Image:
        this.captcha = new ImageCaptcha(mediator);
        break;
      case CaptchaStyle.Text:
        this.captcha = new TextCaptcha(mediator);
        break;
      default:
        throw `Unknown style: ${style}`;
    }
  };

  private setStatus = (status: CaptchaStatus) => {
    this.status = status;
    const statusClassName = `captcha-status-${CaptchaStatus[
      status
    ].toLowerCase()}`;
    const styleClassName = `captcha-style-${CaptchaStyle[
      this.getStyle()
    ].toLowerCase()}`;
    this.containerElement.className = `captcha-container ${statusClassName} ${styleClassName}`;
  };

  private initDOM = () => {
    const elementClassName = "alpha-slider-captcha";
    if (!this.element.classList.contains(elementClassName)) {
      this.element.classList.add(elementClassName);
    }

    const elementName = this.element.getAttribute("name");
    if (!elementName) {
      throw "Element name is required";
    }

    // create input
    this.input = this.element.appendChild(createHiddenInput(elementName));

    // create container
    this.containerElement = this.element.appendChild(
      createElement("div", "captcha-container")
    );

    // header
    this.headerElement = this.containerElement.appendChild(
      createElement("div", "captcha-header")
    );
    this.titleElement = this.headerElement.appendChild(
      createElement("span", "", this.langResource.title)
    );
    const headerIcons = this.headerElement.appendChild(
      createElement("div", "captcha-header-icons")
    );
    this.refreshElement = headerIcons.appendChild(
      createElement("i", "captcha-refresh-icon", refreshSvg)
    );
    this.refreshElement.addEventListener("click", this.refreshClicked);

    // body
    this.bodyElement = this.containerElement.appendChild(
      createElement("div", "captcha-body")
    );
    this.captcha.initBody(this.bodyElement);

    // footer
    this.footerElement = this.containerElement.appendChild(
      createElement("div", "captcha-footer")
    );
    this.captcha.initFooter(this.footerElement);

    // message
    this.messageElement = this.containerElement.appendChild(
      createElement("div", "captcha-message")
    );
  };

  private showMessage = (message: string) => {
    showElement(this.messageElement);
    this.messageElement.innerHTML = message;
  };

  private isLoading = () => {
    return (
      this.status === CaptchaStatus.Loading ||
      this.status === CaptchaStatus.Lock
    );
  };

  private refreshClicked = () => {
    if (this.isLoading()) {
      return;
    }

    this.reset(true);
  };

  private generateRequest = (callback: GenerateResponseCallback) => {
    const requestBody: GenerateRequest = {
      Token: this.token,
      Style: this.getStyle(),
    };
    makeRequest<GenerateResponse>(
      "POST",
      `${this.baseUrl}/slidercaptcha/generate`,
      requestBody,
      (response) => {
        this.setStatus(CaptchaStatus.Ready);
        this.token = response.Token;
        callback(response);
      },
      ({ statusText }) => {
        console.error(statusText);
      }
    );
  };

  private validateRequest = (
    data: string,
    callback: ValidateResponseCallback
  ) => {
    hideElement(this.messageElement);
    this.setStatus(CaptchaStatus.Lock);
    const requestBody: ValidateRequest = {
      Token: this.token,
      Data: data,
    };
    makeRequest<ValidateResponse>(
      "POST",
      `${this.baseUrl}/slidercaptcha/verify`,
      requestBody,
      (response) => {
        const isSuccess = response.Code === SuccessCode;
        this.setStatus(isSuccess ? CaptchaStatus.Success : CaptchaStatus.Fail);
        if (isSuccess) {
          this.input.value = this.token;
          this.showMessage(this.langResource.success_message);
        }

        callback(response);
        const event: CaptchaEvent = {
          preventDefault: false,
        };
        if (this.options.callback) {
          this.options.callback.call(this, response, event);
        }

        if (!event.preventDefault) {
          if (isSuccess) {
            this.cleanup();
          }

          setTimeout(() => {
            this.reset(false);
          }, captchaTimeout);
        }
      },
      ({ statusText }) => {
        console.error(statusText);
      }
    );
  };

  reset = (force: boolean) => {
    if (force || this.captcha.isForceReset()) {
      this.captcha.reset();
    }
  };

  cleanup = () => {
    this.captcha.cleanup();
    this.headerElement.remove();
    this.bodyElement.remove();
    this.footerElement.remove();
  };

  changeLanguage = (lang: string) => {
    this.langResource = getLangResource(lang);
    this.titleElement.innerHTML = this.langResource.title;
    this.messageElement.innerHTML = this.langResource.success_message;
    this.captcha.changeLanguage();
  };

  getStyle(): CaptchaStyle {
    return this.captcha instanceof ImageCaptcha
      ? CaptchaStyle.Image
      : CaptchaStyle.Text;
  }
}
