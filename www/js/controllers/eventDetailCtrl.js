/**
 * Created by Ryan on 17/06/2015.
 */

angular.module('cultureTech')
    .controller('EventDetailCtrl', ['events', 'ionicMaterialInk', '$stateParams', '$timeout',
        function (events, ionicMaterialInk, $stateParams, $timeout) {
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);

        var vm = this;
        vm.event = events.data.events[$stateParams.id];
        vm.event.clickedSchedule = $stateParams.clickedSchedule;

        // Get all listings for this event TODO: Cache this
        vm.schedule = events.data.schedule.filter(function(listing){
            return listing.event == $stateParams.id;
        });
    }]);