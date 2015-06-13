/**
 * Created by Ryan on 13/06/2015.
 */

angular.module('cultureTech')
    .controller('EventsCtrl', ['events', '$timeout', 'ionicMaterialInk', function (events, $timeout, ionicMaterialInk) {
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);

        var vm = this;
        vm.schedule = events.data.schedule;
        vm.events = events.data.events;
        vm.date = 0;

        vm.selectingDate = false;
        vm.toggleSelection = function () {
            if (!vm.selectingDate) {
                vm.setMargin('0');
                vm.selectingDate = true;
            } else {
                vm.selectingDate = false;
            }
        };
        vm.setDate = function (index) {
            vm.date = index;
            vm.setMargin();
        };

        vm.setMargin = function (value) {
            document.getElementById('innerDate').style.marginTop = value ? value : '-' + vm.date * 47 + 'px';
        }
    }]);