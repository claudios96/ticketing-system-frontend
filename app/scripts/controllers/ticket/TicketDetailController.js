'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

mainAngularModule
    .controller('TicketDetailCtrl', ['$scope','$state', '$stateParams', 'TicketDataFactory','ErrorStateRedirector',
        function ($scope, $state, $stateParams, TicketDataFactory, ErrorStateRedirector) {

            var ctrl = this;

            function init() {
                ctrl.ticketID = $stateParams.ticketID;

                TicketDataFactory.GetSingleTicket(4, function (response) {
                    ctrl.ticket = response;
                }, function () {
                    ErrorStateRedirector.GoToErrorPage({Messaggio: 'Errore nel recupero dei dettaglio del ticket con ID:' + ctrl.ticketID});
                });
            }

            function showProductsListFn() {
                $state.go('productsoftware.list');
            }

            ctrl.showProductsList = showProductsListFn;
            init();
        }]);