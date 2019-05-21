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
        'TicketListOfCurrentAssistantCtrl',
        ['$scope', '$state', 'AuthFactory', 'TicketDataFactory', 'ToasterNotifierHandler', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ErrorStateRedirector',
            function ($scope, $state, AuthFactory, TicketDataFactory, ToasterNotifierHandler, DTOptionsBuilder, DTColumnDefBuilder, ErrorStateRedirector) {
                let ctrl = this;


                $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
                $scope.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(10).notSortable()
                ];

                function downloadAttachedFilesFn(ticketId) {
                    TicketDataFactory.DownloadAttached(
                        ticketId,
                        function (data) {
                            console.log(data);
                            // let headers = data.headers();

                            // let filename = headers['X-Filename'];
                            // let contentType = headers['Content-Type'];
                            let contentType = '';
                            let filename = 'file';

                            let linkElement = document.createElement('a');
                            try {
                                let blob = new Blob([data], {type: contentType});
                                let url = window.URL.createObjectURL(blob);

                                linkElement.setAttribute('href', url);
                                linkElement.setAttribute('download', filename);

                                let clickEvent = new MouseEvent('click', {
                                    'view': window,
                                    'bubbles': true,
                                    'cancelable': false
                                });
                                linkElement.dispatchEvent(clickEvent);
                            } catch (ex) {
                                console.log(ex);
                            }
                        },
                        function (error) {
                            console.error(error);
                            ToasterNotifierHandler.showErrorToast('Errore nel download del file');
                        }
                    );
                }

                function stateEditTicketFn(ticketId) {
                    $state.go('ticket.edit', {
                        ticketId: ticketId
                    });
                }

                function refreshTicketsFn(assistantId) {
                    console.log('refresh tickets');

                    TicketDataFactory.GetAllTicketsFromAssistant(
                        assistantId,
                        function (tickets) {
                            ctrl.tickets = tickets;
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei ticket"});
                        }
                    );
                }

                function unassignTicketFromAssistantFn(ticketId, assistantId) {
                    console.log('Unassign ticket ' + ticketId + ' from assistant ' + assistantId);

                    TicketDataFactory.UnassignTicketFromAssistant(
                        ticketId,
                        assistantId,
                        function (response) {
                            console.log(response);
                            refreshTicketsFn(ctrl.userInfo.userId);
                        },
                        function (error) {
                            console.error(error);
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella revoca del Ticket"});
                        }
                    );
                }

                function init() {
                    ctrl.userInfo = AuthFactory.getAuthInfo();
                    refreshTicketsFn(ctrl.userInfo.userId);
                }


                ctrl.downloadAttachedFiles = downloadAttachedFilesFn;
                ctrl.refreshTickets = refreshTicketsFn;
                ctrl.stateEditTicket = stateEditTicketFn;
                ctrl.unassignTicketFromAssistant= unassignTicketFromAssistantFn;


                init();
            }]);