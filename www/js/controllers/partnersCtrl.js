/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')

    .controller('PartnersCtrl',
    ['$state', '$http', 'ionicMaterialInk', '$timeout', 'find',
        function ($state, $http, ionicMaterialInk, $timeout, find) {
            var vm = this;

            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            $http.get('js/2014.json').success(function (response) {
                vm.partners = response.partners;
                if ($state.params.id) {
                    var index = find.inArray(vm.partners, 'id', $state.params.id);
                    vm.partner = vm.partners[index];
                    vm.previous = vm.partners[index-1];
                    vm.next = vm.partners[index+1];
                    vm.partner.description = vm.partner.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
                }
            });
        }]);