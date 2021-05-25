import {
  _loadingSvg,
  _sliderFailSvg,
  _sliderReadySvg,
  _sliderSuccessSvg,
} from "../consts";
import { _CaptchaMediator, _CaptchaStatus, _ImageCaptchaData } from "../types";
import {
  _createCanvas,
  _createElement,
  _loadImage,
  _setClientSize,
} from "../utils";
import { _BaseCaptcha } from "./base-captcha";

const _imageWidth = 300;
const _imageHeight = 160;
const _sliderWidth = 40;

export class _ImageCaptcha extends _BaseCaptcha {
  private _backgroundCanvas: HTMLCanvasElement;
  private _sliceCanvas: HTMLCanvasElement;
  private _loading: HTMLElement;
  private _sliderContainer: HTMLElement;
  private _sliderText: HTMLElement;
  private _sliderButton: HTMLElement;
  private _sliderMask: HTMLElement;
  private _documentMousemove;
  private _documentTouchmove;
  private _documentMouseup;
  private _documentTouchend;
  private _hasFailed = false;
  private _topValue: string;
  private _originX = 0;

  private get _backgroundCanvasContext() {
    return this._backgroundCanvas.getContext("2d");
  }

  private get _sliceCanvasContext() {
    return this._sliceCanvas.getContext("2d");
  }

  constructor(_mediator: _CaptchaMediator) {
    super(_mediator);
    this._initDOM();
  }

  private _initDOM = () => {
    document.addEventListener(
      "mousemove",
      (this._documentMousemove = (e: MouseEvent) => {
        if (!this._handleDragMove(e.clientX, e.clientY)) {
          e.stopPropagation();
          e.preventDefault();
        }
      })
    );
    document.addEventListener(
      "touchmove",
      (this._documentTouchmove = (e: TouchEvent) => {
        if (!this._handleDragMove(e.touches[0].clientX, e.touches[0].clientY)) {
          e.stopPropagation();
          e.preventDefault();
        }
      }),
      { passive: false }
    );

    document.addEventListener(
      "mouseup",
      (this._documentMouseup = () => {
        return this._handleDragEnd();
      })
    );
    document.addEventListener(
      "touchend",
      (this._documentTouchend = () => {
        return this._handleDragEnd();
      })
    );
  };

