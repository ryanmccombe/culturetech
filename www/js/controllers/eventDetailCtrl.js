/**
 * Created by Ryan on 17/06/2015.
 */

angular.module('cultureTech')
    .controller('EventDetailCtrl', [
        'events',
        'ionicMaterialInk',
        '$stateParams',
        '$timeout',
        '$cordovaLocalNotification',
        'ctAlarms',
        function (events, ionicMaterialInk, $stateParams, $timeout, $cordovaLocalNotification, ctAlarms) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.event = events.data.events[$stateParams.id];
            vm.event.clickedSchedule = events.data.schedule[$stateParams.clickedSchedule];
            vm.locations = events.data.locations;
            vm.fullSchedule = events.data.schedule;

            // Get all listings for this event TODO: Cache this
            vm.schedule = events.data.schedule.filter(function (listing) {
                return listing.event == $stateParams.id;
            });


            // Notifications TODO: Move this to service
            vm.toggleNotification = function(event){
                if (vm.isScheduled(event.id)){
                    vm.cancelNotification(event.id)
                } else {
                    vm.addNotification(event)
                }
            };

            vm.addNotification = function (event) {
                // TODO: Epoch time to human time
                var eventTime = event.start;
                var eventLocation = vm.locations[event.location].name;

                // Set alarm in 10 seconds (testing)
                var alarmTime = new Date();
                alarmTime.setSeconds(alarmTime.getSeconds() + 10);

                ctAlarms.add({
                    id: event.id,
                    title: vm.event.name,
                    text: 'Your reminder for ' + vm.event.name + ' (' + eventTime + ' at ' + eventLocation +')',
                    autoClear: true,
                    at: alarmTime,
                    sound: null
                });
            };

            vm.cancelNotification = function (id) {
                ctAlarms.remove(id);
            };

            vm.isScheduled = function (index) {
                return ctAlarms.exists(index);
            };




            vm.getAllNotifications = function () {
                $cordovaLocalNotification.getAllIds().then(function (ids) {
                    console.log(JSON.stringify(ids))
                });
            };



            vm.cancelAllNotifications = function () {
                $cordovaLocalNotification.cancelAll().then(function () {
                    console.log("All Cancelled");
                });
            }

        }]);