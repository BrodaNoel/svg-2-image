// Import this to pollyfil the `canvas.toBlob` function
import 'blueimp-canvas-to-blob/js/canvas-to-blob.min.js';

function svg2Image(params) {
  function appendCSS(cssText, element) {
    const refNode = element.hasChildNodes() ? element.children[0] : null;
    let styleElement = document.createElement('style');

    styleElement.setAttribute('type', 'text/css');
    styleElement.innerHTML = cssText;
    element.insertBefore(styleElement, refNode);
  }

  function getCSSStyles(parentElement) {
    // Extract CSS Rules
    var extractedCSSText = '';

    for (let i = 0; i < document.styleSheets.length; i++) {
      const file = document.styleSheets[i];

      if (!file.cssRules) {
        continue;
      }

      const rules = file.cssRules;

      for (let r = 0; r < rules.length; r++) {
        extractedCSSText += rules[r].cssText;
      }
    }

    return extractedCSSText;
  }

  function getSVGString(svgNode) {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    const cssStyleText = getCSSStyles(svgNode);

    appendCSS(cssStyleText, svgNode);

    let serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgNode);

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

    let image = new Image();

    image.onload = function() {
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      canvas.toBlob(function(blob) {
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
  const svgSize = params.svg.getBoundingClientRect();

  if (params.tryToFix) {
    params.svg.setAttribute('width', svgSize.width + 'px');
    params.svg.setAttribute('height', svgSize.height + 'px');
    params.svg.setAttribute('style', '');
  }

  const svgString = getSVGString(params.svg);

  // passes Blob to the callback
  svgString2Image(
    svgString,
    svgSize.width,
    svgSize.height,
    params.callback
  );
};

export default svg2Image;
