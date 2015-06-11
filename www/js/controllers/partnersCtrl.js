/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')

    .controller('PartnersCtrl',
    ['ionicMaterialInk', '$timeout', 'JSONData',
        function (ionicMaterialInk, $timeout, JSONData) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);
            var vm = this;
            vm.partners = JSONData.data.partners;
        }]);