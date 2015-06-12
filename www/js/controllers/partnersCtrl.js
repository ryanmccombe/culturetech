/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')

    .controller('PartnersCtrl',
    ['$http', 'ionicMaterialInk', '$timeout', 'JSONData', 'imagePreloader',
        function ($http, ionicMaterialInk, $timeout, JSONData, imagePreloader) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            $http.get('js/2014partnerposters.json')
                .success(function (data) {
                    imagePreloader.preload(data);
                });

            var vm = this;
            vm.partners = JSONData.data.partners;
        }]);