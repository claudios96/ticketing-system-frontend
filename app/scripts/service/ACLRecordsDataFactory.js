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
    .factory('ACLRecordsDataFactory', ['$http', 'BACKEND_BASE_URL', 'ACL_RECORDS_ENDPOINT_URL', 'ToasterNotifierHandler',
        function ($http, BACKEND_BASE_URL, ACL_RECORDS_ENDPOINT_URL, ToasterNotifierHandler) {


            let _endPointJSON = BACKEND_BASE_URL + ACL_RECORDS_ENDPOINT_URL;
            let thisCrudService = {};
            thisCrudService.GetAll = GetAllFn;
            thisCrudService.Remove = RemoveFn;
            thisCrudService.RemoveAll = RemoveAllFn;


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


            // Delete record from database
            function RemoveFn(recordId, successCB, errorCB) {

                $http({
                    method: 'DELETE',
                    url: _endPointJSON + recordId
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