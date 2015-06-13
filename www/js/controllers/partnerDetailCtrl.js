/**
 * Created by Ryan on 11/06/2015.
 */

angular.module('cultureTech')
    .controller('PartnerDetailCtrl', [
        '$state', '$stateParams', '$ionicViewSwitcher', 'partner', '$timeout', 'ionicMaterialInk',
        function ($state, $stateParams, $ionicViewSwitcher, partner, $timeout, ionicMaterialInk) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.partner = partner.this;
            vm.next = partner.next;
            vm.previous = partner.previous;

            // Force the transition direction such that going to next partner animates
            // forward and going to previous animates back, regardless of history

            vm.nextPartner = function () {
                $ionicViewSwitcher.nextDirection("forward");
                $state.go("tabs.partnerDetail", {'id': parseInt($stateParams.id, 10) + 1});
            };
            vm.previousPartner = function () {
                $ionicViewSwitcher.nextDirection("back");
                $state.go("tabs.partnerDetail", {'id': parseInt($stateParams.id, 10) - 1});
            };
        }]);