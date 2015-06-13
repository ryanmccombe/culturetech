/**
 * Created by Ryan on 13/06/2015.
 */

angular.module('cultureTech')
    .controller('HomeCtrl', ['$http', 'imagePreloader', function ($http, imagePreloader) {
        $http.get('js/data/2014/logos.json')
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
    }]);