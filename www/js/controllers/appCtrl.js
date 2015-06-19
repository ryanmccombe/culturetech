/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')
    .controller('AppCtrl', ['ionicMaterialInk', '$timeout', '$ionicScrollDelegate', '$state',
        function (ionicMaterialInk, $timeout, $ionicScrollDelegate, $state) {
            var app = this;

            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            app.isState = function(state){
                return $state.current.name === state;
            };

            // Level of demanding animations / effects
            app.effects = 0;

            // Is the search bar activated?
            app.searching = false;

            // Activate or deactivate the search bar
            app.toggleSearch = function () {
                app.searching = !app.searching;
            };

            // Do this when the keyboard is activated
            app.keyboardActive = function () {
                app.keyboard = true;
            };

            // Do this when the keyboard is deactivated
            app.keyboardGone = function () {
                app.keyboard = false;
                $timeout(function () {
                    $ionicScrollDelegate.resize();
                }, 200);
            };

            app.loadExternalUrl = function (url, options) {
                // TODO
                console.log(url, options);
            }
        }]);