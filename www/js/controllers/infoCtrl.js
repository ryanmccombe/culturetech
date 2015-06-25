/**
 * Created by Ryan on 21/06/2015.
 */

angular.module('cultureTech')
    .controller('InfoCtrl', [
        '$ionicScrollDelegate',
        'ionicMaterialInk',
        '$timeout',
        function ($ionicScrollDelegate,
                  ionicMaterialInk,
                  $timeout) {

            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.page = 0;
            vm.menuExpanded = false;
            vm.expandMenu = function () {
                if (!vm.menuExpanded) {
                    vm.setMargin('0');
                    vm.menuExpanded = true;
                } else {
                    vm.menuExpanded = false;
                }
            };

            vm.setPage = function (page) {
                if (vm.page != page) {
                    vm.page = page;
                    $ionicScrollDelegate.scrollTop(true);
                }
                vm.setMargin();
            };

            vm.setMargin = function (value) {
                document.getElementById('innerPage').style.marginTop = value ? value : '-' + vm.page * 44 + 'px';
            };

        }]);