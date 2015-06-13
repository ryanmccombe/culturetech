/**
 * Created by Ryan on 13/06/2015.
 */

// Preload an array of image URLs

angular.module('cultureTech')
    .factory('imagePreloader', ['$q', '$timeout', function ($q) {
        function preload(images) {
            var promises = [];

            for (var i = 0, l = images.length; i < l; i++) {
                var promise = $q.defer();
                var img = new Image();

                img.onload = (function (promise) {
                    return function () {
                        promise.resolve();
                    }
                })(promise);

                img.onerror = (function (promise, url) {
                    return function () {
                        promise.reject(url);
                    }
                })(promise, images[i]);

                promises.push(promise.promise);
                img.src = images[i];
            }
            return $q.all(promises);
        }

        return {
            preload: preload
        }
    }]);