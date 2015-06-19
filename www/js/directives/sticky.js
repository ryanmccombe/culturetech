/**
 * Created by Ryan on 15/06/2015.
 */

// Unused
// Stick an element once scroll position passes a breakpoint

angular.module('cultureTech')
    .directive('sticky', ['$ionicScrollDelegate', '$ionicPosition', function ($ionicScrollDelegate, $ionicPosition) {
        return {
            require: '^$ionicScroll',
            link: function (scope, element, attrs, $ionicScroll) {
                console.log(element);
                console.log(document.getElementById('date-box'));

                var el = document.getElementById('date-box');

                angular.element($ionicScroll.element).on('scroll', function (event) {
                    if ($ionicScrollDelegate.getScrollPosition().top > 199) {

                    } else {

                    }
                });
            }
        };
    }]);