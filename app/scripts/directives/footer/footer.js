'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

mainAngularModule
    .directive('myFooter', ['AuthFactory', function (AuthFactory) {
        return {
            templateUrl: 'scripts/directives/footer/footer.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope, $state) {

                $scope.setFooter = function () {
                    $scope.userInfo = AuthFactory.getAuthInfo();
                    console.log($scope.userInfo);

                    if ($scope.userInfo == null) {

                    }  else if ($scope.userInfo.userRole === 'CUSTOMER') {
                        $scope.role = "Cliente"
                    } else {
                        $scope.role = "Amministratore"
                    }

                    $scope.getState = function(){
                        if ($scope.userInfo == null) {

                        } else if ($scope.userInfo.userRole === 'CUSTOMER') {
                            $state.go('user.guide');
                        } else {
                            $state.go('user.guideAdmin');
                        }
                    };


                };

                $scope.$watch(function () {
                    return AuthFactory.getAuthInfo;
                }, function () {
                    $scope.setFooter();
                });

            }
        }
    }]);
