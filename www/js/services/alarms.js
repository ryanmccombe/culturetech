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
        }

        function clearAll(){
            try {
                $cordovaLocalNotification.cancelAll().then(function () {
                    console.log("All Cancelled");
                });
            }
            catch(err) {
                // Emulator
            }

            $window.localStorage.alarms = '[]';
        }

        function exists(id){
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
            getAll: getAll,
            clearAll: clearAll,
            exists: exists,
            add: add,
            remove: remove
        }
    }]);