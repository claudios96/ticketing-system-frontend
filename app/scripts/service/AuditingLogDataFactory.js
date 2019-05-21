'use strict';

mainAngularModule
    .factory('AuditingLogDataFactory', ['$http', 'BACKEND_BASE_URL', 'AUDITING_ENDPOINT_URL',
        function ($http, BACKEND_BASE_URL, AUDITING_ENDPOINT_URL) {

            var thisCrudService = {};

            var _endPointJSON = BACKEND_BASE_URL + AUDITING_ENDPOINT_URL;

            thisCrudService.GetAll = GetAllFn;
            thisCrudService.Remove = RemoveFn;
            thisCrudService.RemoveAll = RemoveAllFn;

            function GetAllFn(successCB, errorCB) {
                $http({
                    method: 'GET',
                    url: _endPointJSON
                }).then(function (auditing_logs) {
                    if (successCB) {
                        successCB(auditing_logs.data);
                    }
                }, function (error) {
                    if (errorCB) {
                        errorCB(error);
                    }
                });
            }

            function RemoveFn(id, successCB, errorCB) {
                console.log('deleting record with id: ' + id);
                $http({
                    method: 'DELETE',
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