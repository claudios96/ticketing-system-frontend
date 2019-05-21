'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .filter('TicketTeamPriorityFilter', function () {
        return function (input) {
            /*
            if (input == 0 || input === 'BASSA') {
                return 'Bassa';
            } else if (input == 1 || input === 'MEDIA') {
                return 'Media';
            } else if (input == 2 || input === 'ALTA') {
                return 'Alta';
            }
            return 'Non specificato';
*/
            if (input) {
                return input;
            } else {
                return 'Non specificato';
            }
        };
    });