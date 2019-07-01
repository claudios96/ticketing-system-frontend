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
            var stompClient = null;

            var _endPointJSON = BACKEND_BASE_URL + CHAT_ENDPOINT_URL;

            thisService.InsertMsg = InsertFn;
            thisService.GetMsgs = GetMsgsFn;
            thisService.ChatExists = ChatExistsFn;
            thisService.UploadFile = UploadFileFn;
            thisService.GetFile = GetFileFn;

            function GetMsgsFn(username, type, id, successCB, errorCB) {

                console.log("ChatDataFactory", "getMsgsFn()");

                $http({
                    method: 'GET',
                    url: _endPointJSON + "msgs",
                    params: {'type' : type,
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


            function ChatExistsFn(ticketID, successCB, errorCB) {

                console.log('ChatDataFactory', 'CheckIfChatExists()');

                $http({
                    method: 'GET',
                    url: _endPointJSON + 'exists',
                    params: {
                        'ticket_id': ticketID
                    }
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


            function UploadFileFn(data, chatId,  filename,  successCB, errorCB) {
                console.log('ChatDataFactory', 'UploadFileFn()');

                $http({
                    method: 'POST',
                    url: _endPointJSON + 'uploadFile',
                    params: {
                        'chat_id': chatId,
                        'filename': filename
                    },
                    data : data
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

            function GetFileFn(chatId, filename,successCB, errorCB) {
                console.log('ChatDataFactory', 'GetFileFn()');

                $http({
                    method: 'GET',
                    url: _endPointJSON + 'getFile',
                    params: {
                        'chat_id': chatId,
                        'filename': filename
                    }
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
            return thisService;
        }]);