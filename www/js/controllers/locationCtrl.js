/**
 * Created by Ryan on 19/06/2015.
 */

angular.module('cultureTech')
    .controller('LocationCtrl', ['locations', '$stateParams', '$timeout', 'ionicMaterialInk', 'uiGmapGoogleMapApi', '$cordovaNetwork',
        function (locations, $stateParams, $timeout, ionicMaterialInk, uiGmapGoogleMapApi, $cordovaNetwork) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.location = locations.data.locations[$stateParams.id];

            // Network

            vm.getNetwork = function(automatic){
                vm.data = false;
                vm.loading = false;

                // $cordovaNetwork will be undefined in test environment
                try {
                    if ($cordovaNetwork.isOnline()) {
                        vm.data = $cordovaNetwork.getNetwork();
                    }
                }
                catch(err) {
                    vm.data = true;
                }

                // Provide some feedback if user triggered it (fake loading screen for now)
                if(!automatic){
                    console.log('loading');
                    vm.loading = true;
                    $timeout(function () {
                        console.log('done');
                        vm.loading=false;
                    }, 700);
                }
            };

            vm.getNetwork(true);


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

        }]);