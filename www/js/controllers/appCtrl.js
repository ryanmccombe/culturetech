/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')

    .controller('AppCtrl', [function () {
        var app = this;
        app.searching = false;
        app.toggleSearch = function () {
            app.searching = !app.searching;
        }
    }]);