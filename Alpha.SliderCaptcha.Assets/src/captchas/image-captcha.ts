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
  private backgroundCanvas: HTMLCanvasElement;
  private sliceCanvas: HTMLCanvasElement;
  private loading: HTMLElement;
  private sliderContainer: HTMLElement;
  private sliderText: HTMLElement;
  private sliderButton: HTMLElement;
  private sliderMask: HTMLElement;
  private documentMousemove;
  private documentTouchmove;
  private documentMouseup;
  private documentTouchend;
  private hasFailed = false;
  private topValue: string;
  private originX = 0;

  private get backgroundCanvasContext() {
    return this.backgroundCanvas.getContext("2d");
  }

  private get sliceCanvasContext() {
    return this.sliceCanvas.getContext("2d");
  }

  constructor(mediator: CaptchaMediator) {
    super(mediator);
    this.initDOM();
  }

  private initDOM = () => {
    document.addEventListener(
      "mousemove",
      (this.documentMousemove = (e: MouseEvent) => {
        if (!this.handleDragMove(e.clientX, e.clientY)) {
          e.stopPropagation();
          e.preventDefault();
        }
      })
    );
    document.addEventListener(
      "touchmove",
      (this.documentTouchmove = (e: TouchEvent) => {
        if (!this.handleDragMove(e.touches[0].clientX, e.touches[0].clientY)) {
          e.stopPropagation();
          e.preventDefault();
        }
      }),
      { passive: false }
    );

    document.addEventListener(
      "mouseup",
      (this.documentMouseup = () => {
        return this.handleDragEnd();
      })
    );
    document.addEventListener(
      "touchend",
      (this.documentTouchend = () => {
        return this.handleDragEnd();
      })
    );
  };

  initBody = (captchaBody: HTMLElement) => {
    const captchaWidget = captchaBody.appendChild(
      createElement("div", "captcha-widget")
    );
    setClientSize(captchaWidget, imageWidth, imageHeight);
    this.backgroundCanvas = captchaWidget.appendChild(
      createCanvas(imageWidth, imageHeight, "captcha-background")
    );
    this.sliceCanvas = captchaWidget.appendChild(
      createCanvas(sliderWidth, imageHeight, "captcha-slice")
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
    this.sliderContainer = captchaFooter.appendChild(
      createElement("div", "captcha-slider-container")
    );
    this.sliderText = this.sliderContainer.appendChild(
      createElement("span", "captcha-slider-text")
    );
    this.sliderText.innerHTML = this.mediator.getLangResource().slider_ready;
    this.sliderMask = this.sliderContainer.appendChild(
      createElement("div", "captcha-slider-mask")
    );

    // init slider button
    this.sliderButton = this.sliderContainer.appendChild(
      createElement("div", "captcha-slider-button")
    );
    this.sliderButton.appendChild(
      createElement("i", "captcha-slider-icon", sliderReadySvg)
    );
    this.sliderButton.addEventListener("mousedown", (e) => {
      this.handleDragStart(e.clientX, e.clientY);
    });
    this.sliderButton.addEventListener("touchstart", (e) => {
      this.handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    });
  };

  private loadImages = () => {
    this.mediator.generateRequest((response) => {
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
    this.mediator.setStatus(status);
    this.statusChanged(status);
  };

  statusChanged = (status: CaptchaStatus) => {
    let sliderSvg = sliderReadySvg;
    switch (status) {
      case CaptchaStatus.Fail:
        sliderSvg = sliderFailSvg;
        this.hasFailed = true;
        this.sliderText.innerHTML =
          this.mediator.getLangResource().fail_message;
        break;
      case CaptchaStatus.Success:
        sliderSvg = sliderSuccessSvg;
        break;
    }

    if (status !== CaptchaStatus.Slide) {
      this.sliderButton.innerHTML = sliderSvg;
    }
  };

  private handleDragStart = (x: number, y: number) => {
    const status = this.mediator.getStatus();
    if (status === CaptchaStatus.Loading || status === CaptchaStatus.Verify) {
      return;
    }

    console.log("handleDragStart");
    this.freezeOverflowContainer();
    this.setStatus(CaptchaStatus.Slide);
    this.originX = x;
  };

  private handleDragMove = (x: number, y: number) => {
    const status = this.mediator.getStatus();
    if (status !== CaptchaStatus.Slide) {
      return true;
    }

    console.log(`handleDragMove (x: ${x}, y: ${y})`);
    const moveX = Math.min(
      Math.max(x - this.originX, 0),
      imageWidth - sliderWidth
    );
    this.sliderButton.style.left = moveX + "px";
    this.sliderMask.style.width = moveX + "px";
    this.sliceCanvas.style.left = moveX + "px";
    return false;
  };

  private handleDragEnd = () => {
    const status = this.mediator.getStatus();
    if (status !== CaptchaStatus.Slide) {
      return;
    }

    console.log("handleDragEnd");
    this.unfreezeOverflowContainer();
    this.mediator.validateRequest(
      this.sliceCanvas.offsetLeft.toString(),
      () => {
        const status = this.mediator.getStatus();
        this.statusChanged(status);
      }
    );
  };

  private freezeOverflowContainer() {
    const topElement = this.mediator.getTopElement();
    if (topElement) {
      this.topValue = document.body.style.touchAction;
      topElement.style.touchAction = "none";
    }
  }

  private unfreezeOverflowContainer() {
    const topElement = this.mediator.getTopElement();
    if (topElement) {
      topElement.style.touchAction = this.topValue;
    }
  }

  reset = () => {
    const clearCanvasContext = (canvasContext: CanvasRenderingContext2D) => {
      canvasContext.clearRect(0, 0, imageWidth, imageHeight);
    };

    this.sliderButton.style.left = "0";
    this.sliderMask.style.width = "0";
    this.sliceCanvas.style.left = "0";
    this.setStatus(CaptchaStatus.Loading);
    clearCanvasContext(this.backgroundCanvasContext);
    clearCanvasContext(this.sliceCanvasContext);
    this.loadImages();
  };

  cleanup = () => {
    document.removeEventListener("mousemove", this.documentMousemove);
    document.removeEventListener("touchmove", this.documentTouchmove);
    document.removeEventListener("mouseup", this.documentMouseup);
    document.removeEventListener("touchend", this.documentTouchend);
  };

  changeLanguage = () => {
    const langResource = this.mediator.getLangResource();
    this.loading.innerHTML = langResource.captcha_loading;
    this.sliderText.innerHTML = this.hasFailed
      ? langResource.fail_message
      : langResource.slider_ready;
  };
}
