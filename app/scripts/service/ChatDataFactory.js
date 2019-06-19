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
    .factory('ChatDataFactory', ['$http', 'BACKEND_BASE_URL', 'CHAT_ENDPOINT_URL', 'ToasterNotifierHandler',
        function ($http, BACKEND_BASE_URL, CHAT_ENDPOINT_URL, ToasterNotifierHandler) {


            var thisService = {};

            var _endPointJSON = BACKEND_BASE_URL + CHAT_ENDPOINT_URL;

            thisService.InsertMsg = InsertFn;
            thisService.GetMsgs = GetMsgsFn;


            function GetMsgsFn(username, type, id, successCB, errorCB) {

                console.log("ChatDataFactory", "getMsgsFn()")

                $http({
                    method: 'GET',
                    url: _endPointJSON + "msgs",
                    params: {'type' : type,
                            'subject_id' : id,
                            'username' : username}
                })
                    .then(function (response) {
                            console.log(response);
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


            function InsertFn(userId, text, chatId, successCB, errorCB) {

                console.log("ChatDataFactory", "insertFn()");

                $http({
                    method: 'PUT',
                    url: _endPointJSON + "putmsg",
                    params: {'chat_id' : chatId,
                            'user_id' : userId,
                            'text' : text}
                })
                    .then(function (response) {
                            if (successCB) {
                                console.log(response.data)
                                successCB(response.data);
                                ToasterNotifierHandler.handleCreation(response);
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


            return thisService;
        }]);