/**
 * Created by Ryan on 09/06/2015.
 */

angular.module('cultureTech')

.controller('PartnersCtrl', ['$http', 'ionicMaterialInk', '$timeout', function($http, ionicMaterialInk, $timeout){
        ionicMaterialInk.displayEffect();
        var vm = this;
        $http.get('js/2014.json').success(function(response){
            vm.partners = response.partners;
            $timeout(function() {
                ionicMaterialInk.displayEffect();
            }, 0);
        });
    }]);