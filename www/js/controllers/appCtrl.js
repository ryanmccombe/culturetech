/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')
    .controller('AppCtrl', ['ionicMaterialInk', '$timeout', '$ionicScrollDelegate', '$state', '$cordovaInAppBrowser',
        function (ionicMaterialInk, $timeout, $ionicScrollDelegate, $state, $cordovaInAppBrowser) {
            var app = this;

            // Apply ink listener to .ink elements
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            // Check what state we're in
            app.isState = function (state) {
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

            // Load external URLs (partner websites, online RSVPs)
            // Browsers: _blank = Inapp Browser
            //           _self = Cordova Webview (requires whitelist, otherwise opens in _system)
            //           _system = System default browser

            var defaultOptions = {
                location: 'no',
                clearcache: 'no',
                toolbar: 'no'
            };
            app.loadExternalUrl = function (url, browser, options) {
                $cordovaInAppBrowser.open(url, browser || '_system', options | defaultOptions);
            };

            // Call (todo: globalisation)
            app.call = function(country, number){
                window.open('tel:00' + country + number);
            }
        }]);