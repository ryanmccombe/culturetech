/**
 * Created by Ryan on 13/06/2015.
 */

angular.module('cultureTech')
    .controller('HomeCtrl', ['$http', 'imagePreloader', function ($http, imagePreloader) {

        // Preload Images
        $http.get('js/data/2014/cache.json')
            .success(function (data) {
                imagePreloader.preload(data.logos.concat(data.events))
                    .then(function () {
                        // success
                    },
                    function (error) {
                        console.log('couldn\'t load ', error)
                    }
                );
            });
    }]);