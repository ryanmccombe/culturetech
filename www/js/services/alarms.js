/**
 * Created by Ryan on 23/06/2015.
 */

angular.module('cultureTech')
    .factory('ctAlarms', ['$window', '$cordovaLocalNotification', function ($window, $cordovaLocalNotification) {
        function getAll(){
            if ($window.localStorage.alarms) {
                return JSON.parse($window.localStorage.alarms);
            } else {
                return [];
            }
        }

        function saveAll(alarms){
            $window.localStorage.alarms = JSON.stringify(alarms);
            console.log($window.localStorage.alarms);
        }

        function exists(id){
            // try {
            //     $cordovaLocalNotification.isScheduled(id).then(function (isScheduled) {
            //         return isScheduled;
            //     });
            // }
            // catch(err) {
            //     return false;
            // }

            return getAll().indexOf(id) >= 0
        }

        function add(options){
            try {
                $cordovaLocalNotification.schedule(options);
            }
            catch(err) {
                // Emulator

            }
            var alerts = getAll();
            alerts.push(options.id);
            saveAll(alerts);
        }

        function remove(id){
            try {
                $cordovaLocalNotification.cancel(id).then(function () {
                });
            }
            catch(err) {
                // Emulator

            }

            var alerts = getAll();
            var index = alerts.indexOf(id);
            alerts.splice(index, 1);

            saveAll(alerts);
        }

        return {
            get: getAll,
            exists: exists,
            add: add,
            remove: remove
        }
    }]);