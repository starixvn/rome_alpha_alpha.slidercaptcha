import { CaptchaMediator } from "../types";

export class BaseCaptcha {
  constructor(protected mediator: CaptchaMediator) {}
  initBody = (captchaBody: HTMLElement) => {};
  initFooter = (captchaFooter: HTMLElement) => {};
  cleanup = () => {};
  reset = () => {};
  changeLanguage = () => {};
}
