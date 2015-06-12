/**
 * Created by Ryan on 13/06/2015.
 */

angular.module('cultureTech')
    .controller('HomeCtrl', ['$http', 'imagePreloader', function ($http, imagePreloader) {
        $http.get('js/2014logos.json')
            .success(function (data) {
                imagePreloader.preload(data)
                    .then(function () {
                        console.log('loaded ', data)
                    },
                    function (error) {
                        console.log('couldn\'t load ', error)
                    }
                );
            });
    }]);