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
    .factory('UserDataFactory', ['$http', 'BACKEND_BASE_URL', 'USER_ENDPOINT_URL', 'ToasterNotifierHandler',
        function ($http, BACKEND_BASE_URL, USER_ENDPOINT_URL, ToasterNotifierHandler) {
            let thisCrudService = {};
            thisCrudService.user = {};
            let _endPointJSON = BACKEND_BASE_URL + USER_ENDPOINT_URL;


            thisCrudService.GetAll = GetAllFn;
            thisCrudService.GetSingle = GetSingleFn;
            thisCrudService.Insert = InsertFn;
            thisCrudService.Update = UpdateFn;
            thisCrudService.Remove = RemoveFn;
            thisCrudService.GetGroupByUserID = GetGroupByUserIDFn;
            thisCrudService.metadata = getMetadata;
            thisCrudService.GetSelf = GetSelf;

            thisCrudService.user = null;


            function getMetadata(success, error) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + "metadata"
                })
                    .then(function (response) {
                        console.log("succe", response);
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

            // get all data from database
            function GetAllFn(successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON
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

            function GetSingleFn(id, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + id
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


            function GetSelf(successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + "self"
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

            // get info user
            function GetGroupByUserIDFn(id, successCB, errorCB) {
                let ep = _endPointJSON + id + '/groups/';
                console.log(ep);
                $http({
                    method: 'GET',
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

            // post the data from database
            function InsertFn(user, successCB, errorCB) {
console.log("insertFN", user);
                $http({
                    method: 'POST',
                    url: _endPointJSON,
                    data: user
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
                                errorCB(response.data);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // put the data from database
            function UpdateFn(user, successCB, errorCB) {

                $http({
                    method: 'PUT',
                    url: _endPointJSON + user.id,
                    data: user
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
            function RemoveFn(userId, successCB, errorCB) {

                $http({
                    method: 'DELETE',
                    url: _endPointJSON + userId
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

