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
        function (events, ionicMaterialInk, $stateParams, $timeout, $cordovaLocalNotification) {
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

            vm.addNotification = function () {
                var alarmTime = new Date();
                alarmTime.setSeconds(alarmTime.getSeconds() + 10);
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: 'Test Title',
                    text: 'Hello World',
                    autoClear: true,
                    at: alarmTime
                });
            };

            // Notifications TODO: Move this to service
            vm.isScheduled = function () {
                $cordovaLocalNotification.isScheduled(1).then(function (isScheduled) {
                    console.log("Notification 1 Scheduled: " + isScheduled);
                });
            };

            vm.getAllNotifications = function () {
                $cordovaLocalNotification.getAllIds().then(function (ids) {
                    console.log(JSON.stringify(ids))
                });
            };

            vm.cancelNotification = function () {
                $cordovaLocalNotification.cancel(1).then(function () {
                    console.log("Notification 1 Cancelled");
                });
            };

            vm.cancelAllNotifications = function () {
                $cordovaLocalNotification.cancelAll().then(function () {
                    console.log("All Cancelled");
                });
            }

        }]);