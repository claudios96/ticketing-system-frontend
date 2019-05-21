'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller(
        'TicketListCustomerCtrl',
        ['$scope', 'AuthFactory', 'TicketDataFactory', function ($scope, AuthFactory, TicketDataFactory) {
            let ctrl = this;


            function refreshTicketsFn() {
                console.log('refresh customer tickets');

                TicketDataFactory.GetAllTicketsFromCustomer(
                    function (tickets) {
                        ctrl.tickets = tickets;
                    }
                );
            }

            function init() {
                refreshTicketsFn();
                ctrl.userInfo = AuthFactory.getAuthInfo();
            }


            ctrl.refreshTickets = refreshTicketsFn;

            init();

        }]);