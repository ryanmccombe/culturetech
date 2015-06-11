/**
 * Created by Ryan on 11/06/2015.
 */

// Add the value as a class to the element when the native keyboard is visible.  Remove it when it isn't

angular.module('cultureTech')
    .directive('keyboardClass', function ($window) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                angular.element($window).bind('native.keyboardshow', function () {
                    element.addClass(attrs.keyboardClass);
                });

                angular.element($window).bind('native.keyboardhide', function () {
                    element.removeClass(attrs.keyboardClass);
                });
            }
        };
    });