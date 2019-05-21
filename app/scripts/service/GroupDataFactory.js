'use strict';


mainAngularModule
    .factory('GroupDataFactory', ['$http', 'BACKEND_BASE_URL', 'GROUP_ENDPOINT_URL', 'ToasterNotifierHandler', '$q',
        function ($http, BACKEND_BASE_URL, GROUP_ENDPOINT_URL, ToasterNotifierHandler, $q) {

            var thisCrudService = {};
            var _endPointJSON = BACKEND_BASE_URL + GROUP_ENDPOINT_URL;

            thisCrudService.GetAll = GetAllFn;
            thisCrudService.GetSingle = GetSingleFn;
            thisCrudService.Insert = InsertFn;
            thisCrudService.Update = UpdateFn;
            thisCrudService.Remove = RemoveFn;

            thisCrudService.GetCompleteGroup = GetCompleteGroupFn;

            thisCrudService.GetAuthoritiesByGroupID = GetAuthoritiesByGroupIDFn;
            thisCrudService.GetUsersByGroupID = GetUsersByGroupIDFn;

            thisCrudService.BuildGroup = BuildGroupFn;


            function GetCompleteGroupFn(groupId, successCB, errorCB) {

                let completeGroup = {};

                let groupProm = $q.defer();
                GetSingleFn(groupId, function (group) {
                    groupProm.resolve(group);
                }, function (error) {
                    groupProm.reject(error);
                });

                let sidsProm = $q.defer();
                GetAuthoritiesByGroupIDFn(groupId, function (sids) {
                    sidsProm.resolve(sids);
                }, function (error) {
                    sidsProm.reject(error);
                });

                let membersProm = $q.defer();
                GetUsersByGroupIDFn(groupId, function (members) {
                    membersProm.resolve(members);
                }, function (error) {
                    membersProm.reject(error);
                });

                $q.all([groupProm.promise, sidsProm.promise, membersProm.promise]).then(function (results) {
                    completeGroup = results[0];
                    completeGroup.sids = results[1];
                    completeGroup.members = results[2];
                    if (successCB) {
                        successCB(completeGroup);
                    }
                }, function (error) {
                    if (errorCB) {
                        errorCB(error);
                    }
                    ToasterNotifierHandler.showErrorToast(error);
                })

            }

            function GetAuthoritiesByGroupIDFn(groupId, successCB, errorCB) {
                $http({
                    method: 'GET',
                    url: _endPointJSON + groupId + '/authorities/'
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

            function GetUsersByGroupIDFn(groupId, successCB, errorCB) {
                $http({
                    method: 'GET',
                    url: _endPointJSON + groupId + '/users/'
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

            function GetAllFn(successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON
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


            function GetSingleFn(id, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + id
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


            function InsertFn(group, successCB, errorCB) {

                delete group.sids;
                delete group.members;

                $http({
                    method: 'POST',
                    url: _endPointJSON,
                    data: group
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


            function UpdateFn(group, successCB, errorCB) {

                $http({
                    method: 'PUT',
                    url: _endPointJSON + group.id,
                    data: group
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


            function RemoveFn(id, successCB, errorCB) {

                $http({
                    method: 'DELETE',
                    url: _endPointJSON + id
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            ToasterNotifierHandler.showSuccessToast("Eliminazione avvenuta con successo", "")
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function BuildGroupFn(group, successCB, errorCB) {
                // currentGroup = {
                //     "name": "",
                //     "sids": [],
                //     "members": []
                // };
                let authoritiesList = [];
                if (group.sids.length === 0) {
                    authoritiesList.push(0);
                } else {
                    group.sids.forEach(function (sid) {
                        authoritiesList.push(sid.id);
                    });
                }

                let usersList = [];
                if (group.members.length === 0) {
                    usersList.push(0);
                } else {
                    group.members.forEach(function (sid) {
                        usersList.push(sid.id);
                    });
                }

                let ep = _endPointJSON + group.id + '/authorities/' + authoritiesList.join() + '/users/' + usersList.join();
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