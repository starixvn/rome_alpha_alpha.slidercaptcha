import { defaultLang, langResources } from "./consts";

export const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const getDefaultLang = () => {
  let lang = getParameterByName("lang");
  if (!lang) {
    lang = getParameterByName("language");
  }

  return lang || defaultLang;
};

export const showElement = (element: HTMLElement) => {
  element.style.display = "block";
};

export const hideElement = (element: HTMLElement) => {
  element.style.display = "none";
};

export const createHiddenInput = (name: string): HTMLInputElement => {
  const input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", name);
  return input;
};

export const createElement = (
  tagName: string,
  className = "",
  innerHtml = ""
): HTMLElement => {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (innerHtml) {
    element.innerHTML = innerHtml;
  }

  return element;
};

export const createCanvas = (
  width: number,
  height: number,
  className = ""
): HTMLCanvasElement => {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  if (className) {
    canvas.className = className;
  }

  return canvas;
};

export const loadImage = (
  src: string,
  onloadCallback: (value: HTMLImageElement) => void,
  onerrorCallback: (value: Event) => void = (e) => {
    console.error("Error to load image", e);
  }
): void => {
  const image = new Image();
  image.onload = () => {
    onloadCallback(image);
    image.remove();
  };
  image.onerror = (e: Event) => {
    onerrorCallback(e);
  };
  image.src = src;
};

export const makeRequest = <T>(
  method: string,
  url: string,
  obj = {},
  resolve: (value: T) => void,
  reject: (value: { status: number; statusText: string }) => void
) => {
  const xhr = new XMLHttpRequest();
  const now = new Date();
  url += (url.indexOf("?") === -1 ? "?" : "&") + `t=${now.getTime()}`;
  xhr.open(method, url);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const jsonResponse = JSON.parse(xhr.response) as T;
      resolve(jsonResponse);
    } else {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    }
  };
  xhr.onerror = () => {
    reject({
      status: xhr.status,
      statusText: xhr.statusText,
    });
  };
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));
};

export const joinURL = (baseUrl: string, relativeUrl: string): string => {
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.substr(0, baseUrl.length - 1);
  }

  if (relativeUrl.startsWith("/")) {
    relativeUrl = relativeUrl.substr(1);
  }

  return `${baseUrl}/${relativeUrl}`;
};

export const polyfill = () => {
  const originalRemove = Element.prototype.remove;
  Element.prototype.remove = function () {
    if (originalRemove) {
      originalRemove.call(this);
    } else {
      this.parentNode && this.parentNode.removeChild(this);
    }
  };

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
      position = position || this.length - searchString.length;
      return this.indexOf(searchString, position) === position;
    };
  }

  if (typeof Object.assign !== "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target) {
        // .length of function is 2
        if (target === null) {
          // TypeError if undefined or null
          throw new TypeError("Cannot convert undefined or null to object");
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    });
  }
};

export const getLangResource = (lang: string) => {
  lang = lang || defaultLang;
  const langs = Object.keys(langResources);
  if (langs.indexOf(lang) === -1) {
    lang = defaultLang;
  }

  return langResources[lang];
};

export const getClientWidth = (element: HTMLElement) => {
  return element.clientWidth;
};

export const setClientSize = (
  element: HTMLElement,
  width: number,
  height: number
) => {
  element.style.width = width + "px";
  element.style.height = height + "px";
};
