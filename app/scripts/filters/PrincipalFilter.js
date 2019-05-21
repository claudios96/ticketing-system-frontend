'use strict';

mainAngularModule
    .filter('PrincipalFilter', function () {
        return function (input) {

            if (input == '0') {
                return 'RUOLO';
            }
            if (input == '1') {
                return 'UTENTE';
            }
            return 'Non specificato';
            /*
            if (input) {
                return input;
            } else {
                return 'Non specificato';
            }
            */
        };
    });