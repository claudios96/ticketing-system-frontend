'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */

mainAngularModule
    .factory('TicketDataFactory', ['$http', 'BACKEND_BASE_URL', 'TICKET_ENDPOINT_URL', 'ToasterNotifierHandler',
        function ($http, BACKEND_BASE_URL, TICKET_ENDPOINT_URL, ToasterNotifierHandler) {
            let thisCrudService = {};
            let _endPointJSON = BACKEND_BASE_URL + TICKET_ENDPOINT_URL;

           // init();
/*
            function GetTicketCategoriesFn() {
                return [
                    {
                        value: 0,
                        label: 'Assistenza tecnica'
                    },
                    {
                        value: 1,
                        label: 'Informazioni commerciali'
                    },
                    {
                        value: 2,
                        label: 'Richiesta nuove funzionalità'
                    },
                    {
                        value: 3,
                        label: 'Bugfix'
                    },
                    {
                        value: 4,
                        label: 'Altri servizi'
                    }
                ];
            }

            function GetTicketCustomerPrioritiesFn() {
                return [
                    {
                        value: 0,
                        label: 'Bassa'
                    },
                    {
                        value: 1,
                        label: 'Media'
                    },
                    {
                        value: 2,
                        label: 'Alta'
                    }
                ];
            }

            function GetTicketTeamPrioritiesFn() {
                return [
                    {
                        value: 0,
                        label: 'Bassa'
                    },
                    {
                        value: 1,
                        label: 'Media'
                    },
                    {
                        value: 2,
                        label: 'Alta'
                    }
                ];
            }

            function GetTicketStatusFn() {
                return [
                    {
                        value: 1,
                        label: 'In attesa'
                    },
                    {
                        value: 2,
                        label: 'In esecuzione'
                    },
                    {
                        value: 3,
                        label: 'Scartato'
                    },
                    {
                        value: 4,
                        label: 'Rilasciato'
                    },
                    {
                        value: 5,
                        label: 'Chiuso'
                    },
                ];
            }

            function GetTicketVisibilitiesFn() {
                return [
                    {
                        value: 0,
                        label: 'Pubblica'
                    },
                    {
                        value: 1,
                        label: 'Privata'
                    },
                ];
            }
*/

/*
            function GetTicketCategoriesFn() {
                return self.categories;
            }

            function GetTicketCustomerPrioritiesFn() {
                return self.priorities;
            }

            function GetTicketTeamPrioritiesFn() {
                return self.priorities;
            }

            function GetTicketStatusFn() {
                return self.ticketStatus;
            }

            function GetTicketVisibilitiesFn() {
                return self.visibilities;
            }

            function GetTargetsFn() {
                return self.targets;
            }

            getFields();

            function getFields() {
                TicketDataFactory.getMetadata(function (response) {
                    console.log("Metadata", response.data);
                    self.visibilities= response.data.visibilities;
                    self.categories = response.data.categories;
                    self.priorities = response.data.priorities;
                    self.ticketStatus = response.data.statuses;
                    self.targets = response.data.targets;
                }, function () {
                    alert("Invalid metadata");
                });
            }
            */

            function DownloadAttachedFn(ticketId, successCB, errorCB) {
                $http({
                    url: _endPointJSON + 'attached/' + ticketId,
                    method: 'GET',
                    responseType: 'arraybuffer'
                })
                    .then(function (response) {
                            console.log('RES: ' + response);
                            if (successCB) {
                                successCB(response.data);
                            }
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // get all data from database
            function GetAllFn(successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON
                })
                    .then(function (response) {
                            console.log('RES: ' + response);
                            if (successCB) {
                                successCB(response.data);
                            }
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // get single ticket from database
            function GetSingleFn(ticketId, assistantId, successCB, errorCB) {
                $http({
                    method: 'GET',
                    //url: _endPointJSON + ticketId + '/fromAssistant'
                    url: _endPointJSON + 'ticketByAssignee/' + ticketId
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // get all customer's tickets
            function GetAllTicketsFromCustomerFn(successCB, errorCB) {
                $http({
                    method: 'GET',
                    url: _endPointJSON + 'customer'
                })
                    .then(function (response) {
                            console.log('RES: ' + response);
                            if (successCB) {
                                successCB(response.data);
                            }
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // get all ticket from assistant
            function GetAllTicketsFromAssistantFn(id, successCB, errorCB) {
                $http({
                    method: 'GET',
                    url: _endPointJSON + 'ticketByAssignee/' + id
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // post the data from database
            function InsertFn(ticket, successCB, errorCB) {
                console.log("Ticket: ", ticket);
                $http({
                    method: 'POST',
                    url: _endPointJSON,
                    data: ticket
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                                ToasterNotifierHandler.handleCreation(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // put the data from database
            function UpdateFn(ticket, successCB, errorCB) {
                $http({
                    method: 'PUT',
                    url: _endPointJSON + ticket.id,
                    data: ticket
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                                ToasterNotifierHandler.showSuccessToast('Aggiornamento effettuato con successo');
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // assign ticket to assistant
            function AssignTicketToAssistantFn(ticketId, userId, successCB, errorCB) {
                $http({
                    method: 'PUT',
                    url: _endPointJSON + ticketId + '/assignTo/' + userId
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // assign ticket to assistant
            function UnassignTicketFromAssistantFn(ticketId, userId, successCB, errorCB) {
                $http({
                    method: 'PUT',
                    url: _endPointJSON + ticketId + '/unassignFrom/' + userId
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // delete the data from database
            function RemoveFn(ticketId, successCB, errorCB) {

                $http({
                    method: 'DELETE',
                    url: _endPointJSON + ticketId
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function getMetadata(success, error) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + "metadata"
                })
                    .then(function (response) {
                            success(response);
                        },
                        function (response) {
                            if (error) {
                                error(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        })
            }

            // ritorna il ticket con l'id specificato
            function GetSingleTicketFn(ticketId, successCB, errorCB) {
                $http({
                    method: 'GET',
                    //url: _endPointJSON + ticketId + '/fromAssistant'
                    url: _endPointJSON + ticketId
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }
            /*
            thisCrudService.GetTicketCategories = GetTicketCategoriesFn;
            thisCrudService.GetTicketCustomerPriorities = GetTicketCustomerPrioritiesFn;
            thisCrudService.GetTicketTeamPriorities = GetTicketTeamPrioritiesFn;
            thisCrudService.GetTicketStates = GetTicketStatusFn;
            thisCrudService.GetTicketVisibilities = GetTicketVisibilitiesFn;
            thisCrudService.GetTargets = GetTargetsFn;
            */

            thisCrudService.GetAll = GetAllFn;
            thisCrudService.GetSingle = GetSingleFn;
            thisCrudService.GetAllTicketsFromAssistant = GetAllTicketsFromAssistantFn;
            thisCrudService.GetAllTicketsFromCustomer = GetAllTicketsFromCustomerFn;
            thisCrudService.Insert = InsertFn;
            thisCrudService.Update = UpdateFn;
            thisCrudService.AssignTicketToAssistant = AssignTicketToAssistantFn;
            thisCrudService.UnassignTicketFromAssistant = UnassignTicketFromAssistantFn;
            thisCrudService.Remove = RemoveFn;
            thisCrudService.DownloadAttached = DownloadAttachedFn;
            thisCrudService.getMetadata = getMetadata;

            thisCrudService.GetSingleTicket = GetSingleTicketFn;

            return thisCrudService;
        }]);

