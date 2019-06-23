'use strict';

mainAngularModule.controller('DialogTicketDetailController',['$scope','myService','$mdDialog','TicketDataFactory', 'ErrorStateRedirector',
    function($scope,myService,$mdDialog, TicketDataFactory, ErrorStateRedirector){

        var ctrl = this;

        function init() {
            const tID = myService.dataObj.ticketID;

            TicketDataFactory.GetSingleTicket(tID, function (response) {
                ctrl.ticket = response;
                console.log('GetSingleTicket ', tID, ' ', ctrl.ticket);

            }, function () {
                ErrorStateRedirector.GoToErrorPage({Messaggio: 'Errore nel recupero dei dettaglio del ticket con ID:' + ctrl.ticketID});
            });
        }

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        init();

    }]);