/**
 * Created by Ryan on 11/06/2015.
 */

// Load data-binded background image urls (kind of an ng-src for css)

angular.module('cultureTech')
    .directive('backgroundImage', function () {
        return function(scope, element, attrs){
            attrs.$observe('background-image', function(value){
                console.log(value);
                element.css({
                    'background-image': 'url(' + value + ') no-repeat center center',
                })
            });
        };
    });