  _initBody = (captchaBody: HTMLElement) => {
    const captchaWidget = captchaBody.appendChild(
      _createElement("div", "captcha-widget")
    );
    _setClientSize(captchaWidget, _imageWidth, _imageHeight);
    this._backgroundCanvas = captchaWidget.appendChild(
      _createCanvas(_imageWidth, _imageHeight, "captcha-background")
    );
    this._sliceCanvas = captchaWidget.appendChild(
      _createCanvas(_sliderWidth, _imageHeight, "captcha-slice")
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
    this._sliderContainer = captchaFooter.appendChild(
      _createElement("div", "captcha-slider-container")
    );
    this._sliderText = this._sliderContainer.appendChild(
      _createElement("span", "captcha-slider-text")
    );
    this._sliderText.innerHTML = this._mediator._getLangResource()._slider_ready;
    this._sliderMask = this._sliderContainer.appendChild(
      _createElement("div", "captcha-slider-mask")
    );

    // init slider button
    this._sliderButton = this._sliderContainer.appendChild(
      _createElement("div", "captcha-slider-button")
    );
    this._sliderButton.appendChild(
      _createElement("i", "captcha-slider-icon", _sliderReadySvg)
    );
    this._sliderButton.addEventListener("mousedown", (e) => {
      this._handleDragStart(e.clientX, e.clientY);
    });
    this._sliderButton.addEventListener("touchstart", (e) => {
      this._handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    });
  };

  private _loadImages = () => {
    this._mediator._makeGenerateRequest((response) => {
      const data = response.Data as _ImageCaptchaData;
      _loadImage(data.Background, (image) => {
        this._backgroundCanvasContext.drawImage(
          image,
          0,
          0,
          image.width,
          image.height
        );
      });
      _loadImage(data.Slice, (image) => {
        this._sliceCanvasContext.drawImage(
          image,
          0,
          data.Position,
          image.width,
          image.height
        );
      });
    });
  };

  private _setStatus = (status: _CaptchaStatus) => {
    this._mediator._setStatus(status);
    this._statusChanged(status);
  };

  _statusChanged = (status: _CaptchaStatus) => {
    let sliderSvg = _sliderReadySvg;
    switch (status) {
      case _CaptchaStatus.Fail:
        sliderSvg = _sliderFailSvg;
        this._hasFailed = true;
        this._sliderText.innerHTML =
          this._mediator._getLangResource()._validate_fail_message;
        break;
      case _CaptchaStatus.Success:
        sliderSvg = _sliderSuccessSvg;
        break;
    }

    if (status !== _CaptchaStatus.Slide) {
      this._sliderButton.innerHTML = sliderSvg;
    }
  };

  private _handleDragStart = (x: number, y: number) => {
    const status = this._mediator._getStatus();
    if (status === _CaptchaStatus.Loading || status === _CaptchaStatus.Validate) {
      return;
    }

    console.log("handleDragStart");
    this._freezeOverflowContainer();
    this._setStatus(_CaptchaStatus.Slide);
    this._originX = x;
  };

  private _handleDragMove = (x: number, y: number) => {
    const status = this._mediator._getStatus();
    if (status !== _CaptchaStatus.Slide) {
      return true;
    }

    console.log(`handleDragMove (x: ${x}, y: ${y})`);
    const moveX = Math.min(
      Math.max(x - this._originX, 0),
      _imageWidth - _sliderWidth
    );
    this._sliderButton.style.left = moveX + "px";
    this._sliderMask.style.width = moveX + "px";
    this._sliceCanvas.style.left = moveX + "px";
    return false;
  };

  private _handleDragEnd = () => {
    const status = this._mediator._getStatus();
    if (status !== _CaptchaStatus.Slide) {
      return;
    }

    console.log("handleDragEnd");
    this._unfreezeOverflowContainer();
    this._mediator._makeValidateRequest(
      this._sliceCanvas.offsetLeft.toString(),
      () => {
        const status = this._mediator._getStatus();
        this._statusChanged(status);
      }
    );
  };

  private _freezeOverflowContainer() {
    const topElement = this._mediator._getTopElement();
    if (topElement) {
      this._topValue = document.body.style.touchAction;
      topElement.style.touchAction = "none";
    }
  }

  private _unfreezeOverflowContainer() {
    const topElement = this._mediator._getTopElement();
    if (topElement) {
      topElement.style.touchAction = this._topValue;
    }
  }

  reset = () => {
    const clearCanvasContext = (canvasContext: CanvasRenderingContext2D) => {
      canvasContext.clearRect(0, 0, _imageWidth, _imageHeight);
    };

    this._sliderButton.style.left = "0";
    this._sliderMask.style.width = "0";
    this._sliceCanvas.style.left = "0";
    this._setStatus(_CaptchaStatus.Loading);
    clearCanvasContext(this._backgroundCanvasContext);
    clearCanvasContext(this._sliceCanvasContext);
    this._loadImages();
  };

  cleanup = () => {
    document.removeEventListener("mousemove", this._documentMousemove);
    document.removeEventListener("touchmove", this._documentTouchmove);
    document.removeEventListener("mouseup", this._documentMouseup);
    document.removeEventListener("touchend", this._documentTouchend);
  };

  changeLanguage = () => {
    const langResource = this._mediator._getLangResource();
    this._loading.innerHTML = langResource._captcha_loading;
    this._sliderText.innerHTML = this._hasFailed
      ? langResource._validate_fail_message
      : langResource._slider_ready;
  };
}
