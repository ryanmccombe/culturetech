/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')

    .controller('PartnersCtrl',
    ['$http', 'ionicMaterialInk', '$timeout', 'partners', 'imagePreloader',
        function ($http, ionicMaterialInk, $timeout, partners, imagePreloader) {
            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);

            // If user visits partner list, preload partner photos in case they visit their detail page
            $http.get('js/data/2014/partnerPosters.json')
                .success(function (data) {
                    imagePreloader.preload(data)
                        .then(function () {
                            // success
                        },
                        function (error) {
                            console.log('couldn\'t load ', error)
                        }
                    );
                });

            var vm = this;
            vm.partners = partners.data;
        }]);