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
        '$cordovaDatePicker',
        '$filter',
        function (events,
                  ionicMaterialInk,
                  $stateParams,
                  $timeout,
                  $cordovaLocalNotification,
                  ctAlarms,
                  $cordovaDatePicker,
                  $filter) {

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

            var dateOptions = {
                mode: 'datetime',
                doneButtonLabel: 'Confirm',
                cancelButtonLabel: 'Cancel'
            };

            // Notifications TODO: Move this to service
            vm.toggleNotification = function (event) {
                if (vm.isScheduled(event.id)) {
                    vm.cancelNotification(event.id)
                } else {
                    dateOptions.date = new Date(event.start);
                    $cordovaDatePicker.show(dateOptions).then(function (date) {
                        vm.addNotification(event, date)
                    });
                }
            };

            vm.addNotification = function (event, date) {
                var eventTime = new Date(event.start);
                var humanTime = $filter('date')(eventTime, "EEEE, d MMMM - H:mm a");
                var eventLocation = vm.locations[event.location].name;

                // Set alarm in 10 seconds (testing)
                // var date = new Date();
                // alarmTime.setSeconds(alarmTime.getSeconds() + 10);

                ctAlarms.add({
                    id: event.id,
                    title: vm.event.name,
                    text: 'Your reminder for ' + vm.event.name + ' (' + humanTime + ' at ' + eventLocation + ')',
                    autoClear: true,
                    at: date,
                    sound: null
                });
            };

            vm.cancelNotification = function (id) {
                ctAlarms.remove(id);
            };

            vm.isScheduled = function (index) {
                return ctAlarms.exists(index);
            };


            // Todo: move to options screen
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