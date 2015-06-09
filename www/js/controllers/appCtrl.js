/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')

    .controller('AppCtrl', [function () {
        var app = this;

        // Level of demanding animations / effects
        app.effects = 1;

        // Is the search bar activated?
        app.searching = false;

        app.toggleSearch = function () {
            app.searching = !app.searching;
        }
    }]);