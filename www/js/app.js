angular.module('cultureTech', ['ionic', 'ngCordova', 'ionic-material', 'uiGmapgoogle-maps'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
        $ionicConfigProvider.views.transition('ios');
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('default');
        $ionicConfigProvider.navBar.alignTitle('left');
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.scrolling.jsScrolling(true);
    }])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tabs', {
                abstract: true,
                url: '/tab',
                templateUrl: 'js/templates/tabs.html',
                controller: 'AppCtrl as app'
            })
            .state('tabs.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'js/templates/home.html',
                        controller: 'HomeCtrl as vm'
                    }
                }
            })
            .state('tabs.events', {
                url: '/events',
                views: {
                    'events-tab': {
                        resolve: {
                            events: function ($http) {
                                return $http.get('js/data/2014/events.json');
                            }
                        },
                        templateUrl: 'js/templates/events.html',
                        controller: 'EventsCtrl as vm'
                    }
                }
            })
            .state('tabs.eventDetail', {
                url: '/events/:id/:clickedSchedule',
                views: {
                    'events-tab': {
                        resolve: {
                            events: function ($http) {
                                return $http.get('js/data/2014/events.json');
                            }
                        },
                        templateUrl: 'js/templates/eventDetail.html',
                        controller: 'EventDetailCtrl as vm'
                    }
                }
            })
            .state('tabs.location', {
                url: '/events/location/:id',
                views: {
                    'events-tab': {
                        resolve: {
                            locations: function ($http) {
                                return $http.get('js/data/2014/events.json');
                            }
                        },
                        templateUrl: 'js/templates/location.html',
                        controller: 'LocationCtrl as vm'
                    }
                }
            })
            .state('tabs.partners', {
                url: '/partners',
                views: {
                    'partners-tab': {
                        resolve: {
                            partners: function ($http) {
                                return $http.get('js/data/2014/partners.json');
                            }
                        },
                        templateUrl: 'js/templates/partners.html',
                        controller: 'PartnersCtrl as vm'
                    }
                }
            })
            .state('tabs.partnerDetail', {
                url: '/partners/:id',
                views: {
                    'partners-tab': {
                        resolve: {
                            partner: function ($http, $stateParams) {
                                return $http.get('js/data/2014/partners.json')
                                    .then(function (response) {
                                        var partnerData = response.data;

                                        // Populate the partner object with 3 sub- objects - this partner,
                                        // previous partner, and next partner
                                        var partner = {};
                                        var id = parseInt($stateParams.id, 10);
                                        partner.this = partnerData[id];
                                        partner.previous = partnerData[id - 1];
                                        partner.next = partnerData[id + 1];

                                        return partner;
                                    });
                            }
                        },
                        templateUrl: 'js/templates/partnerDetail.html',
                        controller: 'PartnerDetailCtrl as vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/home')
    });