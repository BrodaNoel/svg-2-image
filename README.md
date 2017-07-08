# SVG-2-IMAGE
Let's improve it in a future.

## How to implement it in AngularJS
Here you have some help to implement it in AngularJS.

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
