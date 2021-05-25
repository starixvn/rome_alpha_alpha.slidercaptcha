import {
  loadingSvg,
  sliderFailSvg,
  sliderReadySvg,
  sliderSuccessSvg,
} from "../consts";
import { CaptchaMediator, CaptchaStatus, ImageCaptchaData } from "../types";
import {
  createCanvas,
  createElement,
  loadImage,
  setClientSize,
} from "../utils";
import { BaseCaptcha } from "./base-captcha";

const imageWidth = 300;
const imageHeight = 160;
const sliderWidth = 40;

export class ImageCaptcha extends BaseCaptcha {
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

  private get backgroundCanvasContext() {
    return this._backgroundCanvas.getContext("2d");
  }

  private get sliceCanvasContext() {
    return this._sliceCanvas.getContext("2d");
  }

  constructor(_mediator: CaptchaMediator) {
    super(_mediator);
    this.initDOM();
  }

  private initDOM = () => {
    document.addEventListener(
      "mousemove",
      (this._documentMousemove = (e: MouseEvent) => {
        if (!this.handleDragMove(e.clientX, e.clientY)) {
          e.stopPropagation();
          e.preventDefault();
        }
      })
    );
    document.addEventListener(
      "touchmove",
      (this._documentTouchmove = (e: TouchEvent) => {
        if (!this.handleDragMove(e.touches[0].clientX, e.touches[0].clientY)) {
          e.stopPropagation();
          e.preventDefault();
        }
      }),
      { passive: false }
    );

    document.addEventListener(
      "mouseup",
      (this._documentMouseup = () => {
        return this.handleDragEnd();
      })
    );
    document.addEventListener(
      "touchend",
      (this._documentTouchend = () => {
        return this.handleDragEnd();
      })
    );
  };

  initBody = (captchaBody: HTMLElement) => {
    const captchaWidget = captchaBody.appendChild(
      createElement("div", "captcha-widget")
    );
    setClientSize(captchaWidget, imageWidth, imageHeight);
    this._backgroundCanvas = captchaWidget.appendChild(
      createCanvas(imageWidth, imageHeight, "captcha-background")
    );
    this._sliceCanvas = captchaWidget.appendChild(
      createCanvas(sliderWidth, imageHeight, "captcha-slice")
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
    this._sliderContainer = captchaFooter.appendChild(
      createElement("div", "captcha-slider-container")
    );
    this._sliderText = this._sliderContainer.appendChild(
      createElement("span", "captcha-slider-text")
    );
    this._sliderText.innerHTML = this._mediator.getLangResource().slider_ready;
    this._sliderMask = this._sliderContainer.appendChild(
      createElement("div", "captcha-slider-mask")
    );

    // init slider button
    this._sliderButton = this._sliderContainer.appendChild(
      createElement("div", "captcha-slider-button")
    );
    this._sliderButton.appendChild(
      createElement("i", "captcha-slider-icon", sliderReadySvg)
    );
    this._sliderButton.addEventListener("mousedown", (e) => {
      this.handleDragStart(e.clientX, e.clientY);
    });
    this._sliderButton.addEventListener("touchstart", (e) => {
      this.handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    });
  };

  private loadImages = () => {
    this._mediator.makeGenerateRequest((response) => {
      const data = response.Data as ImageCaptchaData;
      loadImage(data.Background, (image) => {
        this.backgroundCanvasContext.drawImage(
          image,
          0,
          0,
          image.width,
          image.height
        );
      });
      loadImage(data.Slice, (image) => {
        this.sliceCanvasContext.drawImage(
          image,
          0,
          data.Position,
          image.width,
          image.height
        );
      });
    });
  };

  private setStatus = (status: CaptchaStatus) => {
    this._mediator.setStatus(status);
    this.statusChanged(status);
  };

  statusChanged = (status: CaptchaStatus) => {
    let sliderSvg = sliderReadySvg;
    switch (status) {
      case CaptchaStatus.Fail:
        sliderSvg = sliderFailSvg;
        this._hasFailed = true;
        this._sliderText.innerHTML =
          this._mediator.getLangResource().validate_fail_message;
        break;
      case CaptchaStatus.Success:
        sliderSvg = sliderSuccessSvg;
        break;
    }

    if (status !== CaptchaStatus.Slide) {
      this._sliderButton.innerHTML = sliderSvg;
    }
  };

  private handleDragStart = (x: number, y: number) => {
    const status = this._mediator.getStatus();
    if (status === CaptchaStatus.Loading || status === CaptchaStatus.Validate) {
      return;
    }

    console.log("handleDragStart");
    this.freezeOverflowContainer();
    this.setStatus(CaptchaStatus.Slide);
    this._originX = x;
  };

  private handleDragMove = (x: number, y: number) => {
    const status = this._mediator.getStatus();
    if (status !== CaptchaStatus.Slide) {
      return true;
    }

    console.log(`handleDragMove (x: ${x}, y: ${y})`);
    const moveX = Math.min(
      Math.max(x - this._originX, 0),
      imageWidth - sliderWidth
    );
    this._sliderButton.style.left = moveX + "px";
    this._sliderMask.style.width = moveX + "px";
    this._sliceCanvas.style.left = moveX + "px";
    return false;
  };

  private handleDragEnd = () => {
    const status = this._mediator.getStatus();
    if (status !== CaptchaStatus.Slide) {
      return;
    }

    console.log("handleDragEnd");
    this.unfreezeOverflowContainer();
    this._mediator.makeValidateRequest(
      this._sliceCanvas.offsetLeft.toString(),
      () => {
        const status = this._mediator.getStatus();
        this.statusChanged(status);
      }
    );
  };

  private freezeOverflowContainer() {
    const topElement = this._mediator.getTopElement();
    if (topElement) {
      this._topValue = document.body.style.touchAction;
      topElement.style.touchAction = "none";
    }
  }

  private unfreezeOverflowContainer() {
    const topElement = this._mediator.getTopElement();
    if (topElement) {
      topElement.style.touchAction = this._topValue;
    }
  }

  reset = () => {
    const clearCanvasContext = (canvasContext: CanvasRenderingContext2D) => {
      canvasContext.clearRect(0, 0, imageWidth, imageHeight);
    };

    this._sliderButton.style.left = "0";
    this._sliderMask.style.width = "0";
    this._sliceCanvas.style.left = "0";
    this.setStatus(CaptchaStatus.Loading);
    clearCanvasContext(this.backgroundCanvasContext);
    clearCanvasContext(this.sliceCanvasContext);
    this.loadImages();
  };

  cleanup = () => {
    document.removeEventListener("mousemove", this._documentMousemove);
    document.removeEventListener("touchmove", this._documentTouchmove);
    document.removeEventListener("mouseup", this._documentMouseup);
    document.removeEventListener("touchend", this._documentTouchend);
  };

  changeLanguage = () => {
    const langResource = this._mediator.getLangResource();
    this._loading.innerHTML = langResource.captcha_loading;
    this._sliderText.innerHTML = this._hasFailed
      ? langResource.validate_fail_message
      : langResource.slider_ready;
  };
}
