// https://github.com/ArgoZhang/SliderCaptcha
// https://www.jqueryscript.net/demo/image-puzzle-slider-captcha/
// UX: https://www.geetest.com/en/demo

import { _SliderCaptcha } from "./captcha/main";
import { _CaptchaOptions } from "./types";
import { _polyfill } from "./utils";

const Plugin = (element: string | HTMLElement, options: _CaptchaOptions) => {
  let $element: HTMLElement | undefined;
  if (typeof element === "string") {
    $element = document.getElementById(element);
  } else {
    $element = element;
  }

  if (!$element) {
    throw "Require a valid HTML element";
  }

  return new _SliderCaptcha($element, options);
};

_polyfill();
(window as any).sliderCaptcha = Plugin;
(window as any).sliderCaptcha.Constructor = _SliderCaptcha;
