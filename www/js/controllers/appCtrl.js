/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')
    .controller('AppCtrl', ['ionicMaterialInk', '$timeout', function (ionicMaterialInk, $timeout) {
        var app = this;

        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);

        // Level of demanding animations / effects
        app.effects = 0;

        // Is the search bar activated?
        app.searching = false;

        // Activate or deactivate the search bar
        app.toggleSearch = function () {
            app.searching = !app.searching;
        };

        // Do this when the search bar is focused
        app.focusSearch = function(){
            app.keyboard = true;
        };

        // Do this when the search bar is blurred
        app.blurSearch = function () {
            app.keyboard = false;
        };
    }]);