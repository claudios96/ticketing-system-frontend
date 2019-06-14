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
            controller: function ($scope) {

                $scope.setFooter = function () {
                    $scope.userInfo = AuthFactory.getAuthInfo();
                    console.log($scope.userInfo);
                    if ($scope.userInfo == null) {

                    } else if ($scope.userInfo.userRole === 'ADMIN') {
                        $scope.role = "Amministratore"
                        $scope.guide = "user.guideAdmin"

                    } else if ($scope.userInfo.userRole === 'CUSTOMER') {
                        $scope.role = "Cliente"
                        $scope.guide = "user.guide"
                    }

                };

                $scope.$watch(function () {
                    return AuthFactory.getAuthInfo;
                }, function () {
                    $scope.setFooter();
                });

            }
        }
    }]);
