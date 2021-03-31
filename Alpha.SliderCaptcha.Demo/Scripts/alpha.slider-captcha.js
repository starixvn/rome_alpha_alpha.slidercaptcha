/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
        en: {
            title: "Captcha Validation",
            slider_ready: "Slide to complete the puzzle",
            slider_fail: "Please try again",
            captcha_loading: "Loading",
            refresh_title: "Refresh",
            close_title: "Close",
        },
        vi: {
            title: "Xác thực người dùng",
            slider_ready: "Trượt để hoàn thành câu đố",
            slider_fail: "Xin vui lòng thử lại",
            captcha_loading: "Đang tải câu đố",
            refresh_title: "Làm mới",
            close_title: "Đóng",
        },
    };
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
        if (lang) {
            lang = lang.substr(0, 2);
            var langs = Object.keys(langResources);
            if (langs.indexOf(lang) !== -1) {
                return lang;
            }
        }
        return "en";
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
            this.initDOM = function () {
                _this.container = document.body.appendChild(createElement("div", "captcha-container"));
                var captchaHeader = _this.container.appendChild(createElement("div", "captcha-header"));
                captchaHeader.appendChild(createElement("span", "", _this.langResource.title));
                var headerIcons = captchaHeader.appendChild(createElement("div", "captcha-header-icons"));
                _this.refreshIcon = headerIcons.appendChild(createElement("i", "captcha-refresh-icon", refreshSvg));
                _this.refreshIcon.title = _this.langResource.refresh_title;
                _this.closeIcon = headerIcons.appendChild(createElement("i", "captcha-close-icon", closeSvg));
                _this.closeIcon.title = _this.langResource.close_title;
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
                _this.sliderButton.innerHTML = sliderSvg;
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
                    return handleDragStart(e.clientX, e.clientY);
                });
                _this.sliderButton.addEventListener("touchstart", function (e) {
                    return handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
                });
                var handleDragMove = function (x, y) {
                    if (_this.sliderStatus !== SliderStatus.Move) {
                        return;
                    }
                    console.log("handleDragMove");
                    var moveX = Math.min(Math.max(x - originX, 0), _this.options.width - _this.options.sliderWidth);
                    _this.sliderButton.style.left = moveX + "px";
                    _this.sliderMask.style.width = moveX + "px";
                    _this.sliceCanvas.style.left = moveX + "px";
                };
                document.addEventListener("mousemove", (_this.documentMousemove = function (e) { return handleDragMove(e.clientX, e.clientY); }));
                document.addEventListener("touchmove", (_this.documentTouchmove = function (e) {
                    return handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
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
                document.addEventListener("mouseup", (_this.documentMouseup = function () { return handleDragEnd(); }));
                document.addEventListener("touchend", (_this.documentTouchend = function () { return handleDragEnd(); }));
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
            this.langResource = langResources[this.options.lang];
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
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbHBoYS5zbGlkZXItY2FwdGNoYS5hc3NldHMvLi9zcmMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9hbHBoYS5zbGlkZXItY2FwdGNoYS5hc3NldHMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYWxwaGEuc2xpZGVyLWNhcHRjaGEuYXNzZXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FscGhhLnNsaWRlci1jYXB0Y2hhLmFzc2V0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FscGhhLnNsaWRlci1jYXB0Y2hhLmFzc2V0cy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssb0NBQW9DO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywwQkFBMEI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsNkJBQTZCLDRCQUE0QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1D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V0FDN0QsRTs7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSwyQ0FBMkM7VUFDM0M7VUFDQSIsImZpbGUiOiJTY3JpcHRzL2FscGhhLnNsaWRlci1jYXB0Y2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIFNsaWRlclN0YXR1cztcclxuICAgIChmdW5jdGlvbiAoU2xpZGVyU3RhdHVzKSB7XHJcbiAgICAgICAgU2xpZGVyU3RhdHVzW1NsaWRlclN0YXR1c1tcIkxvYWRpbmdcIl0gPSAwXSA9IFwiTG9hZGluZ1wiO1xyXG4gICAgICAgIFNsaWRlclN0YXR1c1tTbGlkZXJTdGF0dXNbXCJSZWFkeVwiXSA9IDFdID0gXCJSZWFkeVwiO1xyXG4gICAgICAgIFNsaWRlclN0YXR1c1tTbGlkZXJTdGF0dXNbXCJNb3ZlXCJdID0gMl0gPSBcIk1vdmVcIjtcclxuICAgICAgICBTbGlkZXJTdGF0dXNbU2xpZGVyU3RhdHVzW1wiTG9ja1wiXSA9IDNdID0gXCJMb2NrXCI7XHJcbiAgICAgICAgU2xpZGVyU3RhdHVzW1NsaWRlclN0YXR1c1tcIkZhaWxcIl0gPSA0XSA9IFwiRmFpbFwiO1xyXG4gICAgICAgIFNsaWRlclN0YXR1c1tTbGlkZXJTdGF0dXNbXCJTdWNjZXNzXCJdID0gNV0gPSBcIlN1Y2Nlc3NcIjtcclxuICAgIH0pKFNsaWRlclN0YXR1cyB8fCAoU2xpZGVyU3RhdHVzID0ge30pKTtcclxuICAgIHZhciBsYW5nUmVzb3VyY2VzID0ge1xyXG4gICAgICAgIGVuOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkNhcHRjaGEgVmFsaWRhdGlvblwiLFxyXG4gICAgICAgICAgICBzbGlkZXJfcmVhZHk6IFwiU2xpZGUgdG8gY29tcGxldGUgdGhlIHB1enpsZVwiLFxyXG4gICAgICAgICAgICBzbGlkZXJfZmFpbDogXCJQbGVhc2UgdHJ5IGFnYWluXCIsXHJcbiAgICAgICAgICAgIGNhcHRjaGFfbG9hZGluZzogXCJMb2FkaW5nXCIsXHJcbiAgICAgICAgICAgIHJlZnJlc2hfdGl0bGU6IFwiUmVmcmVzaFwiLFxyXG4gICAgICAgICAgICBjbG9zZV90aXRsZTogXCJDbG9zZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmk6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiWMOhYyB0aOG7sWMgbmfGsOG7nWkgZMO5bmdcIixcclxuICAgICAgICAgICAgc2xpZGVyX3JlYWR5OiBcIlRyxrDhu6N0IMSR4buDIGhvw6BuIHRow6BuaCBjw6J1IMSR4buRXCIsXHJcbiAgICAgICAgICAgIHNsaWRlcl9mYWlsOiBcIlhpbiB2dWkgbMOybmcgdGjhu60gbOG6oWlcIixcclxuICAgICAgICAgICAgY2FwdGNoYV9sb2FkaW5nOiBcIsSQYW5nIHThuqNpIGPDonUgxJHhu5FcIixcclxuICAgICAgICAgICAgcmVmcmVzaF90aXRsZTogXCJMw6BtIG3hu5tpXCIsXHJcbiAgICAgICAgICAgIGNsb3NlX3RpdGxlOiBcIsSQw7NuZ1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCBcImFzc2lnblwiLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTb3VyY2UgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdmFyIGdldFBhcmFtZXRlckJ5TmFtZSA9IGZ1bmN0aW9uIChuYW1lLCB1cmwpIHtcclxuICAgICAgICBpZiAodXJsID09PSB2b2lkIDApIHsgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7IH1cclxuICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcclxuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIiksIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcbiAgICAgICAgaWYgKCFyZXN1bHRzKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAoIXJlc3VsdHNbMl0pXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICAgIH07XHJcbiAgICB2YXIgZ2V0RGVmYXVsdExhbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxhbmcgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJsYW5nXCIpO1xyXG4gICAgICAgIGlmICghbGFuZykge1xyXG4gICAgICAgICAgICBsYW5nID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwibGFuZ3VhZ2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsYW5nKSB7XHJcbiAgICAgICAgICAgIGxhbmcgPSBsYW5nLnN1YnN0cigwLCAyKTtcclxuICAgICAgICAgICAgdmFyIGxhbmdzID0gT2JqZWN0LmtleXMobGFuZ1Jlc291cmNlcyk7XHJcbiAgICAgICAgICAgIGlmIChsYW5ncy5pbmRleE9mKGxhbmcpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiZW5cIjtcclxuICAgIH07XHJcbiAgICB2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0YWdOYW1lLCBjbGFzc05hbWUsIGlubmVySHRtbCkge1xyXG4gICAgICAgIGlmIChjbGFzc05hbWUgPT09IHZvaWQgMCkgeyBjbGFzc05hbWUgPSBcIlwiOyB9XHJcbiAgICAgICAgaWYgKGlubmVySHRtbCA9PT0gdm9pZCAwKSB7IGlubmVySHRtbCA9IFwiXCI7IH1cclxuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlubmVySHRtbCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGlubmVySHRtbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgdmFyIGNyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBjbGFzc05hbWUpIHtcclxuICAgICAgICBpZiAoY2xhc3NOYW1lID09PSB2b2lkIDApIHsgY2xhc3NOYW1lID0gXCJcIjsgfVxyXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjYW52YXMuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FudmFzO1xyXG4gICAgfTtcclxuICAgIHZhciBsb2FkSW1hZ2UgPSBmdW5jdGlvbiAoc3JjLCBvbmxvYWRDYWxsYmFjaywgb25lcnJvckNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKG9uZXJyb3JDYWxsYmFjayA9PT0gdm9pZCAwKSB7IG9uZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB0byBsb2FkIGltYWdlXCIsIGUpO1xyXG4gICAgICAgIH07IH1cclxuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9ubG9hZENhbGxiYWNrKGltYWdlKTtcclxuICAgICAgICAgICAgaW1hZ2UucmVtb3ZlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgb25lcnJvckNhbGxiYWNrKGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xyXG4gICAgfTtcclxuICAgIHZhciBsb2FkaW5nU3ZnID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjI4XFxcIiBoZWlnaHQ9XFxcIjI4XFxcIiBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNiAxNlxcXCI+XFxuICAgIDxwYXRoIGQ9XFxcIk02LjAwMiA1LjVhMS41IDEuNSAwIDEgMS0zIDAgMS41IDEuNSAwIDAgMSAzIDB6XFxcIi8+XFxuICAgIDxwYXRoIGQ9XFxcIk0xLjUgMkExLjUgMS41IDAgMCAwIDAgMy41djlBMS41IDEuNSAwIDAgMCAxLjUgMTRoMTNhMS41IDEuNSAwIDAgMCAxLjUtMS41di05QTEuNSAxLjUgMCAwIDAgMTQuNSAyaC0xM3ptMTMgMWEuNS41IDAgMCAxIC41LjV2NmwtMy43NzUtMS45NDdhLjUuNSAwIDAgMC0uNTc3LjA5M2wtMy43MSAzLjcxLTIuNjYtMS43NzJhLjUuNSAwIDAgMC0uNjMuMDYyTDEuMDAyIDEydi41NEEuNTA1LjUwNSAwIDAgMSAxIDEyLjV2LTlhLjUuNSAwIDAgMSAuNS0uNWgxM3pcXFwiLz5cXG4gIDwvc3ZnPlwiO1xyXG4gICAgdmFyIHNsaWRlclJlYWR5U3ZnID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjI4XFxcIiBoZWlnaHQ9XFxcIjI4XFxcIiBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNiAxNlxcXCI+XFxuICAgIDxwYXRoIGZpbGwtcnVsZT1cXFwiZXZlbm9kZFxcXCIgZD1cXFwiTTQgOGEuNS41IDAgMCAxIC41LS41aDUuNzkzTDguMTQ2IDUuMzU0YS41LjUgMCAxIDEgLjcwOC0uNzA4bDMgM2EuNS41IDAgMCAxIDAgLjcwOGwtMyAzYS41LjUgMCAwIDEtLjcwOC0uNzA4TDEwLjI5MyA4LjVINC41QS41LjUgMCAwIDEgNCA4elxcXCIvPlxcbiAgPC9zdmc+XCI7XHJcbiAgICB2YXIgc2xpZGVyRmFpbFN2ZyA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyOFxcXCIgaGVpZ2h0PVxcXCIyOFxcXCIgZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIiBjbGFzcz1cXFwiYmkgYmkteFxcXCIgdmlld0JveD1cXFwiMCAwIDE2IDE2XFxcIj5cXG4gICAgPHBhdGggZD1cXFwiTTQuNjQ2IDQuNjQ2YS41LjUgMCAwIDEgLjcwOCAwTDggNy4yOTNsMi42NDYtMi42NDdhLjUuNSAwIDAgMSAuNzA4LjcwOEw4LjcwNyA4bDIuNjQ3IDIuNjQ2YS41LjUgMCAwIDEtLjcwOC43MDhMOCA4LjcwN2wtMi42NDYgMi42NDdhLjUuNSAwIDAgMS0uNzA4LS43MDhMNy4yOTMgOCA0LjY0NiA1LjM1NGEuNS41IDAgMCAxIDAtLjcwOHpcXFwiLz5cXG4gIDwvc3ZnPlwiO1xyXG4gICAgdmFyIHNsaWRlclN1Y2Nlc3NTdmcgPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMTZcXFwiIGhlaWdodD1cXFwiMTZcXFwiIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIgY2xhc3M9XFxcImJpIGJpLWNoZWNrMlxcXCIgdmlld0JveD1cXFwiMCAwIDE2IDE2XFxcIj5cXG4gICAgPHBhdGggZD1cXFwiTTEzLjg1NCAzLjY0NmEuNS41IDAgMCAxIDAgLjcwOGwtNyA3YS41LjUgMCAwIDEtLjcwOCAwbC0zLjUtMy41YS41LjUgMCAxIDEgLjcwOC0uNzA4TDYuNSAxMC4yOTNsNi42NDYtNi42NDdhLjUuNSAwIDAgMSAuNzA4IDB6XFxcIi8+XFxuICA8L3N2Zz5cIjtcclxuICAgIHZhciByZWZyZXNoU3ZnID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjE4XFxcIiBoZWlnaHQ9XFxcIjE4XFxcIiBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNiAxNlxcXCI+XFxuICAgIDxwYXRoIGQ9XFxcIk0xMS41MzQgN2gzLjkzMmEuMjUuMjUgMCAwIDEgLjE5Mi40MWwtMS45NjYgMi4zNmEuMjUuMjUgMCAwIDEtLjM4NCAwbC0xLjk2Ni0yLjM2YS4yNS4yNSAwIDAgMSAuMTkyLS40MXptLTExIDJoMy45MzJhLjI1LjI1IDAgMCAwIC4xOTItLjQxTDIuNjkyIDYuMjNhLjI1LjI1IDAgMCAwLS4zODQgMEwuMzQyIDguNTlBLjI1LjI1IDAgMCAwIC41MzQgOXpcXFwiLz5cXG4gICAgPHBhdGggZmlsbC1ydWxlPVxcXCJldmVub2RkXFxcIiBkPVxcXCJNOCAzYy0xLjU1MiAwLTIuOTQuNzA3LTMuODU3IDEuODE4YS41LjUgMCAxIDEtLjc3MS0uNjM2QTYuMDAyIDYuMDAyIDAgMCAxIDEzLjkxNyA3SDEyLjlBNS4wMDIgNS4wMDIgMCAwIDAgOCAzek0zLjEgOWE1LjAwMiA1LjAwMiAwIDAgMCA4Ljc1NyAyLjE4Mi41LjUgMCAxIDEgLjc3MS42MzZBNi4wMDIgNi4wMDIgMCAwIDEgMi4wODMgOUgzLjF6XFxcIi8+XFxuICA8L3N2Zz5cIjtcclxuICAgIHZhciBjbG9zZVN2ZyA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTYgMTZcXFwiPlxcbiAgICA8cGF0aCBkPVxcXCJNOCAxNUE3IDcgMCAxIDEgOCAxYTcgNyAwIDAgMSAwIDE0em0wIDFBOCA4IDAgMSAwIDggMGE4IDggMCAwIDAgMCAxNnpcXFwiLz5cXG4gICAgPHBhdGggZD1cXFwiTTQuNjQ2IDQuNjQ2YS41LjUgMCAwIDEgLjcwOCAwTDggNy4yOTNsMi42NDYtMi42NDdhLjUuNSAwIDAgMSAuNzA4LjcwOEw4LjcwNyA4bDIuNjQ3IDIuNjQ2YS41LjUgMCAwIDEtLjcwOC43MDhMOCA4LjcwN2wtMi42NDYgMi42NDdhLjUuNSAwIDAgMS0uNzA4LS43MDhMNy4yOTMgOCA0LjY0NiA1LjM1NGEuNS41IDAgMCAxIDAtLjcwOHpcXFwiLz5cXG4gIDwvc3ZnPlwiO1xyXG4gICAgdmFyIG1ha2VSZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBvYmopIHtcclxuICAgICAgICBpZiAob2JqID09PSB2b2lkIDApIHsgb2JqID0ge307IH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKFwiP1wiKSA9PT0gLTEgPyBcIj9cIiA6IFwiJlwiKSArIChcInQ9XCIgKyBub3cuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoanNvblJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHZhciBTbGlkZXJDYXB0Y2hhID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBTbGlkZXJDYXB0Y2hhKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gU2xpZGVyQ2FwdGNoYS5kZWZhdWx0T3B0aW9uczsgfVxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBTbGlkZXJDYXB0Y2hhLmRlZmF1bHRPcHRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlclN0YXR1cyA9IFNsaWRlclN0YXR1cy5Mb2FkaW5nO1xyXG4gICAgICAgICAgICB0aGlzLnRva2VuID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRET00gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJjYXB0Y2hhLWNvbnRhaW5lclwiKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FwdGNoYUhlYWRlciA9IF90aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY2FwdGNoYS1oZWFkZXJcIikpO1xyXG4gICAgICAgICAgICAgICAgY2FwdGNoYUhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcIlwiLCBfdGhpcy5sYW5nUmVzb3VyY2UudGl0bGUpKTtcclxuICAgICAgICAgICAgICAgIHZhciBoZWFkZXJJY29ucyA9IGNhcHRjaGFIZWFkZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtaGVhZGVyLWljb25zXCIpKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlZnJlc2hJY29uID0gaGVhZGVySWNvbnMuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImlcIiwgXCJjYXB0Y2hhLXJlZnJlc2gtaWNvblwiLCByZWZyZXNoU3ZnKSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWZyZXNoSWNvbi50aXRsZSA9IF90aGlzLmxhbmdSZXNvdXJjZS5yZWZyZXNoX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VJY29uID0gaGVhZGVySWNvbnMuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImlcIiwgXCJjYXB0Y2hhLWNsb3NlLWljb25cIiwgY2xvc2VTdmcpKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlSWNvbi50aXRsZSA9IF90aGlzLmxhbmdSZXNvdXJjZS5jbG9zZV90aXRsZTtcclxuICAgICAgICAgICAgICAgIHZhciBjYXB0Y2hhQm9keSA9IF90aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY2FwdGNoYS1ib2R5XCIpKTtcclxuICAgICAgICAgICAgICAgIHZhciBjYXB0Y2hhV2lkZ2V0ID0gY2FwdGNoYUJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtd2lkZ2V0XCIpKTtcclxuICAgICAgICAgICAgICAgIGNhcHRjaGFXaWRnZXQuc3R5bGUud2lkdGggPSBfdGhpcy5vcHRpb25zLndpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgY2FwdGNoYVdpZGdldC5zdHlsZS5oZWlnaHQgPSBfdGhpcy5vcHRpb25zLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIF90aGlzLmJhY2tncm91bmRDYW52YXMgPSBjYXB0Y2hhV2lkZ2V0LmFwcGVuZENoaWxkKGNyZWF0ZUNhbnZhcyhfdGhpcy5vcHRpb25zLndpZHRoLCBfdGhpcy5vcHRpb25zLmhlaWdodCwgXCJjYXB0Y2hhLWJhY2tncm91bmRcIikpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpY2VDYW52YXMgPSBjYXB0Y2hhV2lkZ2V0LmFwcGVuZENoaWxkKGNyZWF0ZUNhbnZhcyhfdGhpcy5vcHRpb25zLndpZHRoLCBfdGhpcy5vcHRpb25zLmhlaWdodCwgXCJjYXB0Y2hhLXNsaWNlXCIpKTtcclxuICAgICAgICAgICAgICAgIHZhciBsb2FkaW5nID0gY2FwdGNoYVdpZGdldC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY2FwdGNoYS1sb2FkaW5nXCIpKTtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmcuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtbG9hZGluZy1pY29uXCIsIGxvYWRpbmdTdmcpKTtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmcuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJcIiwgX3RoaXMubGFuZ1Jlc291cmNlLmNhcHRjaGFfbG9hZGluZykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhcHRjaGFGb290ZXIgPSBfdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtZm9vdGVyXCIpKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlckNvbnRhaW5lciA9IGNhcHRjaGFGb290ZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNhcHRjaGEtc2xpZGVyLWNvbnRhaW5lciBjYXB0Y2hhLXNsaWRlci1yZWFkeVwiKSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJUZXh0ID0gX3RoaXMuc2xpZGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiY2FwdGNoYS1zbGlkZXItdGV4dFwiKSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJUZXh0LmlubmVyVGV4dCA9IF90aGlzLmxhbmdSZXNvdXJjZS5zbGlkZXJfcmVhZHk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJNYXNrID0gX3RoaXMuc2xpZGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJjYXB0Y2hhLXNsaWRlci1tYXNrXCIpKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlckJ1dHRvbiA9IF90aGlzLnNsaWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY2FwdGNoYS1zbGlkZXItYnV0dG9uXCIpKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlckJ1dHRvbi5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaVwiLCBcImNhcHRjaGEtc2xpZGVyLWljb25cIiwgc2xpZGVyUmVhZHlTdmcpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlcXVlc3RCb2R5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFRva2VuOiBfdGhpcy50b2tlbixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBtYWtlUmVxdWVzdChcIlBPU1RcIiwgX3RoaXMuYmFzZVVybCArIFwiL2dlbmVyYXRlXCIsIHJlcXVlc3RCb2R5KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZVNsaWRlclN0YXR1cyhTbGlkZXJTdGF0dXMuUmVhZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRva2VuID0gcmVzcG9uc2UuVG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEltYWdlKHJlc3BvbnNlLkJhY2tncm91bmQsIGZ1bmN0aW9uIChpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kQ2FudmFzQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRJbWFnZShyZXNwb25zZS5TbGljZSwgZnVuY3Rpb24gKGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNsaWNlQ2FudmFzQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIHJlc3BvbnNlLlBvc2l0aW9uLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVNsaWRlclN0YXR1cyA9IGZ1bmN0aW9uIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlclN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0dXNDbGFzc05hbWUgPSBcImNhcHRjaGEtc2xpZGVyLVwiICsgU2xpZGVyU3RhdHVzW3N0YXR1c10udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlckNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNhcHRjaGEtc2xpZGVyLWNvbnRhaW5lciBcIiArIHN0YXR1c0NsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZXJTdmcgPSBzbGlkZXJSZWFkeVN2ZztcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTbGlkZXJTdGF0dXMuRmFpbDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyU3ZnID0gc2xpZGVyRmFpbFN2ZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyVGV4dC5pbm5lclRleHQgPSBfdGhpcy5sYW5nUmVzb3VyY2Uuc2xpZGVyX2ZhaWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2xpZGVyU3RhdHVzLlN1Y2Nlc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlclN2ZyA9IHNsaWRlclN1Y2Nlc3NTdmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyQnV0dG9uLmlubmVySFRNTCA9IHNsaWRlclN2ZztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpblg7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWZyZXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zbGlkZXJTdGF0dXMgPT09IFNsaWRlclN0YXR1cy5Mb2FkaW5nIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlclN0YXR1cyA9PT0gU2xpZGVyU3RhdHVzLkxvY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbGVhbnVwKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVEcmFnU3RhcnQgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zbGlkZXJTdGF0dXMgPT09IFNsaWRlclN0YXR1cy5Mb2FkaW5nIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlclN0YXR1cyA9PT0gU2xpZGVyU3RhdHVzLkxvY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZURyYWdTdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGVTbGlkZXJTdGF0dXMoU2xpZGVyU3RhdHVzLk1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblggPSB4O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZURyYWdTdGFydChlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVEcmFnU3RhcnQoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZURyYWdNb3ZlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2xpZGVyU3RhdHVzICE9PSBTbGlkZXJTdGF0dXMuTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlRHJhZ01vdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVYID0gTWF0aC5taW4oTWF0aC5tYXgoeCAtIG9yaWdpblgsIDApLCBfdGhpcy5vcHRpb25zLndpZHRoIC0gX3RoaXMub3B0aW9ucy5zbGlkZXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyQnV0dG9uLnN0eWxlLmxlZnQgPSBtb3ZlWCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJNYXNrLnN0eWxlLndpZHRoID0gbW92ZVggKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2xpY2VDYW52YXMuc3R5bGUubGVmdCA9IG1vdmVYICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKF90aGlzLmRvY3VtZW50TW91c2Vtb3ZlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGhhbmRsZURyYWdNb3ZlKGUuY2xpZW50WCwgZS5jbGllbnRZKTsgfSkpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCAoX3RoaXMuZG9jdW1lbnRUb3VjaG1vdmUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVEcmFnTW92ZShlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZURyYWdFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnNsaWRlclN0YXR1cyAhPT0gU2xpZGVyU3RhdHVzLk1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZURyYWdFbmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlU2xpZGVyU3RhdHVzKFNsaWRlclN0YXR1cy5Mb2NrKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdEJvZHkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuOiBfdGhpcy50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgUG9zaXRpb246IF90aGlzLnNsaWNlQ2FudmFzLm9mZnNldExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBtYWtlUmVxdWVzdChcIlBPU1RcIiwgX3RoaXMuYmFzZVVybCArIFwiL3ZlcmlmeVwiLCByZXF1ZXN0Qm9keSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlclN0YXR1cyA9IHJlc3BvbnNlLklzU3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBTbGlkZXJTdGF0dXMuU3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBTbGlkZXJTdGF0dXMuRmFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlU2xpZGVyU3RhdHVzKHNsaWRlclN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLklzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9wdGlvbnMuY2FsbGJhY2suY2FsbChfdGhpcywgcmVzcG9uc2UsIF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk1pc3NpbmcgY2FwdGNoYSBjYWxsYmFja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoX3RoaXMuZG9jdW1lbnRNb3VzZXVwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaGFuZGxlRHJhZ0VuZCgpOyB9KSk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgKF90aGlzLmRvY3VtZW50VG91Y2hlbmQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBoYW5kbGVEcmFnRW5kKCk7IH0pKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGVhckNhbnZhc0NvbnRleHQgPSBmdW5jdGlvbiAoY2FudmFzQ29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIF90aGlzLm9wdGlvbnMud2lkdGgsIF90aGlzLm9wdGlvbnMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZXJCdXR0b24uc3R5bGUubGVmdCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVyTWFzay5zdHlsZS53aWR0aCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpY2VDYW52YXMuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlU2xpZGVyU3RhdHVzKFNsaWRlclN0YXR1cy5Mb2FkaW5nKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyQ2FudmFzQ29udGV4dChfdGhpcy5iYWNrZ3JvdW5kQ2FudmFzQ29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckNhbnZhc0NvbnRleHQoX3RoaXMuc2xpY2VDYW52YXNDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvYWRJbWFnZXMoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBfdGhpcy5kb2N1bWVudE1vdXNlbW92ZSk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIF90aGlzLmRvY3VtZW50VG91Y2htb3ZlKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIF90aGlzLmRvY3VtZW50TW91c2V1cCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgX3RoaXMuZG9jdW1lbnRUb3VjaGVuZCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBTbGlkZXJDYXB0Y2hhLmRlZmF1bHRPcHRpb25zKSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMubGFuZ1Jlc291cmNlID0gbGFuZ1Jlc291cmNlc1t0aGlzLm9wdGlvbnMubGFuZ107XHJcbiAgICAgICAgICAgIGlmICghbG9jYXRpb24ub3JpZ2luXHJcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0c1dpdGgodGhpcy5vcHRpb25zLmJhc2VVcmkudG9Mb3dlckNhc2UoKSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZVVybCA9IG5ldyBVUkwodGhpcy5vcHRpb25zLmJhc2VVcmksIGxvY2F0aW9uLm9yaWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iYXNlVXJsID0gbmV3IFVSTChcInNsaWRlcmNhcHRjaGFcIiwgdGhpcy5iYXNlVXJsKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RE9NKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbGlkZXJDYXB0Y2hhLnByb3RvdHlwZSwgXCJiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dFwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xpZGVyQ2FwdGNoYS5wcm90b3R5cGUsIFwic2xpY2VDYW52YXNDb250ZXh0XCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zbGljZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBTbGlkZXJDYXB0Y2hhLmRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBsYW5nOiBnZXREZWZhdWx0TGFuZygpLFxyXG4gICAgICAgICAgICBiYXNlVXJpOiBkb2N1bWVudC5iYXNlVVJJLFxyXG4gICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDE2MCxcclxuICAgICAgICAgICAgc2xpZGVyV2lkdGg6IDQwLFxyXG4gICAgICAgICAgICBzbGlkZXJIZWlnaHQ6IDQwLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKF8sIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jbGVhbnVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudC52YWx1ZSA9IGluc3RhbmNlLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFNsaWRlckNhcHRjaGE7XHJcbiAgICB9KCkpO1xyXG4gICAgdmFyIFBsdWdpbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyICRlbGVtZW50O1xyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IFwiUmVxdWlyZSBhIHZhbGlkIEhUTUwgZWxlbWVudFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFNsaWRlckNhcHRjaGEoJGVsZW1lbnQsIG9wdGlvbnMpO1xyXG4gICAgfTtcclxuICAgIHdpbmRvdy5zbGlkZXJDYXB0Y2hhID0gUGx1Z2luO1xyXG4gICAgd2luZG93LnNsaWRlckNhcHRjaGEuVkVSU0lPTiA9IFwiMS4wXCI7XHJcbiAgICB3aW5kb3cuc2xpZGVyQ2FwdGNoYS5Db25zdHJ1Y3RvciA9IFNsaWRlckNhcHRjaGE7XHJcbn0pKCk7XHJcbiIsIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvaW5kZXgudHNcIl0oMCwge30sIF9fd2VicGFja19yZXF1aXJlX18pO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9pbmRleC5zY3NzXCJdKDAsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==