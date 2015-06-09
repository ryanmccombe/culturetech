/**
 * Created by Ryan on 09/06/2015.
 */

// Watch the value assigned to this attribute, and set focus on this element when that value becomes true

angular.module('cultureTech')
    .directive('setFocus', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.setFocus, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                            scope[attrs.setFocus] = false;
                        });
                    }
                });
            }
        };
    });