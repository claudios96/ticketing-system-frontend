'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

mainAngularModule
    .directive('myFooter', function () {
        return {
            templateUrl: 'scripts/directives/footer/footer.html',
            restrict: 'E',
            replace: true,
        }
    });
