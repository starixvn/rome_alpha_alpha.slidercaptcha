export type GenerateRequest = {
  Token: string;
  Style: number;
};

export type ImageCaptchaData = {
  Background: string;
  Slice: string;
  Position: number;
};

export type TextCaptchaData = {
  Background: string;
};

export type GenerateResponse = {
  Token: string;
  Data: ImageCaptchaData | TextCaptchaData;
};

export type GenerateResponseCallback = (response: GenerateResponse) => void;

export type ValidateRequest = {
  Token: string;
  Data: string;
};

export type ValidateResponseCallback = (response: ValidateResponse) => void;

export type ValidateResponse = {
  Code: number;
  Message: string;
  IsSuccess: boolean;
};

export type CaptchaOptions = {
  lang: string;
  baseUri: string;
  topElement: HTMLElement;
  style?: CaptchaStyle;
  callback?: CaptchaCallback;
};

export type CaptchaEvent = {
  preventDefault: boolean;
};

export type CaptchaCallback = (
  data: ValidateResponse,
  event: CaptchaEvent
) => void;

export enum CaptchaStatus {
  Loading,
  Ready,
  Move,
  Lock,
  Fail,
  Success,
}

export enum CaptchaStyle {
  Text = 0,
  Image = 1,
}

export type LangResource = {
  title: string;
  slider_ready: string;
  slider_fail: string;
  captcha_loading: string;
  success_message: string;
  verify: string;
  verify_placeholder: string;
};

export interface ISliderCaptcha {
  reset: () => void;
  cleanup: () => void;
  changeLanguage: (lang: string) => void;
}

export type CaptchaMediator = {
  getLangResource: () => LangResource;
  getTopElement: () => HTMLElement;
  generateRequest: (callback: GenerateResponseCallback) => void;
  validateRequest: (data: string, callback: ValidateResponseCallback) => void;
  setStatus: (status: CaptchaStatus) => void;
  getStatus: () => CaptchaStatus;
};
