/**
 * Created by Ryan on 11/06/2015.
 */

angular.module('cultureTech')
    .factory('find', function () {

        // Return first object in an array where property = value
        var findInArray = function(array, property, value) {
            for (var i = 0, l = array.length; i < l; i++) {
                if (array[i][property] === value) {
                    return array[i];
                }
            }
            throw 'Could not find object with ' + property + ': ' + value;
        };

        return {
            inArray: findInArray
        }
    });