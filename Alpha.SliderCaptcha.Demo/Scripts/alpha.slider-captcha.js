/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function() {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function () {
    var SliderStatus;
    (function (SliderStatus) {
        SliderStatus[SliderStatus["Loading"] = 0] = "Loading";
        SliderStatus[SliderStatus["Ready"] = 1] = "Ready";
        SliderStatus[SliderStatus["Move"] = 2] = "Move";
        SliderStatus[SliderStatus["Lock"] = 3] = "Lock";
        SliderStatus[SliderStatus["Fail"] = 4] = "Fail";
        SliderStatus[SliderStatus["Success"] = 5] = "Success";
    })(SliderStatus || (SliderStatus = {}));
    var langResources = {
        "en-US": {
            title: "Security/Safety Verification",
            slider_ready: "Slide to complete the puzzle",
            slider_fail: "Please try again",
            captcha_loading: "Loading ...",
        },
        "zh-CN": {
            title: "安全验证",
            slider_ready: "Slide to complete the puzzle",
            slider_fail: "请控制拼图片对齐缺口",
            captcha_loading: "正在载入...",
        },
        "zh-TW": {
            title: "安全驗證",
            slider_ready: "Slide to complete the puzzle",
            slider_fail: "請控制拼圖片對齊缺口",
            captcha_loading: "正在載入...",
        },
    };
    var defaultLang = "en-US";
    if (typeof Object.assign !== "function") {
        Object.defineProperty(Object, "assign", {
            value: function assign(target) {
                if (target === null) {
                    throw new TypeError("Cannot convert undefined or null to object");
                }
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
                    if (nextSource !== null) {
                        for (var nextKey in nextSource) {
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
    var getParameterByName = function (name, url) {
        if (url === void 0) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    var getDefaultLang = function () {
        var lang = getParameterByName("lang");
        if (!lang) {
            lang = getParameterByName("language");
        }
        return lang || defaultLang;
    };
    var createElement = function (tagName, className, innerHtml) {
        if (className === void 0) { className = ""; }
        if (innerHtml === void 0) { innerHtml = ""; }
        var element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        if (innerHtml) {
            element.innerHTML = innerHtml;
        }
        return element;
    };
    var createCanvas = function (width, height, className) {
        if (className === void 0) { className = ""; }
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        if (className) {
            canvas.className = className;
        }
        return canvas;
    };
    var loadImage = function (src, onloadCallback, onerrorCallback) {
        if (onerrorCallback === void 0) { onerrorCallback = function (e) {
            console.error("Error to load image", e);
        }; }
        var image = new Image();
        image.onload = function () {
            onloadCallback(image);
            image.remove();
        };
        image.onerror = function (e) {
            onerrorCallback(e);
        };
        image.src = src;
    };
    var loadingSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n    <path d=\"M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>\n    <path d=\"M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z\"/>\n  </svg>";
    var sliderReadySvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z\"/>\n  </svg>";
    var sliderFailSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\">\n    <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>\n  </svg>";
    var sliderSuccessSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check2\" viewBox=\"0 0 16 16\">\n    <path d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\n  </svg>";
    var refreshSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n    <path d=\"M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z\"/>\n    <path fill-rule=\"evenodd\" d=\"M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z\"/>\n  </svg>";
    var closeSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n    <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\n    <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>\n  </svg>";
    var makeRequest = function (method, url, obj) {
        if (obj === void 0) { obj = {}; }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            var now = new Date();
            url += (url.indexOf("?") === -1 ? "?" : "&") + ("t=" + now.getTime());
            xhr.open(method, url);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var jsonResponse = JSON.parse(xhr.response);
                    resolve(jsonResponse);
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                });
            };
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(obj));
        });
    };
    var SliderCaptcha = (function () {
        function SliderCaptcha(element, options) {
            var _this = this;
            if (options === void 0) { options = SliderCaptcha.defaultOptions; }
            this.options = SliderCaptcha.defaultOptions;
            this.sliderStatus = SliderStatus.Loading;
            this.token = undefined;
            this.getLangResource = function () {
                var lang = _this.options.lang || defaultLang;
                var langs = Object.keys(langResources);
                if (langs.indexOf(lang) === -1) {
                    lang = defaultLang;
                }
                return langResources[lang];
            };
            this.initDOM = function () {
                _this.container = document.body.appendChild(createElement("div", "captcha-container"));
                var captchaHeader = _this.container.appendChild(createElement("div", "captcha-header"));
                captchaHeader.appendChild(createElement("span", "", _this.langResource.title));
                var headerIcons = captchaHeader.appendChild(createElement("div", "captcha-header-icons"));
                _this.refreshIcon = headerIcons.appendChild(createElement("i", "captcha-refresh-icon", refreshSvg));
                _this.closeIcon = headerIcons.appendChild(createElement("i", "captcha-close-icon", closeSvg));
                var captchaBody = _this.container.appendChild(createElement("div", "captcha-body"));
                var captchaWidget = captchaBody.appendChild(createElement("div", "captcha-widget"));
                captchaWidget.style.width = _this.options.width + "px";
                captchaWidget.style.height = _this.options.height + "px";
                _this.backgroundCanvas = captchaWidget.appendChild(createCanvas(_this.options.width, _this.options.height, "captcha-background"));
                _this.sliceCanvas = captchaWidget.appendChild(createCanvas(_this.options.width, _this.options.height, "captcha-slice"));
                var loading = captchaWidget.appendChild(createElement("div", "captcha-loading"));
                loading.appendChild(createElement("div", "captcha-loading-icon", loadingSvg));
                loading.appendChild(createElement("span", "", _this.langResource.captcha_loading));
                var captchaFooter = _this.container.appendChild(createElement("div", "captcha-footer"));
                _this.sliderContainer = captchaFooter.appendChild(createElement("div", "captcha-slider-container captcha-slider-ready"));
                _this.sliderText = _this.sliderContainer.appendChild(createElement("span", "captcha-slider-text"));
                _this.sliderText.innerText = _this.langResource.slider_ready;
                _this.sliderMask = _this.sliderContainer.appendChild(createElement("div", "captcha-slider-mask"));
                _this.sliderButton = _this.sliderContainer.appendChild(createElement("div", "captcha-slider-button"));
                _this.sliderButton.appendChild(createElement("i", "captcha-slider-icon", sliderReadySvg));
            };
            this.loadImages = function () {
                var requestBody = {
                    Token: _this.token,
                };
                makeRequest("POST", _this.baseUrl + "/generate", requestBody).then(function (response) {
                    _this.toggleSliderStatus(SliderStatus.Ready);
                    _this.token = response.Token;
                    loadImage(response.Background, function (image) {
                        _this.backgroundCanvasContext.drawImage(image, 0, 0, image.width, image.height);
                    });
                    loadImage(response.Slice, function (image) {
                        _this.sliceCanvasContext.drawImage(image, 0, response.Position, image.width, image.height);
                    });
                });
            };
            this.toggleSliderStatus = function (status) {
                _this.sliderStatus = status;
                var statusClassName = "captcha-slider-" + SliderStatus[status].toLowerCase();
                _this.sliderContainer.className = "captcha-slider-container " + statusClassName;
                var sliderSvg = sliderReadySvg;
                switch (status) {
                    case SliderStatus.Fail:
                        sliderSvg = sliderFailSvg;
                        _this.sliderText.innerText = _this.langResource.slider_fail;
                        break;
                    case SliderStatus.Success:
                        sliderSvg = sliderSuccessSvg;
                        break;
                }
                if (status !== SliderStatus.Move) {
                    _this.sliderButton.innerHTML = sliderSvg;
                }
            };
            this.bindEvents = function () {
                var originX;
                _this.refreshIcon.addEventListener("click", function () {
                    if (_this.sliderStatus === SliderStatus.Loading ||
                        _this.sliderStatus === SliderStatus.Lock) {
                        return;
                    }
                    _this.reset();
                });
                _this.closeIcon.addEventListener("click", function () {
                    _this.cleanup();
                });
                var handleDragStart = function (x, y) {
                    if (_this.sliderStatus === SliderStatus.Loading ||
                        _this.sliderStatus === SliderStatus.Lock) {
                        return;
                    }
                    console.log("handleDragStart");
                    _this.toggleSliderStatus(SliderStatus.Move);
                    originX = x;
                };
                _this.sliderButton.addEventListener("mousedown", function (e) {
                    handleDragStart(e.clientX, e.clientY);
                });
                _this.sliderButton.addEventListener("touchstart", function (e) {
                    handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
                });
                var handleDragMove = function (x, y) {
                    if (_this.sliderStatus !== SliderStatus.Move) {
                        return;
                    }
                    console.log("handleDragMove (x: " + x + ", y: " + y + ")");
                    var moveX = Math.min(Math.max(x - originX, 0), _this.options.width - _this.options.sliderWidth);
                    _this.sliderButton.style.left = moveX + "px";
                    _this.sliderMask.style.width = moveX + "px";
                    _this.sliceCanvas.style.left = moveX + "px";
                };
                document.addEventListener("mousemove", (_this.documentMousemove = function (e) {
                    handleDragMove(e.clientX, e.clientY);
                }));
                document.addEventListener("touchmove", (_this.documentTouchmove = function (e) {
                    handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
                }));
                var handleDragEnd = function () {
                    if (_this.sliderStatus !== SliderStatus.Move) {
                        return;
                    }
                    console.log("handleDragEnd");
                    _this.toggleSliderStatus(SliderStatus.Lock);
                    var requestBody = {
                        Token: _this.token,
                        Position: _this.sliceCanvas.offsetLeft,
                    };
                    makeRequest("POST", _this.baseUrl + "/verify", requestBody).then(function (response) {
                        var sliderStatus = response.IsSuccess
                            ? SliderStatus.Success
                            : SliderStatus.Fail;
                        _this.toggleSliderStatus(sliderStatus);
                        setTimeout(function () {
                            if (response.IsSuccess) {
                                if (_this.options.callback) {
                                    _this.options.callback.call(_this, response, _this);
                                }
                                else {
                                    console.warn("Missing captcha callback");
                                }
                            }
                            else {
                                _this.reset();
                            }
                        }, 1000);
                    });
                };
                document.addEventListener("mouseup", (_this.documentMouseup = function () {
                    handleDragEnd();
                }));
                document.addEventListener("touchend", (_this.documentTouchend = function (e) {
                    handleDragEnd();
                }));
            };
            this.reset = function () {
                var clearCanvasContext = function (canvasContext) {
                    canvasContext.clearRect(0, 0, _this.options.width, _this.options.height);
                };
                _this.sliderButton.style.left = "0";
                _this.sliderMask.style.width = "0";
                _this.sliceCanvas.style.left = "0";
                _this.toggleSliderStatus(SliderStatus.Loading);
                clearCanvasContext(_this.backgroundCanvasContext);
                clearCanvasContext(_this.sliceCanvasContext);
                _this.loadImages();
            };
            this.cleanup = function () {
                _this.container.remove();
                document.removeEventListener("mousemove", _this.documentMousemove);
                document.removeEventListener("touchmove", _this.documentTouchmove);
                document.removeEventListener("mouseup", _this.documentMouseup);
                document.removeEventListener("touchend", _this.documentTouchend);
            };
            this.element = element;
            this.options = __assign(__assign({}, SliderCaptcha.defaultOptions), options);
            this.langResource = this.getLangResource();
            if (!location.origin
                .toLowerCase()
                .startsWith(this.options.baseUri.toLowerCase())) {
                this.baseUrl = new URL(this.options.baseUri, location.origin);
            }
            this.baseUrl = new URL("slidercaptcha", this.baseUrl);
            this.initDOM();
            this.bindEvents();
            this.reset();
        }
        Object.defineProperty(SliderCaptcha.prototype, "backgroundCanvasContext", {
            get: function () {
                return this.backgroundCanvas.getContext("2d");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderCaptcha.prototype, "sliceCanvasContext", {
            get: function () {
                return this.sliceCanvas.getContext("2d");
            },
            enumerable: false,
            configurable: true
        });
        SliderCaptcha.defaultOptions = {
            lang: getDefaultLang(),
            baseUri: document.baseURI,
            width: 300,
            height: 160,
            sliderWidth: 40,
            sliderHeight: 40,
            callback: function (_, instance) {
                if (instance.element instanceof HTMLInputElement) {
                    instance.cleanup();
                    instance.element.value = instance.token;
                }
            },
        };
        return SliderCaptcha;
    }());
    var Plugin = function (element, options) {
        var $element;
        if (typeof element === "string") {
            $element = document.getElementById(element);
        }
        else {
            $element = element;
        }
        if (!$element) {
            throw "Require a valid HTML element";
        }
        return new SliderCaptcha($element, options);
    };
    window.sliderCaptcha = Plugin;
    window.sliderCaptcha.VERSION = "1.0";
    window.sliderCaptcha.Constructor = SliderCaptcha;
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__["./src/index.ts"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbHBoYS5zbGlkZXItY2FwdGNoYS5hc3NldHMvLi9zcmMvaW5kZXguc2Nzcz9iNmE1Iiwid2VicGFjazovL2FscGhhLnNsaWRlci1jYXB0Y2hhLmFzc2V0cy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9hbHBoYS5zbGlkZXItY2FwdGNoYS5hc3NldHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWxwaGEuc2xpZGVyLWNhcHRjaGEuYXNzZXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYWxwaGEuc2xpZGVyLWNhcHRjaGEuYXNzZXRzL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxvQ0FBb0M7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsMEJBQTBCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDZCQUE2Qiw0QkFBNEI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FB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O1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSwyQ0FBMkM7VUFDM0M7VUFDQSIsImZpbGUiOiJTY3JpcHRzL2FscGhhLnNsaWRlci1jYXB0Y2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIFNsaWRlclN0YXR1cztcclxuICAgIChmdW5jdGlvbiAoU2xpZGVyU3RhdHVzKSB7XHJcbiAgICAgICAgU2xpZGVyU3RhdHVzW1NsaWRlclN0YXR1c1tcIkxvYWRpbmdcIl0gPSAwXSA9IFwiTG9hZGluZ1wiO1xyXG4gICAgICAgIFNsaWRlclN0YXR1c1tTbGlkZXJTdGF0dXNbXCJSZWFkeVwiXSA9IDFdID0gXCJSZWFkeVwiO1xyXG4gICAgICAgIFNsaWRlclN0YXR1c1tTbGlkZXJTdGF0dXNbXCJNb3ZlXCJdID0gMl0gPSBcIk1vdmVcIjtcclxuICAgICAgICBTbGlkZXJTdGF0dXNbU2xpZGVyU3RhdHVzW1wiTG9ja1wiXSA9IDNdID0gXCJMb2NrXCI7XHJcbiAgICAgICAgU2xpZGVyU3RhdHVzW1NsaWRlclN0YXR1c1tcIkZhaWxcIl0gPSA0XSA9IFwiRmFpbFwiO1xyXG4gICAgICAgIFNsaWRlclN0YXR1c1tTbGlkZXJTdGF0dXNbXCJTdWNjZXNzXCJdID0gNV0gPSBcIlN1Y2Nlc3NcIjtcclxuICAgIH0pKFNsaWRlclN0YXR1cyB8fCAoU2xpZGVyU3RhdHVzID0ge30pKTtcclxuICAgIHZhciBsYW5nUmVzb3VyY2VzID0ge1xyXG4gICAgICAgIFwiZW4tVVNcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJTZWN1cml0eS9TYWZldHkgVmVyaWZpY2F0aW9uXCIsXHJcbiAgICAgICAgICAgIHNsaWRlcl9yZWFkeTogXCJTbGlkZSB0byBjb21wbGV0ZSB0aGUgcHV6emxlXCIsXHJcbiAgICAgICAgICAgIHNsaWRlcl9mYWlsOiBcIlBsZWFzZSB0cnkgYWdhaW5cIixcclxuICAgICAgICAgICAgY2FwdGNoYV9sb2FkaW5nOiBcIkxvYWRpbmcgLi4uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInpoLUNOXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwi5a6J5YWo6aqM6K+BXCIsXHJcbiAgICAgICAgICAgIHNsaWRlcl9yZWFkeTogXCJTbGlkZSB0byBjb21wbGV0ZSB0aGUgcHV6emxlXCIsXHJcbiAgICAgICAgICAgIHNsaWRlcl9mYWlsOiBcIuivt+aOp+WItuaLvOWbvueJh+Wvuem9kOe8uuWPo1wiLFxyXG4gICAgICAgICAgICBjYXB0Y2hhX2xvYWRpbmc6IFwi5q2j5Zyo6L295YWlLi4uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInpoLVRXXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwi5a6J5YWo6amX6K2JXCIsXHJcbiAgICAgICAgICAgIHNsaWRlcl9yZWFkeTogXCJTbGlkZSB0byBjb21wbGV0ZSB0aGUgcHV6emxlXCIsXHJcbiAgICAgICAgICAgIHNsaWRlcl9mYWlsOiBcIuiri+aOp+WItuaLvOWclueJh+Wwjem9iue8uuWPo1wiLFxyXG4gICAgICAgICAgICBjYXB0Y2hhX2xvYWRpbmc6IFwi5q2j5Zyo6LyJ5YWlLi4uXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICB2YXIgZGVmYXVsdExhbmcgPSBcImVuLVVTXCI7XHJcbiAgICBpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsIFwiYXNzaWduXCIsIHtcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNvdXJjZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG87XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB2YXIgZ2V0UGFyYW1ldGVyQnlOYW1lID0gZnVuY3Rpb24gKG5hbWUsIHVybCkge1xyXG4gICAgICAgIGlmICh1cmwgPT09IHZvaWQgMCkgeyB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjsgfVxyXG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKSwgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuICAgICAgICBpZiAoIXJlc3VsdHMpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICghcmVzdWx0c1syXSlcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG4gICAgfTtcclxuICAgIHZhciBnZXREZWZhdWx0TGFuZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbGFuZyA9IGdldFBhcmFtZXRlckJ5TmFtZShcImxhbmdcIik7XHJcbiAgICAgICAgaWYgKCFsYW5nKSB7XHJcbiAgICAgICAgICAgIGxhbmcgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJsYW5ndWFnZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhbmcgfHwgZGVmYXVsdExhbmc7XHJcbiAgICB9O1xyXG4gICAgdmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAodGFnTmFtZSwgY2xhc3NOYW1lLCBpbm5lckh0bWwpIHtcclxuICAgICAgICBpZiAoY2xhc3NOYW1lID09PSB2b2lkIDApIHsgY2xhc3NOYW1lID0gXCJcIjsgfVxyXG4gICAgICAgIGlmIChpbm5lckh0bWwgPT09IHZvaWQgMCkgeyBpbm5lckh0bWwgPSBcIlwiOyB9XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbm5lckh0bWwpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckh0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfTtcclxuICAgIHZhciBjcmVhdGVDYW52YXMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgaWYgKGNsYXNzTmFtZSA9PT0gdm9pZCAwKSB7IGNsYXNzTmFtZSA9IFwiXCI7IH1cclxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2FudmFzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcclxuICAgIH07XHJcbiAgICB2YXIgbG9hZEltYWdlID0gZnVuY3Rpb24gKHNyYywgb25sb2FkQ2FsbGJhY2ssIG9uZXJyb3JDYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChvbmVycm9yQ2FsbGJhY2sgPT09IHZvaWQgMCkgeyBvbmVycm9yQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdG8gbG9hZCBpbWFnZVwiLCBlKTtcclxuICAgICAgICB9OyB9XHJcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvbmxvYWRDYWxsYmFjayhpbWFnZSk7XHJcbiAgICAgICAgICAgIGltYWdlLnJlbW92ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIG9uZXJyb3JDYWxsYmFjayhlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGltYWdlLnNyYyA9IHNyYztcclxuICAgIH07XHJcbiAgICB2YXIgbG9hZGluZ1N2ZyA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyOFxcXCIgaGVpZ2h0PVxcXCIyOFxcXCIgZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTYgMTZcXFwiPlxcbiAgICA8cGF0aCBkPVxcXCJNNi4wMDIgNS41YTEuNSAxLjUgMCAxIDEtMyAwIDEuNSAxLjUgMCAwIDEgMyAwelxcXCIvPlxcbiAgICA8cGF0aCBkPVxcXCJNMS41IDJBMS41IDEuNSAwIDAgMCAwIDMuNXY5QTEuNSAxLjUgMCAwIDAgMS41IDE0aDEzYTEuNSAxLjUgMCAwIDAgMS41LTEuNXYtOUExLjUgMS41IDAgMCAwIDE0LjUgMmgtMTN6bTEzIDFhLjUuNSAwIDAgMSAuNS41djZsLTMuNzc1LTEuOTQ3YS41LjUgMCAwIDAtLjU3Ny4wOTNsLTMuNzEgMy43MS0yLjY2LTEuNzcyYS41LjUgMCAwIDAtLjYzLjA2MkwxLjAwMiAxMnYuNTRBLjUwNS41MDUgMCAwIDEgMSAxMi41di05YS41LjUgMCAwIDEgLjUtLjVoMTN6XFxcIi8+XFxuICA8L3N2Zz5cIjtcclxuICAgIHZhciBzbGlkZXJSZWFkeVN2ZyA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyOFxcXCIgaGVpZ2h0PVxcXCIyOFxcXCIgZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTYgMTZcXFwiPlxcbiAgICA8cGF0aCBmaWxsLXJ1bGU9XFxcImV2ZW5vZGRcXFwiIGQ9XFxcIk00IDhhLjUuNSAwIDAgMSAuNS0uNWg1Ljc5M0w4LjE0NiA1LjM1NGEuNS41IDAgMSAxIC43MDgtLjcwOGwzIDNhLjUuNSAwIDAgMSAwIC43MDhsLTMgM2EuNS41IDAgMCAxLS43MDgtLjcwOEwxMC4yOTMgOC41SDQuNUEuNS41IDAgMCAxIDQgOHpcXFwiLz5cXG4gIDwvc3ZnPlwiO1xyXG4gICAgdmFyIHNsaWRlckZhaWxTdmcgPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjhcXFwiIGhlaWdodD1cXFwiMjhcXFwiIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIgY2xhc3M9XFxcImJpIGJpLXhcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNiAxNlxcXCI+XFxuICAgIDxwYXRoIGQ9XFxcIk00LjY0NiA0LjY0NmEuNS41IDAgMCAxIC43MDggMEw4IDcuMjkzbDIuNjQ2LTIuNjQ3YS41LjUgMCAwIDEgLjcwOC43MDhMOC43MDcgOGwyLjY0NyAyLjY0NmEuNS41IDAgMCAxLS43MDguNzA4TDggOC43MDdsLTIuNjQ2IDIuNjQ3YS41LjUgMCAwIDEtLjcwOC0uNzA4TDcuMjkzIDggNC42NDYgNS4zNTRhLjUuNSAwIDAgMSAwLS43MDh6XFxcIi8+XFxuICA8L3N2Zz5cIjtcclxuICAgIHZhciBzbGlkZXJTdWNjZXNzU3ZnID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjE2XFxcIiBoZWlnaHQ9XFxcIjE2XFxcIiBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiIGNsYXNzPVxcXCJiaSBiaS1jaGVjazJcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNiAxNlxcXCI+XFxuICAgIDxwYXRoIGQ9XFxcIk0xMy44NTQgMy42NDZhLjUuNSAwIDAgMSAwIC43MDhsLTcgN2EuNS41IDAgMCAxLS43MDggMGwtMy41LTMuNWEuNS41IDAgMSAxIC43MDgtLjcwOEw2LjUgMTAuMjkzbDYuNjQ2LTYuNjQ3YS41LjUgMCAwIDEgLjcwOCAwelxcXCIvPlxcbiAgPC9zdmc+XCI7XHJcbiAgICB2YXIgcmVmcmVzaFN2ZyA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTYgMTZcXFwiPlxcbiAgICA8cGF0aCBkPVxcXCJNMTEuNTM0IDdoMy45MzJhLjI1LjI1IDAgMCAxIC4xOTIuNDFsLTEuOTY2IDIuMzZhLjI1LjI1IDAgMCAxLS4zODQgMGwtMS45NjYtMi4zNmEuMjUuMjUgMCAwIDEgLjE5Mi0uNDF6bS0xMSAyaDMuOTMyYS4yNS4yNSAwIDAgMCAuMTkyLS40MUwyLjY5MiA2LjIzYS4yNS4yNSAwIDAgMC0uMzg0IDBMLjM0MiA4LjU5QS4yNS4yNSAwIDAgMCAuNTM0IDl6XFxcIi8+XFxuICAgIDxwYXRoIGZpbGwtcnVsZT1cXFwiZXZlbm9kZFxcXCIgZD1cXFwiTTggM2MtMS41NTIgMC0yLjk0LjcwNy0zLjg1NyAxLjgxOGEuNS41IDAgMSAxLS43NzEtLjYzNkE2LjAwMiA2LjAwMiAwIDAgMSAxMy45MTcgN0gxMi45QTUuMDAyIDUuMDAyIDAgMCAwIDggM3pNMy4xIDlhNS4wMDIgNS4wMDIgMCAwIDAgOC43NTcgMi4xODIuNS41IDAgMSAxIC43NzEuNjM2QTYuMDAyIDYuMDAyIDAgMCAxIDIuMDgzIDlIMy4xelxcXCIvPlxcbiAgPC9zdmc+XCI7XHJcbiAgICB2YXIgY2xvc2VTdmcgPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMThcXFwiIGhlaWdodD1cXFwiMThcXFwiIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIgdmlld0JveD1cXFwiMCAwIDE2IDE2XFxcIj5cXG4gICAgPHBhdGggZD1cXFwiTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6XFxcIi8+XFxuICAgIDxwYXRoIGQ9XFxcIk00LjY0NiA0LjY0NmEuNS41IDAgMCAxIC43MDggMEw4IDcuMjkzbDIuNjQ2LTIuNjQ3YS41LjUgMCAwIDEgLjcwOC43MDhMOC43MDcgOGwyLjY0NyAyLjY0NmEuNS41IDAgMCAxLS43MDguNzA4TDggOC43MDdsLTIuNjQ2IDIuNjQ3YS41LjUgMCAwIDEtLjcwOC0uNzA4TDcuMjkzIDggNC42NDYgNS4zNTRhLjUuNSAwIDAgMSAwLS43MDh6XFxcIi8+XFxuICA8L3N2Zz5cIjtcclxuICAgIHZhciBtYWtlUmVxdWVzdCA9IGZ1bmN0aW9uIChtZXRob2QsIHVybCwgb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gdm9pZCAwKSB7IG9iaiA9IHt9OyB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZihcIj9cIikgPT09IC0xID8gXCI/XCIgOiBcIiZcIikgKyAoXCJ0PVwiICsgbm93LmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcclxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpzb25SZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGpzb25SZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB2YXIgU2xpZGVyQ2FwdGNoYSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gU2xpZGVyQ2FwdGNoYShlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IFNsaWRlckNhcHRjaGEuZGVmYXVsdE9wdGlvbnM7IH1cclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gU2xpZGVyQ2FwdGNoYS5kZWZhdWx0T3B0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJTdGF0dXMgPSBTbGlkZXJTdGF0dXMuTG9hZGluZztcclxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5nZXRMYW5nUmVzb3VyY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFuZyA9IF90aGlzLm9wdGlvbnMubGFuZyB8fCBkZWZhdWx0TGFuZztcclxuICAgICAgICAgICAgICAgIHZhciBsYW5ncyA9IE9iamVjdC5rZXlzKGxhbmdSZXNvdXJjZXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhbmdzLmluZGV4T2YobGFuZykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFuZyA9IGRlZmF1bHRMYW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmdSZXNvdXJjZXNbbGFuZ107XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERPTSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtY29udGFpbmVyXCIpKTtcclxuICAgICAgICAgICAgICAgIHZhciBjYXB0Y2hhSGVhZGVyID0gX3RoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJjYXB0Y2hhLWhlYWRlclwiKSk7XHJcbiAgICAgICAgICAgICAgICBjYXB0Y2hhSGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiXCIsIF90aGlzLmxhbmdSZXNvdXJjZS50aXRsZSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhlYWRlckljb25zID0gY2FwdGNoYUhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY2FwdGNoYS1oZWFkZXItaWNvbnNcIikpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVmcmVzaEljb24gPSBoZWFkZXJJY29ucy5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaVwiLCBcImNhcHRjaGEtcmVmcmVzaC1pY29uXCIsIHJlZnJlc2hTdmcpKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlSWNvbiA9IGhlYWRlckljb25zLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJpXCIsIFwiY2FwdGNoYS1jbG9zZS1pY29uXCIsIGNsb3NlU3ZnKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FwdGNoYUJvZHkgPSBfdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtYm9keVwiKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FwdGNoYVdpZGdldCA9IGNhcHRjaGFCb2R5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJjYXB0Y2hhLXdpZGdldFwiKSk7XHJcbiAgICAgICAgICAgICAgICBjYXB0Y2hhV2lkZ2V0LnN0eWxlLndpZHRoID0gX3RoaXMub3B0aW9ucy53aWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIGNhcHRjaGFXaWRnZXQuc3R5bGUuaGVpZ2h0ID0gX3RoaXMub3B0aW9ucy5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kQ2FudmFzID0gY2FwdGNoYVdpZGdldC5hcHBlbmRDaGlsZChjcmVhdGVDYW52YXMoX3RoaXMub3B0aW9ucy53aWR0aCwgX3RoaXMub3B0aW9ucy5oZWlnaHQsIFwiY2FwdGNoYS1iYWNrZ3JvdW5kXCIpKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWNlQ2FudmFzID0gY2FwdGNoYVdpZGdldC5hcHBlbmRDaGlsZChjcmVhdGVDYW52YXMoX3RoaXMub3B0aW9ucy53aWR0aCwgX3RoaXMub3B0aW9ucy5oZWlnaHQsIFwiY2FwdGNoYS1zbGljZVwiKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9hZGluZyA9IGNhcHRjaGFXaWRnZXQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtbG9hZGluZ1wiKSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJjYXB0Y2hhLWxvYWRpbmctaWNvblwiLCBsb2FkaW5nU3ZnKSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiXCIsIF90aGlzLmxhbmdSZXNvdXJjZS5jYXB0Y2hhX2xvYWRpbmcpKTtcclxuICAgICAgICAgICAgICAgIHZhciBjYXB0Y2hhRm9vdGVyID0gX3RoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJjYXB0Y2hhLWZvb3RlclwiKSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJDb250YWluZXIgPSBjYXB0Y2hhRm9vdGVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJjYXB0Y2hhLXNsaWRlci1jb250YWluZXIgY2FwdGNoYS1zbGlkZXItcmVhZHlcIikpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyVGV4dCA9IF90aGlzLnNsaWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImNhcHRjaGEtc2xpZGVyLXRleHRcIikpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyVGV4dC5pbm5lclRleHQgPSBfdGhpcy5sYW5nUmVzb3VyY2Uuc2xpZGVyX3JlYWR5O1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyTWFzayA9IF90aGlzLnNsaWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY2FwdGNoYS1zbGlkZXItbWFza1wiKSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJCdXR0b24gPSBfdGhpcy5zbGlkZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtc2xpZGVyLWJ1dHRvblwiKSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJCdXR0b24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImlcIiwgXCJjYXB0Y2hhLXNsaWRlci1pY29uXCIsIHNsaWRlclJlYWR5U3ZnKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEltYWdlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0Qm9keSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbjogX3RoaXMudG9rZW4sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbWFrZVJlcXVlc3QoXCJQT1NUXCIsIF90aGlzLmJhc2VVcmwgKyBcIi9nZW5lcmF0ZVwiLCByZXF1ZXN0Qm9keSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGVTbGlkZXJTdGF0dXMoU2xpZGVyU3RhdHVzLlJlYWR5KTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2tlbiA9IHJlc3BvbnNlLlRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRJbWFnZShyZXNwb25zZS5CYWNrZ3JvdW5kLCBmdW5jdGlvbiAoaW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYmFja2dyb3VuZENhbnZhc0NvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkSW1hZ2UocmVzcG9uc2UuU2xpY2UsIGZ1bmN0aW9uIChpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zbGljZUNhbnZhc0NvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCByZXNwb25zZS5Qb3NpdGlvbiwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTbGlkZXJTdGF0dXMgPSBmdW5jdGlvbiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzQ2xhc3NOYW1lID0gXCJjYXB0Y2hhLXNsaWRlci1cIiArIFNsaWRlclN0YXR1c1tzdGF0dXNdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJDb250YWluZXIuY2xhc3NOYW1lID0gXCJjYXB0Y2hhLXNsaWRlci1jb250YWluZXIgXCIgKyBzdGF0dXNDbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVyU3ZnID0gc2xpZGVyUmVhZHlTdmc7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2xpZGVyU3RhdHVzLkZhaWw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlclN2ZyA9IHNsaWRlckZhaWxTdmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlclRleHQuaW5uZXJUZXh0ID0gX3RoaXMubGFuZ1Jlc291cmNlLnNsaWRlcl9mYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNsaWRlclN0YXR1cy5TdWNjZXNzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXJTdmcgPSBzbGlkZXJTdWNjZXNzU3ZnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IFNsaWRlclN0YXR1cy5Nb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyQnV0dG9uLmlubmVySFRNTCA9IHNsaWRlclN2ZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpblg7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWZyZXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zbGlkZXJTdGF0dXMgPT09IFNsaWRlclN0YXR1cy5Mb2FkaW5nIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlclN0YXR1cyA9PT0gU2xpZGVyU3RhdHVzLkxvY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbGVhbnVwKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVEcmFnU3RhcnQgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zbGlkZXJTdGF0dXMgPT09IFNsaWRlclN0YXR1cy5Mb2FkaW5nIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlclN0YXR1cyA9PT0gU2xpZGVyU3RhdHVzLkxvY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZURyYWdTdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGVTbGlkZXJTdGF0dXMoU2xpZGVyU3RhdHVzLk1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblggPSB4O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRHJhZ1N0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRHJhZ1N0YXJ0KGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVEcmFnTW92ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnNsaWRlclN0YXR1cyAhPT0gU2xpZGVyU3RhdHVzLk1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZURyYWdNb3ZlICh4OiBcIiArIHggKyBcIiwgeTogXCIgKyB5ICsgXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlWCA9IE1hdGgubWluKE1hdGgubWF4KHggLSBvcmlnaW5YLCAwKSwgX3RoaXMub3B0aW9ucy53aWR0aCAtIF90aGlzLm9wdGlvbnMuc2xpZGVyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlckJ1dHRvbi5zdHlsZS5sZWZ0ID0gbW92ZVggKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyTWFzay5zdHlsZS53aWR0aCA9IG1vdmVYICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNsaWNlQ2FudmFzLnN0eWxlLmxlZnQgPSBtb3ZlWCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChfdGhpcy5kb2N1bWVudE1vdXNlbW92ZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRHJhZ01vdmUoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCAoX3RoaXMuZG9jdW1lbnRUb3VjaG1vdmUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZURyYWdNb3ZlKGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlRHJhZ0VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2xpZGVyU3RhdHVzICE9PSBTbGlkZXJTdGF0dXMuTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlRHJhZ0VuZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGVTbGlkZXJTdGF0dXMoU2xpZGVyU3RhdHVzLkxvY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0Qm9keSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW46IF90aGlzLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbjogX3RoaXMuc2xpY2VDYW52YXMub2Zmc2V0TGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIG1ha2VSZXF1ZXN0KFwiUE9TVFwiLCBfdGhpcy5iYXNlVXJsICsgXCIvdmVyaWZ5XCIsIHJlcXVlc3RCb2R5KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVyU3RhdHVzID0gcmVzcG9uc2UuSXNTdWNjZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFNsaWRlclN0YXR1cy5TdWNjZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFNsaWRlclN0YXR1cy5GYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGVTbGlkZXJTdGF0dXMoc2xpZGVyU3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuSXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3B0aW9ucy5jYWxsYmFjay5jYWxsKF90aGlzLCByZXNwb25zZSwgX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTWlzc2luZyBjYXB0Y2hhIGNhbGxiYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChfdGhpcy5kb2N1bWVudE1vdXNldXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRHJhZ0VuZCgpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIChfdGhpcy5kb2N1bWVudFRvdWNoZW5kID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEcmFnRW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xlYXJDYW52YXNDb250ZXh0ID0gZnVuY3Rpb24gKGNhbnZhc0NvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBfdGhpcy5vcHRpb25zLndpZHRoLCBfdGhpcy5vcHRpb25zLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyQnV0dG9uLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlck1hc2suc3R5bGUud2lkdGggPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWNlQ2FudmFzLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZVNsaWRlclN0YXR1cyhTbGlkZXJTdGF0dXMuTG9hZGluZyk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckNhbnZhc0NvbnRleHQoX3RoaXMuYmFja2dyb3VuZENhbnZhc0NvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJDYW52YXNDb250ZXh0KF90aGlzLnNsaWNlQ2FudmFzQ29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2FkSW1hZ2VzKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgX3RoaXMuZG9jdW1lbnRNb3VzZW1vdmUpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBfdGhpcy5kb2N1bWVudFRvdWNobW92ZSk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBfdGhpcy5kb2N1bWVudE1vdXNldXApO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIF90aGlzLmRvY3VtZW50VG91Y2hlbmQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgU2xpZGVyQ2FwdGNoYS5kZWZhdWx0T3B0aW9ucyksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLmxhbmdSZXNvdXJjZSA9IHRoaXMuZ2V0TGFuZ1Jlc291cmNlKCk7XHJcbiAgICAgICAgICAgIGlmICghbG9jYXRpb24ub3JpZ2luXHJcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0c1dpdGgodGhpcy5vcHRpb25zLmJhc2VVcmkudG9Mb3dlckNhc2UoKSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZVVybCA9IG5ldyBVUkwodGhpcy5vcHRpb25zLmJhc2VVcmksIGxvY2F0aW9uLm9yaWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iYXNlVXJsID0gbmV3IFVSTChcInNsaWRlcmNhcHRjaGFcIiwgdGhpcy5iYXNlVXJsKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RE9NKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbGlkZXJDYXB0Y2hhLnByb3RvdHlwZSwgXCJiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dFwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xpZGVyQ2FwdGNoYS5wcm90b3R5cGUsIFwic2xpY2VDYW52YXNDb250ZXh0XCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zbGljZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBTbGlkZXJDYXB0Y2hhLmRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBsYW5nOiBnZXREZWZhdWx0TGFuZygpLFxyXG4gICAgICAgICAgICBiYXNlVXJpOiBkb2N1bWVudC5iYXNlVVJJLFxyXG4gICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDE2MCxcclxuICAgICAgICAgICAgc2xpZGVyV2lkdGg6IDQwLFxyXG4gICAgICAgICAgICBzbGlkZXJIZWlnaHQ6IDQwLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKF8sIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jbGVhbnVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudC52YWx1ZSA9IGluc3RhbmNlLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFNsaWRlckNhcHRjaGE7XHJcbiAgICB9KCkpO1xyXG4gICAgdmFyIFBsdWdpbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyICRlbGVtZW50O1xyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IFwiUmVxdWlyZSBhIHZhbGlkIEhUTUwgZWxlbWVudFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFNsaWRlckNhcHRjaGEoJGVsZW1lbnQsIG9wdGlvbnMpO1xyXG4gICAgfTtcclxuICAgIHdpbmRvdy5zbGlkZXJDYXB0Y2hhID0gUGx1Z2luO1xyXG4gICAgd2luZG93LnNsaWRlckNhcHRjaGEuVkVSU0lPTiA9IFwiMS4wXCI7XHJcbiAgICB3aW5kb3cuc2xpZGVyQ2FwdGNoYS5Db25zdHJ1Y3RvciA9IFNsaWRlckNhcHRjaGE7XHJcbn0pKCk7XHJcbiIsIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9pbmRleC50c1wiXSgwLCB7fSwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL2luZGV4LnNjc3NcIl0oMCwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4iXSwic291cmNlUm9vdCI6IiJ9