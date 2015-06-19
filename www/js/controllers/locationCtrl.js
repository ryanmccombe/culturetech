/**
 * Created by Ryan on 19/06/2015.
 */

angular.module('cultureTech')
    .controller('LocationCtrl', ['locations', '$stateParams', '$timeout', 'ionicMaterialInk',
        function (locations, $stateParams, $timeout, ionicMaterialInk) {

            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var locationData = locations.data.locations;
            var vm = this;

            vm.location = locationData[$stateParams.id]

        }]);