import { _captchaTimeout, _refreshSvg } from "../constants";
import {
  _CaptchaEvent,
  _CaptchaMediator,
  _CaptchaOptions,
  _CaptchaStatus,
  _CaptchaStyle,
  _GenerateRequest,
  _GenerateResponse,
  _GenerateResponseCallback,
  _ISliderCaptcha,
  _LangResource,
  _ValidateRequest,
  _ValidateResponse,
  _ValidateResponseCallback,
} from "../types";
import {
  _createElement,
  _createHiddenInput,
  _getClientWidth,
  _getDefaultLang,
  _getLangResource,
  _hideElement,
  _joinURL,
  _makeRequest,
  _showElement,
} from "../utils";
import { _BaseCaptcha } from "./base-captcha";
import { _ImageCaptcha } from "./image-captcha";
import { _TextCaptcha } from "./text-captcha";

const _ImageCaptchaWidthLimit = 0;
const _SuccessCode = 0;

export class _SliderCaptcha implements _ISliderCaptcha {
  static _defaultOptions: _CaptchaOptions = {
    lang: _getDefaultLang(),
    baseUri: document.baseURI,
    topElement: document.body,
  };

  private _element: HTMLElement;
  private _keyElement?: HTMLInputElement;
  private _topElement: HTMLElement;
  private _headerElement: HTMLElement;
  private _bodyElement: HTMLElement;
  private _footerElement: HTMLElement;
  private _messageElement: HTMLElement;
  private _containerElement: HTMLElement;
  private _titleElement: HTMLElement;
  private _refreshElement: HTMLElement;

  private _options: _CaptchaOptions = _SliderCaptcha._defaultOptions;
  private _langResource: _LangResource;
  private _baseUrl: string;
  private _token: string | undefined;
  private _input: HTMLInputElement;

  private _captcha: _BaseCaptcha;
  private _status: _CaptchaStatus = _CaptchaStatus.Loading;

  constructor(element: HTMLElement, options = _SliderCaptcha._defaultOptions) {
    this._element = element;
    this._options = { ..._SliderCaptcha._defaultOptions, ...options };
    this._readOptions();
    this._initCaptchaStyle();
    this._initDOM();
    this.reset(true);
  }

  private _readOptions = () => {
    // init language
    this._langResource = _getLangResource(this._options.lang);

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
      this._baseUrl = _joinURL(locationOrigin, this._options.baseUri);
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

    this._keyElement = this._options.keyElement;
  };

  private _initCaptchaStyle = () => {
    let style = this._options.style;
    if (!style) {
      const width = _getClientWidth(this._topElement);
      console.debug(`client width: ${width}`);
      style =
        width < _ImageCaptchaWidthLimit
          ? _CaptchaStyle.Text
          : _CaptchaStyle.Image;
    }

    const mediator: _CaptchaMediator = {
      _getLangResource: () => this._langResource,
      _getTopElement: () => this._topElement,
      _makeGenerateRequest: this._makeGenerateRequest,
      _makeValidateRequest: this._makeValidateRequest,
      _setStatus: this._setStatus,
      _getStatus: () => this._status,
      _showMessage: this._showMessage,
      _hideMessage: this._hideMessage,
    };

    switch (style) {
      case _CaptchaStyle.Image:
        this._captcha = new _ImageCaptcha(mediator);
        break;
      case _CaptchaStyle.Text:
        this._captcha = new _TextCaptcha(mediator);
        break;
      default:
        throw `Unknown style: ${style}`;
    }
  };

  private _setStatus = (status: _CaptchaStatus) => {
    this._status = status;
    const statusClassName = `captcha-status-${_CaptchaStatus[
      status
    ].toLowerCase()}`;
    const styleClassName = `captcha-style-${_CaptchaStyle[
      this._getStyle()
    ].toLowerCase()}`;
    this._containerElement.className = `captcha-container ${statusClassName} ${styleClassName}`;
  };

