/**
 * Created by Ryan on 13/06/2015.
 */

angular.module('cultureTech')
    .controller('EventsCtrl', ['events', '$timeout', 'ionicMaterialInk', '$ionicScrollDelegate',
        function (events, $timeout, ionicMaterialInk, $ionicScrollDelegate) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.date = 0;
            vm.schedule = events.data.schedule;
            vm.events = events.data.events;
            vm.cache = events.data.dayCache;


            // Generate a random event for this day
            vm.random = {};
            var today, randomNumber, randomEvent;

            function getRandom() {
                today = vm.cache[vm.date];
                randomNumber = today[Math.floor(Math.random() * today.length)];
                randomEvent = vm.schedule[randomNumber];

                // If its the same event but on a different day - try again - not clear user changed day otherwise
                if (vm.random.title === vm.events[randomEvent.event].name) {
                    return getRandom();
                } else {
                    return {
                        schedule: randomNumber,
                        id: randomEvent.event,
                        img: vm.events[randomEvent.event].img,
                        title: vm.events[randomEvent.event].nameShort || vm.events[randomEvent.event].name,
                        start: randomEvent.start,
                        end: randomEvent.end
                    }
                }
            }

            vm.random = getRandom();

            // Open the date selector
            vm.selectingDate = false;
            vm.toggleSelection = function () {
                if (!vm.selectingDate) {
                    vm.setMargin('0');
                    vm.selectingDate = true;
                } else {
                    vm.selectingDate = false;
                }
            };

            // Change date, unless user selected the current date
            vm.setDate = function (index) {
                if (vm.date != index) {
                    vm.date = index;
                    vm.random = getRandom();
                    $ionicScrollDelegate.scrollTop(true);
                }
                vm.setMargin();
            };

            vm.setMargin = function (value) {
                document.getElementById('innerDate').style.marginTop = value ? value : '-' + vm.date * 50 + 'px';
            };
        }]);