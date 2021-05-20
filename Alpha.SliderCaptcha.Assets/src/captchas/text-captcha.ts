import { CaptchaMediator } from "../types";
import { BaseCaptcha } from "./base-captcha";

export class TextCaptcha extends BaseCaptcha {
  constructor(mediator: CaptchaMediator) {
    super(mediator);
    this.initDOM();
  }

  private initDOM() {}

  initBody = (captchaBody: HTMLElement) => {};

  initFooter = (captchaFooter: HTMLElement) => {};
}
