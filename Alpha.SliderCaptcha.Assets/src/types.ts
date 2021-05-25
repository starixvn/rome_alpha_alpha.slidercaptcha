export type _GenerateRequest = {
  Token: string;
  Style: number;
};

export type _ImageCaptchaData = {
  Background: string;
  Slice: string;
  Position: number;
};

export type _TextCaptchaData = {
  Background: string;
};

export type _GenerateResponse = {
  Token: string;
  Data: _ImageCaptchaData | _TextCaptchaData;
};

export type _GenerateResponseCallback = (response: _GenerateResponse) => void;

export type _ValidateRequest = {
  Token: string;
  Data: string;
};

export type _ValidateResponseCallback = (response: _ValidateResponse) => void;

export type _ValidateResponse = {
  Code: number;
  Message: string;
};

export type _CaptchaOptions = {
  lang: string;
  baseUri: string;
  topElement: HTMLElement;
  style?: _CaptchaStyle;
  callback?: _CaptchaCallback;
};

export type _CaptchaEvent = {
  preventDefault: boolean;
};

export type _CaptchaCallback = (
  data: _ValidateResponse,
  event: _CaptchaEvent
) => void;

export type _LangResource = {
  _header_title: string;
  _slider_ready: string;
  _captcha_loading: string;
  _validate_fail_message: string;
  _validate_success_message: string;
  _validate_button: string;
  _validate_placeholder: string;
};

export type _CaptchaMediator = {
  _getLangResource: () => _LangResource;
  _getTopElement: () => HTMLElement;
  _makeGenerateRequest: (callback: _GenerateResponseCallback) => void;
  _makeValidateRequest: (
    data: string,
    callback: _ValidateResponseCallback
  ) => void;
  _setStatus: (status: _CaptchaStatus) => void;
  _getStatus: () => _CaptchaStatus;
  _showMessage: (message: string) => void;
  _hideMessage: () => void;
};

export enum _CaptchaStatus {
  Loading = 0,
  Ready = 1,
  Slide = 2,
  Validate = 3,
  Fail = 4,
  Success = 5,
}

export enum _CaptchaStyle {
  Text = 0,
  Image = 1,
}

export interface _ISliderCaptcha {
  reset: (force: boolean) => void;
  cleanup: () => void;
  changeLanguage: (lang: string) => void;
}