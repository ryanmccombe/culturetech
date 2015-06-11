/**
 * Created by Ryan on 11/06/2015.
 */

angular.module('cultureTech')
    .controller('PartnerDetailCtrl', [
        '$state', '$ionicViewSwitcher', 'partnerData', '$timeout', 'ionicMaterialInk',
        function ($state, $ionicViewSwitcher, partnerData, $timeout, ionicMaterialInk) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.partner = partnerData.partner;
            vm.next = partnerData.next;
            vm.previous = partnerData.previous;

            vm.previousPartner = function (id) {
                $ionicViewSwitcher.nextDirection("back");
                $state.go("tabs.partnerDetail", {'id': id});
            };

            vm.nextPartner = function (id) {
                $ionicViewSwitcher.nextDirection("forward");
                $state.go("tabs.partnerDetail", {'id': id});
            };
        }]);