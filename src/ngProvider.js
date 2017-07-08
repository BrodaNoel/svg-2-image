import svg2Image from './index.js';

(function(svg2Image) {
  angular.module('ngSvg2Image', [])
    .provider('svg2Image', function() {
      this.$get = function() {
        return svg2Image;
      };

      this.init = function() {};
    });
})(svg2Image);
