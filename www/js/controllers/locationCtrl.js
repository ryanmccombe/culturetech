/**
 * Created by Ryan on 19/06/2015.
 */

angular.module('cultureTech')
    .controller('LocationCtrl', ['locations', '$stateParams', '$timeout', 'ionicMaterialInk',
        function (locations, $stateParams, $timeout, ionicMaterialInk) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.location = locations.data.locations[$stateParams.id];

            // TODO: Check data connection (cordova plugin)
            vm.data = "3G";
        }]);