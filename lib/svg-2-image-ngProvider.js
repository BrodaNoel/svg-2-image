(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("svg-2-image", [], factory);
	else if(typeof exports === 'object')
		exports["svg-2-image"] = factory();
	else
		root["svg-2-image"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1);

function svg2Image(params) {
  function appendCSS(cssText, element) {
    var refNode = element.hasChildNodes() ? element.children[0] : null;
    var styleElement = document.createElement('style');

    styleElement.setAttribute('type', 'text/css');
    styleElement.innerHTML = cssText;
    element.insertBefore(styleElement, refNode);
  }

  function getCSSStyles(parentElement) {
    // Extract CSS Rules
    var extractedCSSText = '';

    for (var i = 0; i < document.styleSheets.length; i++) {
      var file = document.styleSheets[i];

      if (!file.cssRules) {
        continue;
      }

      var rules = file.cssRules;

      for (var r = 0; r < rules.length; r++) {
        extractedCSSText += rules[r].cssText;
      }
    }

    return extractedCSSText;
  }

  function getSVGString(svgNode) {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    var cssStyleText = getCSSStyles(svgNode);

    appendCSS(cssStyleText, svgNode);

    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);

    // Fix root xlink without namespace
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink=');
    // Safari NS namespace fix
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href');

    return svgString;
  }

  function svgString2Image(svgString, width, height, callback) {
    // Convert SVG string to data URL
    var base64 = btoa(unescape(encodeURIComponent(svgString)));
    var imgsrc = 'data:image/svg+xml;base64,' + base64;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    var image = new Image();

    image.onload = function () {
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      canvas.toBlob(function (blob) {
        callback({
          blob: blob,
          base64: base64,
          base64ForSrc: imgsrc
        });
      });
    };

    image.src = imgsrc;
  }

  // The code (?)
  var svgSize = params.svg.getBoundingClientRect();

  if (params.tryToFix) {
    params.svg.setAttribute('width', svgSize.width + 'px');
    params.svg.setAttribute('height', svgSize.height + 'px');
    params.svg.setAttribute('style', '');
  }

  var svgString = getSVGString(params.svg);

  // passes Blob to the callback
  svgString2Image(svgString, svgSize.width, svgSize.height, params.callback);
} // Import this to pollyfil the `canvas.toBlob` function
;

exports.default = svg2Image;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!function(t){"use strict";var e=t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype,o=t.Blob&&function(){try{return Boolean(new Blob)}catch(t){return!1}}(),n=o&&t.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(t){return!1}}(),r=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||t.MSBlobBuilder,a=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,i=(o||r)&&t.atob&&t.ArrayBuffer&&t.Uint8Array&&function(t){var e,i,l,u,b,c,d,B,f;if(e=t.match(a),!e)throw new Error("invalid data URI");for(i=e[2]?e[1]:"text/plain"+(e[3]||";charset=US-ASCII"),l=!!e[4],u=t.slice(e[0].length),b=l?atob(u):decodeURIComponent(u),c=new ArrayBuffer(b.length),d=new Uint8Array(c),B=0;B<b.length;B+=1)d[B]=b.charCodeAt(B);return o?new Blob([n?d:c],{type:i}):(f=new r,f.append(c),f.getBlob(i))};t.HTMLCanvasElement&&!e.toBlob&&(e.mozGetAsFile?e.toBlob=function(t,o,n){t(n&&e.toDataURL&&i?i(this.toDataURL(o,n)):this.mozGetAsFile("blob",o))}:e.toDataURL&&i&&(e.toBlob=function(t,e,o){t(i(this.toDataURL(e,o)))})), true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return i}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&module.exports?module.exports=i:t.dataURLtoBlob=i}(window);
//# sourceMappingURL=canvas-to-blob.min.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (svg2Image) {
  angular.module('ngSvg2Image', []).provider('svg2Image', function () {
    this.$get = function () {
      return svg2Image;
    };

    this.init = function () {};
  });
})(_index2.default);

/***/ })
/******/ ]);
});
//# sourceMappingURL=svg-2-image-ngProvider.js.map