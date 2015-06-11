angular.module('cultureTech', ['ionic', 'ngCordova', 'ionic-material'])

    .run(function ($ionicPlatform, $cordovaStatusbar) {
        $ionicPlatform.ready(function () {

            // $cordovaStatusbar.styleHex('#121A21');  // Uncaught ReferenceError: StatusBar is not defined

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
        $ionicConfigProvider.scrolling.jsScrolling(false);
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
                        templateUrl: 'js/templates/home.html'
                    }
                }
            })
            .state('tabs.partners', {
                url: '/partners',
                views: {
                    'partners-tab': {
                        resolve: {
                            JSONData:  function($http){
                                return $http.get('js/2014.json');
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
                            partnerData:  function($http, find, $stateParams){
                                return $http.get('js/2014.json')
                                    .then(function(response){
                                        var partnerData = response.data.partners;
                                        var returnData = {};

                                        var index = find.inArray(partnerData, 'id', $stateParams.id);
                                        returnData.partner = partnerData[index];
                                        returnData.previous = partnerData[index-1];
                                        returnData.next = partnerData[index+1];
                                        returnData.partner.description = returnData.partner.description.replace(/(?:\r\n|\r|\n)/g, '<br>');

                                        return returnData;
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