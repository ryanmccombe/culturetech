/**
 * Created by Ryan on 21/06/2015.
 */

angular.module('cultureTech')
.controller('InfoCtrl', ['$ionicScrollDelegate', function($ionicScrollDelegate){
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
            document.getElementById('innerDate').style.marginTop = value ? value : '-' + vm.page * 44 + 'px';
        };

    }]);