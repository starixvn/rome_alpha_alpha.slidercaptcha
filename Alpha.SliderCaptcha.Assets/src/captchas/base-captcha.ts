import { CaptchaMediator } from "../types";

export class BaseCaptcha {
  constructor(protected _mediator: CaptchaMediator) {}
  initBody = (_: HTMLElement) => {};
  initFooter = (_: HTMLElement) => {};
  cleanup = () => {};
  reset = (_: boolean) => {};
  changeLanguage = () => {};
}
