'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .filter('filterPermission', function () {
        return function (data, firstParam, secondParam) {
            var returnData = [];
            angular.forEach(data, function (value, index) {
                angular.forEach(value[firstParam], function (val, ind) {
                    angular.forEach(val[secondParam], function (v, i) {
                        returnData.push(v);
                    });
                });
            });
            return returnData;
        };
    });
