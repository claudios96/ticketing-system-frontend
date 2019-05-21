'use strict';

mainAngularModule
    .filter('PermissionMaskFilter', function () {
        return function (input) {
            /*
            if (input == '1') {
                return 'R';
            }
            if (input == '2') {
                return 'W';
            }
            if (input == '4') {
                return 'C';
            }
            if (input == '8') {
                return 'D';
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