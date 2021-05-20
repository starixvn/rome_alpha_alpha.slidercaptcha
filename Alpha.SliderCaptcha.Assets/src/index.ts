// https://github.com/ArgoZhang/SliderCaptcha
// https://www.jqueryscript.net/demo/image-puzzle-slider-captcha/
// UX: https://www.geetest.com/en/demo

import { SliderCaptcha } from "./captchas/main";
import { CaptchaOptions } from "./types";
import { polyfill } from "./utils";

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

polyfill();
(window as any).sliderCaptcha = Plugin;
(window as any).sliderCaptcha.VERSION = "1.0";
(window as any).sliderCaptcha.Constructor = SliderCaptcha;
