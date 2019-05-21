'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .filter('TicketCategoryFilter', ['TicketDataFactory', function (TicketDataFactory) {
        return function (input) {
            /*
            let result = null;
            let TicketCategories = TicketDataFactory.GetTicketCategories();
            TicketCategories.forEach(function (category) {
               if (category.value == input) {
                   result =  category.label;
               }
            });
            if(result) {
                return result;
            } else {
                return input;
            }
            */

            if (input) {
                return input;
            } else {
                return 'Non specificato';
            }
            /*if (input == 0 || input === 'CATEGORY_1') {
                return 'Categoria 1';
            } else if (input == 1 || input === 'CATEGORY_2') {
                return 'Categoria 2';
            } else if (input == 2 || input === 'CATEGORY_3') {
                return 'Categoria 3';
            } else if (input == 3 || input === 'CATEGORY_4') {
                return 'Categoria 4';
            } else if (input == 4 || input === 'CATEGORY_5') {
                return 'Categoria 5';
            }
            return input;
            */
        };
    }]);