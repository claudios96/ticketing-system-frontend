'use strict';

/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .filter('TicketStateFilter', function () {
        return function (input) {
            /*
            if (input == 0 || input === 'NEW') {
                return 'In attesa di assegnazione';
            } else if (input == 1 || input === 'PENDING') {
                return 'Ricevuto';
            } else if (input == 2 || input === 'EXECUTION') {
                return 'In esecuzione';
            } else if (input == 3 || input === 'DISCARDED') {
                return 'Scartato';
            } else if (input == 4 || input === 'RELEASED') {
                return 'Rilasciato';
            } else if (input == 5 || input === 'CLOSED') {
                return 'Chiuso';
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