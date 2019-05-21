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
    .factory('RegistrationFactory', ['$state', '$http', 'BACKEND_BASE_URL', 'REGISTRATION_ENDPOINT_URL', 'authManager',
        '$sessionStorage', 'ToasterNotifierHandler', 'AclService',
        function ($state, $http, BACKEND_BASE_URL, REGISTRATION_ENDPOINT_URL, $sessionStorage, ToasterNotifierHandler) {

            let thisAuthService = {};

            let _endPointJSON = BACKEND_BASE_URL + REGISTRATION_ENDPOINT_URL;

            thisAuthService.sendRegistration = sendRegistrationFn;


            function sendRegistrationFn(registrationInfo, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: _endPointJSON,
                    skipAuthorization: true,
                    data: registrationInfo
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


            return thisAuthService;
        }]);

