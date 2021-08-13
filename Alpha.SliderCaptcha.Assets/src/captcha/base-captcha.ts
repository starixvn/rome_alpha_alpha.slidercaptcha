import { _CaptchaMediator } from "../types";

export abstract class _BaseCaptcha {
  constructor(protected _mediator: _CaptchaMediator) {}
  abstract _initBody: (_: HTMLElement) => void;
  abstract _initFooter: (_: HTMLElement) => void;
  abstract cleanup: () => void;
  abstract reset: (_: boolean) => void;
  abstract changeLanguage: () => void;
}
