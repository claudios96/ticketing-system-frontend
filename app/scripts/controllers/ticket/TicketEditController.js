'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

mainAngularModule
    .controller('TicketEditCtrl', ['$scope', '$state', '$stateParams', '$filter', 'AuthFactory', 'TicketDataFactory', 'softwareProductDataFactory', 'ErrorStateRedirector', 'ToasterNotifierHandler',
        function ($scope, $state, $stateParams, $filter, AuthFactory, TicketDataFactory, softwareProductDataFactory, ErrorStateRedirector, ToasterNotifierHandler) {
            let ctrl = this;


            getFields();

            function getFields() {
                TicketDataFactory.getMetadata(function (response) {
                    ctrl.TICKET_VISIBILITIES = response.data.visibilities;
                    ctrl.TICKET_CATEGORIES = response.data.categories;
                    ctrl.TICKET_CUSTOMER_PRIORITIES = response.data.priorities;
                    ctrl.TICKET_TEAM_PRIORITIES = response.data.priorities;
                    ctrl.TICKET_STATUS = response.data.statuses;
                    ctrl.softwareProducts = response.data.targets;
                }, function () {
                    alert("Invalid metadata");
                });
            }


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

            function checkTicketStateFn(state) {
                // Stato del ticket RELEASED
                if (state == 4) {
                    ctrl.ticket.assistant = undefined;
                    ctrl.ticket.visibility = 0;
                }
            }

            function updateTicketFn() {
                // Controllo lo stato del ticket
                checkTicketStateFn(ctrl.ticket.state);
                // Controllo sul formato dei dati da inviare
                ctrl.ticket.customer = ctrl.ticket.customer.id;
                if (ctrl.ticket.target &&
                    ctrl.ticket.target !== parseInt(ctrl.ticket.target, 10)) {
                    ctrl.ticket.target = ctrl.ticket.target.id;
                }
                if (ctrl.ticket.assistant) {
                    ctrl.ticket.assistant = ctrl.ticket.assistant.id;
                }

                TicketDataFactory.Update(
                    ctrl.ticket,
                    function () {
                        $state.go('ticket.ofCurrentAssistant');
                    }, function (error) {
                        console.error(error);
                        ErrorStateRedirector.GoToErrorPage({Messaggio: 'Errore nell\'update del ticket'});
                    });
            }

            function showAssistantsTicketFn(assistantId) {
                let ticketId = $stateParams.ticketId;
                console.log('show ticket ' + ticketId + ' of assistant with id: ' + assistantId);

                TicketDataFactory.GetSingle(
                    ticketId,
                    assistantId,
                    function (ticket) {
                        ctrl.ticket = ticket;
                    }, function (error) {
                        console.log(error);
                        ErrorStateRedirector.GoToErrorPage({Messaggio: 'Errore nell\'import del ticket per l\'assistant: ' + assistantId});

                    }
                );
            }

            function populateProductSoftwareListFn() {
                console.log('populate softwareProducts list');

                softwareProductDataFactory.GetAll(
                    function (products) {
                        ctrl.softwareProducts = products;
                    }
                );
            }

            /*
            function populateTicketCategoriesFn() {
                ctrl.TICKET_CATEGORIES = TicketDataFactory.GetTicketCategories();
            }

            function populateTicketCustomerPrioritiesFn() {
                ctrl.TICKET_CUSTOMER_PRIORITIES = TicketDataFactory.GetTicketCustomerPriorities();
            }

            function populateTicketTeamPrioritiesFn() {
                ctrl.TICKET_TEAM_PRIORITIES = TicketDataFactory.GetTicketTeamPriorities();
            }

            function populateTicketStatusFn() {
                ctrl.TICKET_STATUS = TicketDataFactory.GetTicketStates();
            }

            function populateTicketVisibilitiesFn() {
                ctrl.TICKET_VISIBILITIES = TicketDataFactory.GetTicketVisibilities();
            }
            */

            function init() {
                ctrl.userInfo = AuthFactory.getAuthInfo();
                showAssistantsTicketFn(ctrl.userInfo.userId);
                populateProductSoftwareListFn();
/*
                // Popola costanti per le ng-option
                populateTicketCategoriesFn();
                populateTicketCustomerPrioritiesFn();
                populateTicketTeamPrioritiesFn();
                populateTicketStatusFn();
                populateTicketVisibilitiesFn();
                */
            }


            ctrl.downloadAttachedFiles = downloadAttachedFilesFn;
            ctrl.showAssistantsTicket = showAssistantsTicketFn;
            ctrl.updateTicket = updateTicketFn;
            ctrl.checkTicketState = checkTicketStateFn;

            init();
        }

    ]);