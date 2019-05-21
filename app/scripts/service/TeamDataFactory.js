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
    .factory('TeamDataFactory', ['$http', 'ToasterNotifierHandler', 'BACKEND_BASE_URL', 'TEAM_ENDPOINT_URL', '$q',
        function ($http, ToasterNotifierHandler, BACKEND_BASE_URL, TEAM_ENDPOINT_URL, $q) {
            var thisCrudService = {};

            var _endPointJSON = BACKEND_BASE_URL + TEAM_ENDPOINT_URL;

            thisCrudService.GetAll = GetAllFn;
            thisCrudService.GetSingle = GetSingleFn;
            thisCrudService.Insert = InsertFn;
            thisCrudService.Update = UpdateFn;
            thisCrudService.Remove = RemoveFn;

            thisCrudService.BuildTeam = BuildTeamFn;
            thisCrudService.GetAssistantsByTeamID = GetAssistantsByTeamIDFn;
            thisCrudService.GetCompleteTeam = GetCompleteTeamFn;


            // get all data from database
            function GetAllFn(successCB, errorCB) {

               // alert("team get all fn: " + _endPointJSON);
                $http({
                    method: 'GET',
                    url: _endPointJSON,
                   //url: 'http://localhost:8200/ticketingsystem/users',
                   // url: 'http://localhost:8200/ticketingsystem/teams'
                })
                    .then(function (response) {
                        console.log(response);
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

            //TODO usare questa versione

            function GetSingleFn(id, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + id
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                                ToasterNotifierHandler.handleCreation(response)
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
            function InsertFn(team, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: _endPointJSON,
                    data: team
                })
                    .then(function (response) {
                            if (successCB) {
                                console.log(response.data)
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
            function UpdateFn(team, successCB, errorCB) {

                delete team.teamLeader;
                $http({
                    method: 'PUT',
                    url: _endPointJSON + team.id,
                    data: team
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
            function RemoveFn(teamId, successCB, errorCB) {

                $http({
                    method: 'DELETE',
                    url: _endPointJSON + teamId
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            ToasterNotifierHandler.showSuccessToast("Eliminazione effettuata con successo", "")
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

            function GetAssistantsByTeamIDFn(teamID, successCB, errorCB) {


                $http({
                    method: 'GET',
                    url: _endPointJSON + teamID + '/assistants/'
                })
                    .then(function (response) {
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

            function GetCompleteTeamFn(teamID, successCB, errorCB) {
                let resultTeam = {};
                let teamProm = $q.defer();
                GetSingleFn(teamID,
                    function (team) {
                        teamProm.resolve(team);
                    },
                    function (error) {
                        teamProm.reject(error);
                    })
                let assistantsProm = $q.defer();
                GetAssistantsByTeamIDFn(teamID,
                    function (assistants) {
                        assistantsProm.resolve(assistants);
                    },
                    function (error) {
                        assistantsProm.reject(error);
                    })

                $q.all([teamProm.promise, assistantsProm.promise]).then(function (results) {
                    resultTeam = results[0];
                    resultTeam.teamMembers = results[1];
                    if (successCB) {
                        successCB(resultTeam);
                    }
                }, function (results) {
                    if (errorCB) {
                        errorCB(results);
                    }
                    ToasterNotifierHandler.showErrorToast(results);
                })


            }

            function BuildTeamFn(team, successCB, errorCB) {

                let assistantsList = [];
                if (team.teamMembers.lenght === 0) {
                    assistantsList.push(0);
                } else {
                    team.teamMembers.forEach(function (member) {
                        assistantsList.push(member.id);
                    })
                }

                let ep = _endPointJSON + team.id + '/leader/' + team.teamLeader.id + '/assistants/' + assistantsList.join();
                $http({
                    method: 'PUT',
                    url: ep
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

            return thisCrudService;
        }]);

