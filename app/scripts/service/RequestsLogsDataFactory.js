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
    .factory('RequestsLogsDataFactory', ['$http', 'BACKEND_BASE_URL', 'REQUESTS_LOGS_ENDPOINT_URL', 'ToasterNotifierHandler',
        function ($http, BACKEND_BASE_URL, REQUESTS_LOGS_ENDPOINT_URL, ToasterNotifierHandler) {

            let _endPointJSON = BACKEND_BASE_URL + REQUESTS_LOGS_ENDPOINT_URL;
            let thisCrudService = {};
            thisCrudService.GetAll = GetAllFn;
            thisCrudService.Remove = RemoveFn;
            thisCrudService.RemoveAll = RemoveAllFn;

            // Get all requests logs from database
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


            // Delete request log from database
            function RemoveFn(requestLogId, successCB, errorCB) {

                $http({
                    method: 'DELETE',
                    url: _endPointJSON + requestLogId
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


            // Delete all records from database
            function RemoveAllFn(successCB, errorCB) {

                $http({
                    method: 'DELETE',
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


            return thisCrudService;
        }]);