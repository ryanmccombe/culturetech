/**
 * Created by Ryan on 11/06/2015.
 */

// Replace \n\r with <br />

angular.module('cultureTech')
    .filter("newLineToBr", function($filter) {
        return function(data) {
            if (!data) return data;
            return data.replace(/\n\r?/g, '<br />');
        };
    });