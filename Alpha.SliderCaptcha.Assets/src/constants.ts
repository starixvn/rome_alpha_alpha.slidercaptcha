import { _LangResource } from "./types";

export const _defaultLang = "en-US";
export const _captchaTimeout = 1_000;

export const _langResources: {
  [key: string]: _LangResource;
} = {
  "en-US": {
    _header_title: "Security/Safety Verification",
    _slider_ready: "Slide to complete the puzzle",
    _validate_fail_message: "Please try again",
    _captcha_loading: "Loading ...",
    _validate_success_message: "Verification Succeeded",
    _validate_button: "Verify",
    _validate_placeholder: "Validation",
  },
  "zh-CN": {
    _header_title: "安全验证",
    _slider_ready: "拖动滑块完成拼图",
    _validate_fail_message: "请重试",
    _captcha_loading: "正在载入...",
    _validate_success_message: "验证成功",
    _validate_button: "Verify",
    _validate_placeholder: "Validation",
  },
  "zh-TW": {
    _header_title: "安全驗證",
    _slider_ready: "拖動滑塊完成拼圖",
    _validate_fail_message: "請重試",
    _captcha_loading: "正在載入...",
    _validate_success_message: "驗證成功",
    _validate_button: "Verify",
    _validate_placeholder: "Validation",
  },
  "vi-VN": {
    _header_title: "Xác Thực Captcha",
    _slider_ready: "Trượt để hoàn thành bức tranh",
    _validate_fail_message: "Vui lòng thử lại",
    _captcha_loading: "Đang tải...",
    _validate_success_message: "Xác Thực Thành Công",
    _validate_button: "Verify",
    _validate_placeholder: "Validation",
  },
  "th-TH": {
    _header_title: "การตรวจสอบเพื่อความปลอดภัย",
    _slider_ready: "เลื่อนเพื่อไขปริศนา",
    _validate_fail_message: "กรุณาลองอีกครั้ง",
    _captcha_loading: "กำลังเตรียม ...",
    _validate_success_message: "ตรวจสอบสำเร็จแล้ว",
    _validate_button: "Verify",
    _validate_placeholder: "Validation",
  },
};

export const _loadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/></svg>`;

export const _sliderReadySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg>`;

export const _sliderFailSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`;

export const _sliderSuccessSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>`;

export const _refreshSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg>`;
