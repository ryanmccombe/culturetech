/**
 * Created by Ryan on 19/06/2015.
 */

angular.module('cultureTech')
    .controller('LocationCtrl', ['locations', '$stateParams', '$timeout', 'ionicMaterialInk', 'uiGmapGoogleMapApi',
        function (locations, $stateParams, $timeout, ionicMaterialInk, uiGmapGoogleMapApi) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.location = locations.data.locations[$stateParams.id];

            // Map UI
            vm.expandMap = false;

            vm.getMap = function(){
                vm.expandMap = true;
            };

            // Google Maps - Map Creator
            vm.map = { center: { latitude: vm.location.lat, longitude: vm.location.long }, zoom: 15 };

            // Don't set marker coords until API loads (doesn't "stick" to map otherwise)
            uiGmapGoogleMapApi.then(function(maps) {
                vm.coords = { latitude: vm.location.lat, longitude: vm.location.long };
            });

            // TODO: Check data connection (cordova plugin)
            vm.data = "3G";
        }]);