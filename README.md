# SVG-2-IMAGE
`svg-2-image` is a library to create a image from a SVG.
Creating a image from a SVG is harded that you may expect.

The process to create a image from a SVG, basically consist in:
* Translate each SVG element in a XML element
* Serialize from XML to base64 string
* Transform the base64 to a image-base64
* Create a image-URL from the image-base64
* Create a image using the image-url
* Put the image inside a Canvas (because that base64-url-image-xml needs to be interpreted by a `canvas` element, to be renderized as a image)
* Get the canvas binary data
* Download the canvas binary data as a image. And then you have the image download.

But, that's the **EASY** part. The worst part is that a SVG can be styled (like CSS) by tons of ways:
* SVG attributes (like: `<svg width="100px">`)
* SVG props (like: `<svg style="fill: #000">`)
* CSS in-line (like: `<svg style="color: #000">`)
* CSS rules (you know... the base CSS no-in-line, like `svg.text {color: #000;}>`)

So, it looks easy, but, it's not easy, because when you translate the SVG to XML, you are loosing all CSS that are not inline. All rules like `svg.text {color: #000;}>` will be lost. So, the harder part here is ti inject the CSS rules inside the CSV, and get it interpreted by the Canvas.

This library is covering all those weird use cases that we have, and those that will come.

## How to implement it in AngularJS using a Directive pre-created
Check this another library: https://github.com/BrodaNoel/d3-to-image

## How to implement it in AngularJS creating my own Directive
* In `bower.json`, add: `"svg-2-image": "^1.0.0",`.
* In your `index.html` add `<script src="[path]/svg-2-image/lib/svg-2-image-ngProvider.min.js"></script>`.
* Add ngSvg2Image as dependency in your App, doing:
```js
angular
  .module('yourAwesomeApp', [
      'ngRoute',
      // ...
      'ngSvg2Image' // <<< Add this!
  ])
```
* Then, for example, add a button that will call a `save` function to use your directive (that it use svg-2-image), doing:
```html
  <a ng-click="save('filename.png')">Export SVG to PNG</a>
```
* To implement it, you can create a Directive that expose a `save` function that will be called when click on the button, like this:
```js
angular.module('[your-module]').directive('myDirective', ['svg2Image',
    function(svg2Image) {
        var link = function($scope, element) {
            $scope.save = function(filename) {
                // let's find the SVG element!
                var svgElement = element.find('svg').first()[0];

                svg2Image({
                    // The SVG element
                    svg: svgElement,

                    // Ask to the library to do changes over the SVG element in
                    // order to make it compatible with all browsers.
                    tryToFix: true,

                    // After create the image, download it using the Blob object
                    callback: function(imageFormats) {
                        // Let's download the image using FileSave library.
                        saveAs(imageFormats.blob, filename);
                        // If you don't want to use `saveAs`, you can do something like:
                        // window.location.href = imageFormats.base64ForSrc
                    }
                });
            };
        };

        return {
            restrict: 'E',
            link: link,
            scope: {
                save: '='
            }
        };
    }]);
```
* Now, wrap your SVG with your new directive, doing:
```hmtl
<my-directive data-save="save">
    <svg...></svg> <!-- Here you can have D3, NVD3, or whatever. -->
</my-directive>
```
