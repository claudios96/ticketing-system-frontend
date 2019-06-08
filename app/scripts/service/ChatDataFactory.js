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
                console.log("ChatDataFactory", username)
                console.log("ChatDataFactory", type)
                console.log("ChatDataFactory", id)

                $http({
                    method: 'GET',
                    url: _endPointJSON,
                    params: {'username' : username,
                            'type' : type,
                            'subject_id' : id}
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

                console.log("ChatDataFactory", "insertFn()")
                console.log("ChatDataFactory", userId)
                console.log("ChatDataFactory", text)
                console.log("ChatDataFactory", chatId)

                $http({
                    method: 'POST',
                    url: _endPointJSON,
                    data: {'user_id' : userId,
                            'text' : text,
                            'chat_id' : chatId}
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


            return thisService;
        }]);