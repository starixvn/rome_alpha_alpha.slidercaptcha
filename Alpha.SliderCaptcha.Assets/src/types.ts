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

export type LangResource = {
  header_title: string;
  slider_ready: string;
  captcha_loading: string;
  validate_fail_message: string;
  validate_success_message: string;
  validate_button: string;
  validate_placeholder: string;
};

export type CaptchaMediator = {
  getLangResource: () => LangResource;
  getTopElement: () => HTMLElement;
  makeGenerateRequest: (callback: GenerateResponseCallback) => void;
  makeValidateRequest: (
    data: string,
    callback: ValidateResponseCallback
  ) => void;
  setStatus: (status: CaptchaStatus) => void;
  getStatus: () => CaptchaStatus;
  showMessage: (message: string) => void;
  hideMessage: () => void;
};

export enum CaptchaStatus {
  Loading = 0,
  Ready = 1,
  Slide = 2,
  Validate = 3,
  Fail = 4,
  Success = 5,
}

export enum CaptchaStyle {
  Text = 0,
  Image = 1,
}

export interface ISliderCaptcha {
  reset: (force: boolean) => void;
  cleanup: () => void;
  changeLanguage: (lang: string) => void;
}
