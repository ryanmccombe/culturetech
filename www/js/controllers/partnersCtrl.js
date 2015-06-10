/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')

    .controller('PartnersCtrl',
    ['$state', '$http', 'ionicMaterialInk', '$timeout',
        function ($state, $http, ionicMaterialInk, $timeout) {
            ionicMaterialInk.displayEffect();
            var vm = this;
            function findById(array, id) {
                for (var i = 0, l = array.length; i < l; i++) {
                    if (array[i].id === id) {
                        return array[i];
                    }
                }
                throw "Couldn't find partner with id: " + id;
            }
            $http.get('js/2014.json').success(function (response) {
                vm.partners = response.partners;
                if ($state.params.id){
                    vm.partner = findById(vm.partners, $state.params.id)
                }
                $timeout(function () {
                    ionicMaterialInk.displayEffect();
                }, 0);
            });
        }]);