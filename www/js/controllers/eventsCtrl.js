/**
 * Created by Ryan on 13/06/2015.
 */

angular.module('cultureTech')
    .controller('EventsCtrl', ['events', '$timeout', 'ionicMaterialInk', '$ionicScrollDelegate', function (events, $timeout, ionicMaterialInk, $ionicScrollDelegate) {
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);

        var vm = this;
        vm.schedule = events.data.schedule;
        vm.events = events.data.events;
        vm.cache = events.data.dayCache;
        vm.date = 0;

        // Generate a random event for this day
        vm.random = {};
        var today, randomNumber, randomEvent;
        function getRandom(){
            today = vm.cache[vm.date];
            randomNumber = today[Math.floor(Math.random()*today.length)];
            randomEvent = vm.schedule[randomNumber];

            if (vm.random.title === vm.events[randomEvent.event].name){
                // If its the same event but on a different day - pick a new one - not immediately clear user changed day otherwise
                return getRandom();
            } else {
                return {
                    img: vm.events[randomEvent.event].img,
                    title: vm.events[randomEvent.event].nameShort || vm.events[randomEvent.event].name,
                    start: randomEvent.start,
                    end: randomEvent.end
                }
            }
        }

        vm.random = getRandom();

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
            // Don't change random image if user didn't change date - confusing UX otherwise
            if (vm.date != index){
                vm.date = index;
                vm.random = getRandom();
            }
            vm.setMargin();
        };

        vm.setMargin = function (value) {
            document.getElementById('innerDate').style.marginTop = value ? value : '-' + vm.date * 44 + 'px';
        };
    }]);