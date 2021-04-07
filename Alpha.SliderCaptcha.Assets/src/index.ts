// https://github.com/ArgoZhang/SliderCaptcha
// https://www.jqueryscript.net/demo/image-puzzle-slider-captcha/
// UX: https://www.geetest.com/en/demo

(() => {
  type GenerateRequest = {
    Token: string;
  };

  type GenerateResponse = {
    Token: string;
    Background: string;
    Slice: string;
    Position: number;
  };

  type ValidateRequest = {
    Token: string;
    Position: number;
  };

  type ValidateResponse = {
    Code: number;
    Message: string;
    IsSuccess: boolean;
  };

  type CaptchaOptions = {
    lang: string;
    baseUri: string;
    width: number;
    height: number;
    sliderWidth: number;
    sliderHeight: number;
    callback: CaptchaCallback;
  };

  type CaptchaCallback = (
    data: ValidateResponse,
    captchaInstance: SliderCaptcha
  ) => void;

  enum SliderStatus {
    Loading,
    Ready,
    Move,
    Lock,
    Fail,
    Success,
  }

  type LangResource = {
    title: string;
    slider_ready: string;
    slider_fail: string;
    captcha_loading: string;
  };

  const langResources: {
    [key: string]: LangResource;
  } = {
    "en-US": {
      title: "Security/Safety Verification",
      slider_ready: "Slide to complete the puzzle",
      slider_fail: "Please try again",
      captcha_loading: "Loading ...",
    },
    "zh-CN": {
      title: "安全验证",
      slider_ready: "Slide to complete the puzzle",
      slider_fail: "请控制拼图片对齐缺口",
      captcha_loading: "正在载入...",
    },
    "zh-TW": {
      title: "安全驗證",
      slider_ready: "Slide to complete the puzzle",
      slider_fail: "請控制拼圖片對齊缺口",
      captcha_loading: "正在載入...",
    },
  };

  const defaultLang = "en-US";

  const originalRemove = Element.prototype.remove;
  Element.prototype.remove = function () {
    if (originalRemove) {
      originalRemove.call(this);
    } else {
      this.parentNode && this.parentNode.removeChild(this);
    }
  };

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
      position = position || this.length - searchString.length;
      return this.indexOf(searchString, position) === position;
    };
  }

  if (typeof Object.assign !== "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target) {
        // .length of function is 2
        if (target === null) {
          // TypeError if undefined or null
          throw new TypeError("Cannot convert undefined or null to object");
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    });
  }

  const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  const getDefaultLang = () => {
    let lang = getParameterByName("lang");
    if (!lang) {
      lang = getParameterByName("language");
    }

    return lang || defaultLang;
  };

  const createElement = (
    tagName: string,
    className = "",
    innerHtml = ""
  ): HTMLElement => {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (innerHtml) {
      element.innerHTML = innerHtml;
    }

    return element;
  };

  const createCanvas = (
    width: number,
    height: number,
    className = ""
  ): HTMLCanvasElement => {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    if (className) {
      canvas.className = className;
    }

    return canvas;
  };

  const loadImage = (
    src: string,
    onloadCallback: (value: HTMLImageElement) => void,
    onerrorCallback: (value: Event) => void = (e) => {
      console.error("Error to load image", e);
    }
  ): void => {
    const image = new Image();
    image.onload = () => {
      onloadCallback(image);
      image.remove();
    };
    image.onerror = (e: Event) => {
      onerrorCallback(e);
    };
    image.src = src;
  };

  const loadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
  </svg>`;

  const sliderReadySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
  </svg>`;

  const sliderFailSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>`;

  const sliderSuccessSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg>`;

  const refreshSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
  </svg>`;

  const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>`;

  const makeRequest = <T>(
    method: string,
    url: string,
    obj = {},
    resolve: (value: T) => void,
    reject: (value: { status: number; statusText: string }) => void
  ) => {
    const xhr = new XMLHttpRequest();
    const now = new Date();
    url += (url.indexOf("?") === -1 ? "?" : "&") + `t=${now.getTime()}`;
    xhr.open(method, url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const jsonResponse = JSON.parse(xhr.response) as T;
        resolve(jsonResponse);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));
  };

  const joinURL = (baseUrl: string, relativeUrl: string): string => {
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.substr(0, baseUrl.length - 1);
    }

    if (relativeUrl.startsWith("/")) {
      relativeUrl = relativeUrl.substr(1);
    }

    return `${baseUrl}/${relativeUrl}`;
  };

  class SliderCaptcha {
    static defaultOptions: CaptchaOptions = {
      lang: getDefaultLang(),
      baseUri: document.baseURI,
      width: 300,
      height: 160,
      sliderWidth: 40,
      sliderHeight: 40,
      callback: (_, instance) => {
        if (instance.element instanceof HTMLInputElement) {
          instance.cleanup();
          instance.element.value = instance.token;
        }
      },
    };

    private options = SliderCaptcha.defaultOptions;
    private element: HTMLElement;
    private backgroundCanvas: HTMLCanvasElement;
    private sliceCanvas: HTMLCanvasElement;
    private container: HTMLElement;
    private refreshIcon: HTMLElement;
    private closeIcon: HTMLElement;
    private sliderContainer: HTMLElement;
    private sliderText: HTMLElement;
    private sliderButton: HTMLElement;
    private sliderStatus = SliderStatus.Loading;
    private sliderMask: HTMLElement;
    private documentMousemove;
    private documentTouchmove;
    private documentMouseup;
    private documentTouchend;
    private token: string | undefined = undefined;
    private langResource: LangResource;
    private baseUrl: string;

    get backgroundCanvasContext() {
      return this.backgroundCanvas.getContext("2d");
    }

    get sliceCanvasContext() {
      return this.sliceCanvas.getContext("2d");
    }

    constructor(element: HTMLElement, options = SliderCaptcha.defaultOptions) {
      this.element = element;
      this.options = { ...SliderCaptcha.defaultOptions, ...options };
      this.langResource = this.getLangResource();
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

      this.baseUrl = joinURL(this.baseUrl, "slidercaptcha");
      this.initDOM();
      this.bindEvents();
      this.reset();
    }

    getLangResource = () => {
      let lang = this.options.lang || defaultLang;
      const langs = Object.keys(langResources);
      if (langs.indexOf(lang) === -1) {
        lang = defaultLang;
      }

      return langResources[lang];
    };

    initDOM = () => {
      this.container = document.body.appendChild(
        createElement("div", "captcha-container")
      );

      // header
      const captchaHeader = this.container.appendChild(
        createElement("div", "captcha-header")
      );
      captchaHeader.appendChild(
        createElement("span", "", this.langResource.title)
      );
      const headerIcons = captchaHeader.appendChild(
        createElement("div", "captcha-header-icons")
      );
      this.refreshIcon = headerIcons.appendChild(
        createElement("i", "captcha-refresh-icon", refreshSvg)
      );
      this.closeIcon = headerIcons.appendChild(
        createElement("i", "captcha-close-icon", closeSvg)
      );

      // body
      const captchaBody = this.container.appendChild(
        createElement("div", "captcha-body")
      );
      const captchaWidget = captchaBody.appendChild(
        createElement("div", "captcha-widget")
      );
      captchaWidget.style.width = this.options.width + "px";
      captchaWidget.style.height = this.options.height + "px";
      this.backgroundCanvas = captchaWidget.appendChild(
        createCanvas(
          this.options.width,
          this.options.height,
          "captcha-background"
        )
      );
      this.sliceCanvas = captchaWidget.appendChild(
        createCanvas(this.options.width, this.options.height, "captcha-slice")
      );
      const loading = captchaWidget.appendChild(
        createElement("div", "captcha-loading")
      );
      loading.appendChild(
        createElement("div", "captcha-loading-icon", loadingSvg)
      );
      loading.appendChild(
        createElement("span", "", this.langResource.captcha_loading)
      );

      // footer
      const captchaFooter = this.container.appendChild(
        createElement("div", "captcha-footer")
      );
      this.sliderContainer = captchaFooter.appendChild(
        createElement("div", "captcha-slider-container captcha-slider-ready")
      );
      this.sliderText = this.sliderContainer.appendChild(
        createElement("span", "captcha-slider-text")
      );
      this.sliderText.innerText = this.langResource.slider_ready;
      this.sliderMask = this.sliderContainer.appendChild(
        createElement("div", "captcha-slider-mask")
      );
      this.sliderButton = this.sliderContainer.appendChild(
        createElement("div", "captcha-slider-button")
      );
      this.sliderButton.appendChild(
        createElement("i", "captcha-slider-icon", sliderReadySvg)
      );
    };

    loadImages = () => {
      const requestBody: GenerateRequest = {
        Token: this.token,
      };
      makeRequest<GenerateResponse>(
        "POST",
        `${this.baseUrl}/generate`,
        requestBody,
        (response) => {
          this.toggleSliderStatus(SliderStatus.Ready);
          this.token = response.Token;
          loadImage(response.Background, (image) => {
            this.backgroundCanvasContext.drawImage(
              image,
              0,
              0,
              image.width,
              image.height
            );
          });
          loadImage(response.Slice, (image) => {
            this.sliceCanvasContext.drawImage(
              image,
              0,
              response.Position,
              image.width,
              image.height
            );
          });
        },
        ({ statusText }) => {
          console.error(statusText);
        }
      );
    };

    toggleSliderStatus = (status: SliderStatus) => {
      this.sliderStatus = status;
      const statusClassName = `captcha-slider-${SliderStatus[
        status
      ].toLowerCase()}`;
      this.sliderContainer.className = `captcha-slider-container ${statusClassName}`;
      let sliderSvg = sliderReadySvg;
      switch (status) {
        case SliderStatus.Fail:
          sliderSvg = sliderFailSvg;
          this.sliderText.innerText = this.langResource.slider_fail;
          break;
        case SliderStatus.Success:
          sliderSvg = sliderSuccessSvg;
          break;
      }

      if (status !== SliderStatus.Move) {
        this.sliderButton.innerHTML = sliderSvg;
      }
    };

    bindEvents = () => {
      let originX;
      this.refreshIcon.addEventListener("click", () => {
        if (
          this.sliderStatus === SliderStatus.Loading ||
          this.sliderStatus === SliderStatus.Lock
        ) {
          return;
        }

        this.reset();
      });
      this.closeIcon.addEventListener("click", () => {
        this.cleanup();
      });

      const handleDragStart = (x: number, y: number) => {
        if (
          this.sliderStatus === SliderStatus.Loading ||
          this.sliderStatus === SliderStatus.Lock
        ) {
          return;
        }

        console.log("handleDragStart");
        this.toggleSliderStatus(SliderStatus.Move);
        originX = x;
      };
      this.sliderButton.addEventListener("mousedown", (e) => {
        handleDragStart(e.clientX, e.clientY);
      });
      this.sliderButton.addEventListener("touchstart", (e) => {
        //console.log("touchstart");
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
      });

      const handleDragMove = (x: number, y: number) => {
        if (this.sliderStatus !== SliderStatus.Move) {
          return;
        }

        console.log(`handleDragMove (x: ${x}, y: ${y})`);
        const moveX = Math.min(
          Math.max(x - originX, 0),
          this.options.width - this.options.sliderWidth
        );
        this.sliderButton.style.left = moveX + "px";
        this.sliderMask.style.width = moveX + "px";
        this.sliceCanvas.style.left = moveX + "px";
      };
      document.addEventListener(
        "mousemove",
        (this.documentMousemove = (e) => {
          handleDragMove(e.clientX, e.clientY);
        })
      );
      document.addEventListener(
        "touchmove",
        (this.documentTouchmove = (e) => {
          //console.log("touchmove");
          handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
        })
      );

      const handleDragEnd = () => {
        if (this.sliderStatus !== SliderStatus.Move) {
          return;
        }

        console.log("handleDragEnd");
        this.toggleSliderStatus(SliderStatus.Lock);
        const requestBody: ValidateRequest = {
          Token: this.token,
          Position: this.sliceCanvas.offsetLeft,
        };
        makeRequest<ValidateResponse>(
          "POST",
          `${this.baseUrl}/verify`,
          requestBody,
          (response) => {
            const sliderStatus = response.IsSuccess
              ? SliderStatus.Success
              : SliderStatus.Fail;
            this.toggleSliderStatus(sliderStatus);
            setTimeout(() => {
              if (response.IsSuccess) {
                if (this.options.callback) {
                  this.options.callback.call(this, response, this);
                } else {
                  console.warn("Missing captcha callback");
                }
              } else {
                this.reset();
              }
            }, 1000);
          },
          ({ statusText }) => {
            console.error(statusText);
          }
        );
      };

      document.addEventListener(
        "mouseup",
        (this.documentMouseup = () => {
          handleDragEnd();
        })
      );
      document.addEventListener(
        "touchend",
        (this.documentTouchend = (e) => {
          //console.log("touchend");
          handleDragEnd();
        })
      );
    };

    reset = () => {
      const clearCanvasContext = (canvasContext: CanvasRenderingContext2D) => {
        canvasContext.clearRect(0, 0, this.options.width, this.options.height);
      };

      this.sliderButton.style.left = "0";
      this.sliderMask.style.width = "0";
      this.sliceCanvas.style.left = "0";
      this.toggleSliderStatus(SliderStatus.Loading);
      clearCanvasContext(this.backgroundCanvasContext);
      clearCanvasContext(this.sliceCanvasContext);
      this.loadImages();
    };

    cleanup = () => {
      this.container.remove();
      document.removeEventListener("mousemove", this.documentMousemove);
      document.removeEventListener("touchmove", this.documentTouchmove);
      document.removeEventListener("mouseup", this.documentMouseup);
      document.removeEventListener("touchend", this.documentTouchend);
    };
  }

  const Plugin = (element: string | HTMLElement, options: CaptchaOptions) => {
    let $element: HTMLElement | undefined;
    if (typeof element === "string") {
      $element = document.getElementById(element);
    } else {
      $element = element;
    }

    if (!$element) {
      throw "Require a valid HTML element";
    }

    return new SliderCaptcha($element, options);
  };

  (window as any).sliderCaptcha = Plugin;
  (window as any).sliderCaptcha.VERSION = "1.0";
  (window as any).sliderCaptcha.Constructor = SliderCaptcha;
})();
