/**
 * Created by Ryan on 25/06/2015.
 */

angular.module('cultureTech')
.controller('SettingsCtrl', [
        '$timeout',
        'ionicMaterialInk',
        'ctAlarms',
        function($timeout, ionicMaterialInk, ctAlarms){

        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);


        var vm = this;

        vm.alarmCount = ctAlarms.getAll().length;

        vm.clearAlarms = function(){
            ctAlarms.clearAll();
            vm.alarmCount = ctAlarms.getAll().length;
        }

    }]);