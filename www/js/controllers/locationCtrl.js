/**
 * Created by Ryan on 19/06/2015.
 */

angular.module('cultureTech')
    .controller('LocationCtrl', ['locations', '$stateParams', '$timeout', 'ionicMaterialInk', 'uiGmapGoogleMapApi', '$cordovaNetwork',
        function (locations, $stateParams, $timeout, ionicMaterialInk, uiGmapGoogleMapApi, $cordovaNetwork) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            var vm = this;
            vm.location = locations.data.locations[$stateParams.id];

            var mapStyle = [
                {
                    "featureType": "landscape.natural",
                    "stylers": [
                        { "weight": 0.1 },
                        { "color": "#ffffff" }
                    ]
                },{
                    "featureType": "landscape.man_made",
                    "stylers": [
                        { "color": "#E1E6E8" }
                    ]
                },{
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        { "visibility": "on" },
                        { "color": "#ffffff" }
                    ]
                },{
                    "elementType": "labels.text.fill",
                    "stylers": [
                        { "color": "#121A21" }
                    ]
                },{
                    "featureType": "water",
                    "stylers": [
                        { "visibility": "on" },
                        { "color": "#f4f4f4" }
                    ]
                },{
                    "elementType": "labels.icon",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                },{
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        { "weight": 8 }
                    ]
                },{
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        { "visibility": "simplified" },
                        { "color": "#363F45" }
                    ]
                },{
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        { "color": "#94A0A8" }
                    ]
                },{
                    "featureType": "road.local",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        { "color": "#ffffff" },
                        { "weight": 4.3 }
                    ]
                },{
                    "featureType": "poi",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                },{
                }
            ];

            vm.mapOptions = {
                styles: mapStyle,
                disableDefaultUI: true
            };

            vm.markerIcon= { url:"../img/mapmarker.png" };


            // Network
            vm.getNetwork = function(automatic){
                vm.data = false;
                vm.loading = false;

                // $cordovaNetwork will not work on web preview
                try {
                    if ($cordovaNetwork.isOnline()) {
                        vm.data = $cordovaNetwork.getNetwork();
                    }
                }
                catch(err) {
                    vm.data = "Fixed";
                }

                // Provide some feedback if user triggered it (fake loading screen for now)
                if(!automatic){
                    console.log('loading');
                    vm.loading = true;
                    $timeout(function () {
                        console.log('done');
                        vm.loading=false;
                    }, 700);
                }
            };

            vm.getNetwork(true);


            // Map UI
            vm.expandMap = false;
            vm.getMap = function(){
                vm.expandMap = true;
            };

            // Google Maps - Map Control Object
            vm.mapControl = {};

            vm.coords = { latitude: vm.location.lat, longitude: vm.location.long };

            // Don't set marker coords until API loads
            // Marker and map center must be different objects - center object is updated as user scrolls
            uiGmapGoogleMapApi.then(function(maps) {
                vm.locationCoords = { latitude: vm.location.lat, longitude: vm.location.long };
            });

            // Recenter map on the location coords
            vm.recenterMap = function(){
                vm.mapControl.refresh(vm.locationCoords);
            };

        }]);