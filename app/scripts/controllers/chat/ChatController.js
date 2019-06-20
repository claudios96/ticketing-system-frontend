'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

mainAngularModule
    .controller('ChatCtrl', ['$scope','$state', '$stateParams', 'AuthFactory', 'ChatDataFactory', 'ErrorStateRedirector', 'DTOptionsBuilder',
        'DTColumnDefBuilder', 'AclService', 'httpService', 'BACKEND_BASE_URL', '$mdDialog', 'myService', 'util',
        function ($scope, $state, $stateParams, AuthFactory, ChatDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder, AclService, httpService, BACKEND_BASE_URL, $mdDialog, myService, util) {

            var ctrl = this;
            var chatData;
            var stompClient = null;
            ctrl.messages = [];

            var websocketPath = BACKEND_BASE_URL;

            function refreshChatFn(chatData) {
                console.log('refresh chat');

                ChatDataFactory.GetMsgs(chatData.username, chatData.type, chatData.subject_id,
                    function (response) {

                        ctrl.messages = response.messages;
                        ctrl.id = response.id;

                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei messaggi"});
                    });
            }

            function connect() {

                var socket;

                socket = new SockJS(websocketPath + '/chat-websocket');
                stompClient = Stomp.over(socket);

                stompClient.connect({}, function(frame) {
                    console.log('DEBUG: Connected: ' + frame);
                    stompClient.subscribe('/t/' + chatData.type + '/' + chatData.subject_id, function(response) {
                        ctrl.messages.push(JSON.parse(response.body));
                        $scope.$apply();
                    });
                });
            }


            function init() {
                ctrl.userInfo = AuthFactory.getAuthInfo();
                ctrl.subject_id = $stateParams.chatId;
                ctrl.type = $stateParams.chatType;


                console.log("ChatController", "init()")


                if (ctrl.subject_id != null) {

                    chatData = {
                        'username': ctrl.userInfo.username,
                        'type': ctrl.type,
                        'subject_id': ctrl.subject_id
                    };

                    refreshChatFn(chatData);
                    connect();
                }

            }



            function  sendMessageFn() {
                var params = [Number(ctrl.id), Number(ctrl.userInfo.userId), String(ctrl.messageContent), String('MESSAGE')];

                console.log('insert message');
                // Don't send an empty message
                if (!ctrl.messageContent || ctrl.messageContent === '') {
                    return;
                }

                console.log("ChatController", "send()")
                console.log("user_id", ctrl.userInfo.userId)
                console.log("text", ctrl.messageContent)
                console.log("chat_id", ctrl.id)


                stompClient.send(BACKEND_BASE_URL + '/c/' + chatData.type + '/' + chatData.subject_id, {}, params.toString());
/*
                ChatDataFactory.InsertMsg(Number(ctrl.userInfo.userId), String(ctrl.messageContent), Number(ctrl.id),
                    function (response) {
                        console.log(response);
                        ctrl.messages.push(response);

                    }, function (response) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella scrittura del messaggio"})
                    });
*/
                // Reset the messageContent input
                ctrl.messageContent = '';

                //setTimeout(refreshChatFn(chatData), 1000);

            }


            // funzione che mostra la pagina di dettaglio del ticket
            // TODO : si può migliorare la ricerca del pattern tramite un match su 'ID: * '
            function showTicketDetailFn(id) {

                // estrapolo dalla stringa l'id del ticket
                var pos = id.indexOf("ID:");
                var ticketID = id.substr(pos+4, id.length);
                console.log('Visualizza il dettaglio del ticket ',ticketID);

                $state.go('ticket.detail', {'ticketID': ticketID});

            }

            $scope.showDialogInsertSnippet = function() {

                myService.dataObj = {
                    'userID': ctrl.userInfo.userId,
                    'chatID': ctrl.id,
                    'type': ctrl.type,
                    'subject_id': ctrl.subject_id
                };

                $mdDialog.show({
                    controller: 'DialogInsertSnippetController',
                    templateUrl: 'views/chat/dialogInsertSnippet.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true

                });
            };


            $scope.showDialogSnippetDetail = function(snippetName) {
                myService.dataObj = {
                    'snippetName': snippetName
                };

                $mdDialog.show({
                    controller: 'DialogShowSnippetController',
                    templateUrl: 'views/chat/dialogShowSnippet.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true

                });
            }

            function CheckIfChatExistsFn(ticketID) {
                console.log('CheckIfChatExists chat, ticketID: ', ticketID);

                ChatDataFactory.ChatExists(ticketID,
                    function (response) {
                        console.log('"---> RESPONSO : ', ticketID, '-',response);

                        return response.data;

                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({
                            Messaggio: 'Errore in CheckIfChatExists :', error});
                    });


            }

            /**
             * @ngdoc           function
             * @name            selectedFile
             * @description     Function converts a file in base64 string.
             *
             * @param event     event containing the file
             */
            $scope.selectedFile = function (event) {
                util.getBase64(event.target.files[0])
                    .then(result => {
                    //file = result;
                    console.log('event', event);
                uploadFileFn(event.target.files[0].name, result);
            })
            };


            /**
             * @ngdoc               function
             * @name                upload
             * @description         Rest Service to POST the uploaded file.
             *
             * @param file  the file to be saved
             */

            function uploadFileFn(filename, file) {

                console.log('uploadFn()', file);

              /*  var params = [Number(ctrl.id), Number(ctrl.userInfo.userId), String(ctrl.messageContent), String('FILE')];
                TODO togliere commento

                stompClient.send(BACKEND_BASE_URL + '/c/' + chatData.type + '/' + chatData.subject_id, {}, params.toString());
                */





/*
                ChatDataFactory.InsertMsg(ctrl.userInfo.userId, filename, ctrl.id, "FILE",
                    function (response) {
                        console.log(response);
                        ctrl.messages.push(response);

                    }, function (response) {
                        //ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella scrittura del messaggio"})
                    });
*/

                ChatDataFactory.UploadFile( file, ctrl.id,  filename,
                    function (response) {
                        console.log(response);

                        window.alert('file uploaded');

                        //getFileFn(ctrl.id, filename);

                        //$state.reload();

                    }, function () {
                        //ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'upload del file"})
                    });

                // TODO : remove   usato per testing
                ChatDataFactory.GetFile(ctrl.id, filename, function (response) {
                    console.log('---->',response);

                    //getFileFn(ctrl.id, filename);

                    //$state.reload();

                }, function () {
                    //ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'upload del file"})
                });



            }

            function getFileFn(chatId, filename) {

                ChatDataFactory.GetFile(chatId, filename,
                    function (response) {
                        console.log(response);

                        console.log('getFileFn()', response);

                    }, function (response) {
                        //ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel caricamento del file"})
                    });

            }


            ctrl.CheckIfChatExists = CheckIfChatExistsFn;
            ctrl.sendMessage = sendMessageFn;
            ctrl.showTicketDetail = showTicketDetailFn;
            ctrl.uploadFile = uploadFileFn;
            ctrl.getFile = getFileFn();

            init();

        }]);

