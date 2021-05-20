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

const ImageCaptchaWidthLimit = 500;

export class SliderCaptcha implements ISliderCaptcha {
  static defaultOptions: CaptchaOptions = {
    lang: getDefaultLang(),
    baseUri: document.baseURI,
    topElement: document.body,
  };

  private element: HTMLElement;
  private topElement: HTMLElement;
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
    this.reset();
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
      style =
        width >= ImageCaptchaWidthLimit
          ? CaptchaStyle.Image
          : CaptchaStyle.Text;
    }

    const mediator: CaptchaMediator = {
      getLangResource: () => this.langResource,
      getTopElement: () => this.topElement,
      generateRequest: this.generateRequest,
      validateRequest: this.validateRequest,
      setStatus: (status) => (this.status = status),
      getStatus: () => this.status,
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

    // create message
    this.messageElement = this.element.appendChild(
      createElement("div", "captcha-message", this.langResource.success_message)
    );
    hideElement(this.messageElement);

    // create container
    this.containerElement = this.element.appendChild(
      createElement("div", "captcha-container")
    );

    // header
    const captchaHeader = this.containerElement.appendChild(
      createElement("div", "captcha-header")
    );
    this.titleElement = captchaHeader.appendChild(
      createElement("span", "", this.langResource.title)
    );
    const headerIcons = captchaHeader.appendChild(
      createElement("div", "captcha-header-icons")
    );
    this.refreshElement = headerIcons.appendChild(
      createElement("i", "captcha-refresh-icon", refreshSvg)
    );
    this.refreshElement.addEventListener("click", this.refreshClicked);

    // body
    const captchaBody = this.containerElement.appendChild(
      createElement("div", "captcha-body")
    );
    this.captcha.initBody(captchaBody);

    // footer
    const captchaFooter = this.containerElement.appendChild(
      createElement("div", "captcha-footer")
    );
    this.captcha.initFooter(captchaFooter);
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

    this.reset();
  };

  private generateRequest = (callback: GenerateResponseCallback) => {
    const requestBody: GenerateRequest = {
      Token: this.token,
    };
    makeRequest<GenerateResponse>(
      "POST",
      `${this.baseUrl}/slidercaptcha/generate`,
      requestBody,
      (response) => {
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
    const requestBody: ValidateRequest = {
      Token: this.token,
      Data: data,
    };
    makeRequest<ValidateResponse>(
      "POST",
      `${this.baseUrl}/slidercaptcha/verify`,
      requestBody,
      (response) => {
        if (response.IsSuccess) {
          this.input.value = this.token;
          showElement(this.messageElement);
        }

        callback(response);
        const event: CaptchaEvent = {
          preventDefault: false,
        };
        if (this.options.callback) {
          this.options.callback.call(this, response, event);
        }

        if (!event.preventDefault) {
          setTimeout(() => {
            if (response.IsSuccess) {
              this.cleanup();
            } else {
              this.reset();
            }
          }, captchaTimeout);
        }
      },
      ({ statusText }) => {
        console.error(statusText);
      }
    );
  };

  reset = () => {
    this.captcha.reset();
  };

  cleanup = () => {
    this.captcha.cleanup();
    this.containerElement.remove();
    this.containerElement = null;
  };

  changeLanguage = (lang: string) => {
    this.langResource = getLangResource(lang);
    this.titleElement.innerHTML = this.langResource.title;
    this.messageElement.innerHTML = this.langResource.success_message;
    this.captcha.changeLanguage();
  };
}
