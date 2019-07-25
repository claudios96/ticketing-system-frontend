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
    .factory('PlanningDataFactory', ['$http', 'BACKEND_BASE_URL', 'USER_ENDPOINT_URL', 'ToasterNotifierHandler', '$state',
        function ($http, BACKEND_BASE_URL, USER_ENDPOINT_URL, ToasterNotifierHandler, $state) {
            let thisCrudService = {};
            //thisCrudService.user = {};
            //let _endPointJSON = BACKEND_BASE_URL + USER_ENDPOINT_URL;


            thisCrudService.getTicketsForRel = getTicketsForRel;
            thisCrudService.newRelation = newRelation;
            thisCrudService.escalation = escalation;
            thisCrudService.getAllRel = getAllRel;
            thisCrudService.getTicketForDep = getTicketForDep;
            thisCrudService.getTicketForReg = getTicketForReg;
            thisCrudService.getTicketForEqual = getTicketForEqual;
            thisCrudService.putRelationEqual = putRelationEqual;
            thisCrudService.putRelationDep = putRelationDep;
            thisCrudService.putRelationRegression = putRelationRegression;
            thisCrudService.putRelationCustom = putRelationCustom;
            thisCrudService.getQueue = getQueue;
            thisCrudService.getRelationTicket = getRelationTicket;
            thisCrudService.getRelationCustomTicket = getRelationCustomTicket;
            thisCrudService.getTicketGantt = getTicketGantt;
            thisCrudService.getPlanning =getPlanning;
            thisCrudService.getFatherTicket = getFatherTicket;
            thisCrudService.getTickets = getTickets;
            thisCrudService.getDetailsTicket = getDetailsTicket;
            thisCrudService.getTeamsByTeamMember = getTeamsByTeamMember;

            // delete the data from database
            function getTicketsForRel(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/findTicketForCreateEquality",
                    url: "http://localhost/ticketingsystem/tickets/findTicketForCreateEquality",

                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.showErrorToast("Error in get tickets for relation");
                        });
            }





            function getFatherTicket(data, id, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost/ticketingsystem/tickets/findFatherTicket/" + id,
                   // url: "http://172.20.0.50:8200/ticketingsystem/tickets/findFatherTicket/" + id,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
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


            function getPlanning(data,teamName,date,durat,idtick, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: "http://localhost/ticketingsystem/gantt/createGanttInstance/" + teamName + "/"+ date +"/"+ durat +"/"+idtick,
                   // url: "http://172.20.0.50:8200/ticketingsystem/gantt/createGanttInstance/" + teamName + "/"+ date +"/"+ durat +"/"+idtick,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
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
            function getTicketGantt(data, team, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost/ticketingsystem/tickets/findTicketForGantt/" + team,
                   // url: "http://172.20.0.50:8200/ticketingsystem/tickets/findTicketForGantt/" + team,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
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
            function getRelationCustomTicket(data,ticketId, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost/ticketingsystem/relationInstance/findRelations/" + ticketId,

//                    url: "http://172.20.0.50:8200/ticketingsystem/relationInstance/findRelations/" + ticketId,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
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
            function getRelationTicket(data, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost/ticketingsystem/relation",

                    //url: "http://172.20.0.50:8200/ticketingsystem/relation",
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
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
            function getQueue(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost/ticketingsystem/tickets/findTicketInQueue",

                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/findTicketInQueue",
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting pending ticket");
                        });
            }



            function putRelationCustom(data, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: "http://localhost/ticketingsystem/relationInstance/" + data.relation.name + "/" + data.fatherTicket.id + "/" + data.sonTicket.id,

                   // url: "http://172.20.0.50:8200/ticketingsystem/relationInstance/" + data.relation.name + "/" + data.fatherTicket.id + "/" + data.sonTicket.id,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            if (response.status === 201) {
                                ToasterNotifierHandler.showSuccessToast("Operation success", "Relation correctly created!");
                                $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            } else if (response.status === 208) {
                                ToasterNotifierHandler.showSuccessToast("Operation success", "Relation already exist!");
                                $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            }

                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            console.log(response);
                            //ToasterNotifierHandler.handleError(response);
                            if (response.status === 424) {
                                if (response.data.length === 0) {
                                    ToasterNotifierHandler.showErrorToast("Reflective relation is forbidden");
                                    $state.go('ticket.list', {}, {reload: 'ticket.list'});
                                } else {
                                    var cicle = "" + response.data[0].id;
                                    for (var i = 1; i < response.data.length; i++) {
                                        cicle += ", " + response.data[i].id;
                                    }
                                    ToasterNotifierHandler.showErrorToast("Creation failed due to this cycle: " + cicle);
                                }
                            }
                        });
            }


            // delete the data from database
            function putRelationRegression(data,choose,idChoose, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: "http://localhost:8200/ticketingsystem/tickets/addRegression/" + choose + "/" + idChoose,

                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/addRegression/" + choose + "/" + idChoose,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            ToasterNotifierHandler.showSuccessToast("Operation success", "Relation correctly created!");
                            $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            if (response.status === 424) {
                                ToasterNotifierHandler.showErrorToast("cannot create regression with the same ticket ");
                            }
                        });
            }




            // delete the data from database
            function putRelationDep(data,choose,idChoose, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: "http://localhost:8200/ticketingsystem/tickets/addDependentTicket/"+ idChoose + "/" + choose,

                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/addDependentTicket/"+ idChoose + "/" + choose,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            ToasterNotifierHandler.showSuccessToast("Operation success", "Relation correctly created!");
                            $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            if (response.status === 424) {
                                if (response.data.length === 0) {
                                    ToasterNotifierHandler.showErrorToast("Reflective relation is forbidden");
                                } else {
                                    var cicle = "" + response.data[0].id;
                                    for (var i = 1; i < response.data.length; i++) {
                                        cicle += ", " + response.data[i].id;
                                    }
                                    ToasterNotifierHandler.showErrorToast("Creation failed due to this cycle: " + cicle);
                                }
                            }
                        });
            }


            // delete the data from database
            function putRelationEqual(data,choose, successCB, errorCB) {

                $http({
                    method: 'PUT',
                    url: "http://localhost:8200/ticketingsystem/tickets/addEqualityTicket/"+ choose + "/" + data.sameTicket.id,

                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/addEqualityTicket/"+ choose + "/" + data.sameTicket.id,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            ToasterNotifierHandler.showSuccessToast("Operation success", "Relation correctly created!");
                            $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);

                            if (response.status === 424) {
                                ToasterNotifierHandler.showErrorToast("Cannot create equality with the same ticket");
                            } else {
                                ToasterNotifierHandler.showErrorToast("Error in creation");
                            }
                        });
            }


            // delete the data from database
            function getTicketForEqual(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost:8200/ticketingsystem/tickets/findTicketForCreateEquality",

                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/findTicketForCreateEquality",
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting tickets");
                        });
            }


            // delete the data from database
            function getTicketForReg(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://loclhost:8200/ticketingsystem/tickets/findTicketForCreateRegression",

                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/findTicketForCreateRegression",
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting tickets");
                        });
            }

            // delete the data from database
            function getTicketForDep(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost:8200/ticketingsystem/tickets/findTicketForCreateDependency",

                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/findTicketForCreateDependency",
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting tickets");
                        });
            }


            // delete the data from database
            function getAllRel(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost:8200/ticketingsystem/relation",

                    //url: "http://172.20.0.50:8200/ticketingsystem/relation",
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting relations");
                        });
            }


            // delete the data from database
            function escalation(data, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: "http://localhost:8200/ticketingsystem/escalation",

                    //url: "http://172.20.0.50:8200/ticketingsystem/escalation",
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
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
            function newRelation(data, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: "http://localhost:8200/ticketingsystem/relation/"+ data.name,

                    //url: "http://172.20.0.50:8200/ticketingsystem/relation/"+ data.name,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
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

            function getTickets(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: "http://localhost/ticketingsystem/tickets",

//                    url: "http://172.20.0.50:8200/ticketingsystem/tickets",
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
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


            function getDetailsTicket(data,idTicket, successCB, errorCB) {
                //alert("http://172.20.0.50:8200/ticketingsystem/tickets/" + idTicket);
                $http({
                    method: "GET",
                    url: "http://localhost/ticketingsystem/tickets/" + idTicket,

                    //url: "http://172.20.0.50:8200/ticketingsystem/tickets/" + idTicket,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in get tickets");
                        });
            }



            function getTeamsByTeamMember(username, successCB, errorCB) {
                $http({
                    method: "GET",
                    url: "http://localhost/ticketingsystem/teams/findAllTeamsByPerson/" + username,

                   // url: "http://172.20.0.50:8200/ticketingsystem/teams/findAllTeamsByPerson/" + username,
                    //params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in get teams by team member");
                        });
            }


            return thisCrudService;
        }]);



