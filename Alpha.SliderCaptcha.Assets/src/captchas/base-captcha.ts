import { CaptchaMediator } from "../types";

export class BaseCaptcha {
  constructor(protected mediator: CaptchaMediator) {}
  initBody = (_: HTMLElement) => {};
  initFooter = (_: HTMLElement) => {};
  cleanup = () => {};
  reset = () => {};
  changeLanguage = () => {};
  isForceReset = () => true;
}
