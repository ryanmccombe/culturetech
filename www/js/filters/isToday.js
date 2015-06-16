/**
 * Created by Ryan on 16/06/2015.
 */

angular.module('cultureTech')
    .filter("isToday", function() {
        return function(item) {
            return true;
        };
    });