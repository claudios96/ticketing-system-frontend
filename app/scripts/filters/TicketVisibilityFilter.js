'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .filter('TicketVisibilityFilter', function () {
        return function (input) {
            /*
            if (input == 0 || input === 'Public') {
                return 'Pubblica';
            } else if (input == 1 || input === 'Private') {
                return 'Privata';
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