  private _initDOM = () => {
    const elementClassName = "alpha-slider-captcha";
    if (!this._element.classList.contains(elementClassName)) {
      this._element.classList.add(elementClassName);
    }

    const elementName = this._element.getAttribute("name");
    if (!elementName) {
      throw "Element name is required";
    }

    // create input
    this._input = this._element.appendChild(_createHiddenInput(elementName));

    // create container
    this._containerElement = this._element.appendChild(
      _createElement("div", "captcha-container")
    );

    // header
    this._headerElement = this._containerElement.appendChild(
      _createElement("div", "captcha-header")
    );
    this._titleElement = this._headerElement.appendChild(
      _createElement("span", "", this._langResource._header_title)
    );
    const headerIcons = this._headerElement.appendChild(
      _createElement("div", "captcha-header-icons")
    );
    this._refreshElement = headerIcons.appendChild(
      _createElement("i", "captcha-refresh-icon", _refreshSvg)
    );
    this._refreshElement.addEventListener("click", this._refreshClicked);

    // body
    this._bodyElement = this._containerElement.appendChild(
      _createElement("div", "captcha-body")
    );
    this._captcha._initBody(this._bodyElement);

    // footer
    this._footerElement = this._containerElement.appendChild(
      _createElement("div", "captcha-footer")
    );
    this._captcha._initFooter(this._footerElement);

    // message
    this._messageElement = this._containerElement.appendChild(
      _createElement("div", "captcha-message")
    );
    _hideElement(this._messageElement);
  };

  private _showMessage = (message: string) => {
    _showElement(this._messageElement);
    this._messageElement.innerHTML = message;
  };

  private _hideMessage = () => {
    _hideElement(this._messageElement);
  };

  private _isLoading = () => {
    return (
      this._status === _CaptchaStatus.Loading ||
      this._status === _CaptchaStatus.Validate
    );
  };

  private _refreshClicked = () => {
    if (this._isLoading()) {
      return;
    }

    this.reset(true);
  };

  private _makeGenerateRequest = (callback: _GenerateResponseCallback) => {
    const requestBody: _GenerateRequest = {
      Key: this._keyElement ? this._keyElement.value : "",
      Token: this._token,
      Style: this._getStyle(),
    };
    console.log("generate", requestBody);
    _makeRequest<_GenerateResponse>(
      "POST",
      `${this._baseUrl}/slidercaptcha/generate`,
      requestBody,
      (response) => {
        this._setStatus(_CaptchaStatus.Ready);
        this._token = response.Token;
        callback(response);
      },
      ({ statusText }) => {
        console.error(statusText);
      }
    );
  };

  private _makeValidateRequest = (
    data: string,
    callback: _ValidateResponseCallback
  ) => {
    _hideElement(this._messageElement);
    this._setStatus(_CaptchaStatus.Validate);
    const requestBody: _ValidateRequest = {
      Key: this._keyElement ? this._keyElement.value : "",
      Token: this._token,
      Data: data,
    };
    console.log("verify", requestBody);
    _makeRequest<_ValidateResponse>(
      "POST",
      `${this._baseUrl}/slidercaptcha/verify`,
      requestBody,
      (response) => {
        const isSuccess = response.Code === _SuccessCode;
        this._setStatus(
          isSuccess ? _CaptchaStatus.Success : _CaptchaStatus.Fail
        );
        if (isSuccess) {
          this._input.value = this._token;
          this._showMessage(this._langResource._validate_success_message);
        }

        callback(response);
        const event: _CaptchaEvent = {
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
            }, _captchaTimeout);
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
    this._langResource = _getLangResource(lang);
    this._titleElement.innerHTML = this._langResource._header_title;
    this._messageElement.innerHTML =
      this._langResource._validate_success_message;
    this._captcha.changeLanguage();
  };

  _getStyle(): _CaptchaStyle {
    return this._captcha instanceof _ImageCaptcha
      ? _CaptchaStyle.Image
      : _CaptchaStyle.Text;
  }
}
