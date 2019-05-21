'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 */
mainAngularModule
    .controller('ErrorController', ['$scope', '$state', '$stateParams', '$sessionStorage',
        function ($scope, $state, $stateParams, $sessionStorage) {

            let ctrl = this;
            init();
            var errorMsg;

            function init() {

                ctrl.errorObject = $sessionStorage.get("errorMsg");
                if (ctrl.errorObject == null || ctrl.errorObject == undefined) {
                    $sessionStorage.put("errorMsg", $stateParams.errorObject)
                    ctrl.errorObject = $stateParams.errorObject;

                }

                $scope.$on('$destroy', function () {

                    $sessionStorage.remove("errorMsg")
                })

            }


        }


    ]);