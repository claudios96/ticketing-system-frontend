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
        'TicketListCtrl',
        ['$scope', 'AuthFactory', 'TicketDataFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder','ErrorStateRedirector', '$state', '$mdDialog', 'myService', 'httpService', 'restService',
            function ($scope, AuthFactory, TicketDataFactory, DTOptionsBuilder, DTColumnDefBuilder,ErrorStateRedirector, $state, $mdDialog, myService, httpService, restService) {
                let ctrl = this;

                $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
                $scope.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(11).notSortable()
                ];


                function refreshTicketsFn() {
                    console.log('refresh tickets');

                    TicketDataFactory.GetAll(
                        function (tickets) {
                            ctrl.tickets = tickets;
                            console.log("TicketListController", ctrl.tickets)
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei ticket"});
                        });
                }

                function assignTicketToAssistantFn(ticketId, assistantId) {
                    console.log('assign ticket ' + ticketId + ' to assistant ' + assistantId);

                    TicketDataFactory.AssignTicketToAssistant(
                        ticketId,
                        assistantId,
                        function (response) {
                            console.log(response);
                            refreshTicketsFn();
                        },
                        function (error) {
                            console.error(error);
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'assegnamento del Ticket"});
                        }
                    );
                }


                function showAssignButtonFn(ticket) {
                    return ticket.currentTicketStatus === 'VALIDATION';
                }

                $scope.showDetails = function(tipo,param) {
                    let idTick = param;
                    myService.dataObj = {"id": idTick};
       //             if (tipo === 2) {


                        $mdDialog.show({
                            controller: "DialogController",
                            templateUrl: 'views/planning/dialog1.tmpl.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose: true

                        })
/*
                    } else if (tipo === 1) {

                        $mdDialog.show({
                            controller: "DialogController",
                            templateUrl: 'vews/planning/modalDetailsMyTickets.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose: true

                        })
                    }*/
                };

/*
                function showAssignButtonFn(ticket) {
                    return ticket.state == '0' ||
                        ticket.state == '4';
                }
*/
                function init() {
                    refreshTicketsFn();
                    ctrl.userInfo = AuthFactory.getAuthInfo();
                }


                ctrl.refreshTickets = refreshTicketsFn;
                ctrl.assignTicketToAssistant = assignTicketToAssistantFn;
                ctrl.showAssignButton = showAssignButtonFn;

                init();






                /**
                 *
                 * @ngdoc               function
                 * @name                closeTicket
                 * @description         Function used to send the ticket in the CLOSED state
                 *
                 * @param ticket        ticket
                 */
                $scope.closeTicket = function (ticket) {

                    let action = findAction("CLOSED", ticket);

                    var temp = "0";
                    httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + temp)
                        .then(function (data) {
                                $state.reload();
                            },
                            function (err) {
                                console.log(err);
                            })
                };

                /**
                 * @ngdoc               function
                 * @name                rejectResolvedTicket
                 * @description         Function used to send the ticket in the REOPENED state
                 *
                 * @param ticket        ticket
                 */
                $scope.rejectResolvedTicket = function (ticket) {
                    let action = findAction("REOPENED", ticket);

                    // Reopened state is always managed by the Team Coordinator.
                    httpService.get(restService.getTeamCoordinator)
                        .then(function (data) {

                                httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + data.data.id)
                                    .then(function (secondData) {
                                            $state.reload();
                                        },
                                        function (err) {
                                            console.log(err);
                                        });
                            },
                            function (err) {

                            });
                };

                /**
                 * @ngdoc           function
                 * @name            modifyTicket
                 * @description     Function used for saving an edited ticket.
                 *
                 * @param item     selected item
                 * @param index    iterator offset
                 */
    /*            $scope.modifyTicket = function (item, index) {
                    $scope.edit = resetIndexes($scope.edit);
                    $scope.editTicket = angular.copy(item);
                    $scope.edit[index] = true;
                    $scope.index = index;
                };*/



                /**
                 * @ngdoc               function
                 * @name                findAction
                 * @description         Function to find the action necessary to send the ticket in the specified state.
                 *
                 * @param stateName     state of which find the action
                 * @param ticket        the ticket
                 * @returns {*}
                 */
                var findAction = function (stateName, ticket) {
                    for (let i = 0; i < ticket.stateInformation[2].length; i++) {
                        if (ticket.stateInformation[2][i] === stateName) {
                            return ticket.stateInformation[0][i];
                        }
                    }

                    return null;
                };


                /**
                 * @ngdoc                   function
                 * @name                    resetIndexes
                 * @description             Function resets the index used for the 'Modify' function.
                 *
                 * @param arrayOfIndexes    items' indexes
                 * @returns {*}             reset items' indexes
                 */
                function resetIndexes(arrayOfIndexes) {

                    angular.forEach(arrayOfIndexes, function (value, key) {
                        arrayOfIndexes[key] = false;
                    });

                    return arrayOfIndexes;
                }


                /**
                 * @ngdoc           function
                 * @name            showImage
                 * @description     Function used for downloading the saved image os the ticket.
                 *
                 * @param item      selected item
                 * @param index     iterator offset
                 */
                $scope.showImage = function (item, index) {
                    util.postBase64(item).then(result => {
                        // Append the <a/> tag and remove it after automatic click for the download
                        document.body.appendChild(result);
                        result.click();
                        document.body.removeChild(result);
                    })
                }


                /**
                 * @ngdoc           function
                 * @name            modifyTicket
                 * @description     Function used for saving an edited ticket.
                 *
                 * @param item     selected item
                 * @param index    iterator offset
                 */
            /*    $scope.modifyTicket = function (item, index) {
                    $scope.edit = resetIndexes($scope.edit);
                    $scope.editTicket = angular.copy(item);
                    $scope.edit[index] = true;
                    $scope.index = index;
                };*/

            }]);