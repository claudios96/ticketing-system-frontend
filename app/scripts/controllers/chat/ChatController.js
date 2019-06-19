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
        'DTColumnDefBuilder', 'AclService', 'httpService', 'BACKEND_BASE_URL', '$mdDialog', 'myService',
        function ($scope, $state, $stateParams, AuthFactory, ChatDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder, AclService, httpService, BACKEND_BASE_URL, $mdDialog, myService) {

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
                ctrl.subjsct_id = $stateParams.chatId;
                ctrl.type = $stateParams.chatType;


                console.log("ChatController", "init()")


                if (ctrl.subjsct_id != null) {

                    chatData = {
                        'username': ctrl.userInfo.username,
                        'type': ctrl.type,
                        'subject_id': ctrl.subjsct_id
                    };

                    refreshChatFn(chatData);
                    connect();
                }

            }



            function  sendMessageFn() {
                var params = [Number(ctrl.id), Number(ctrl.userInfo.userId), String(ctrl.messageContent)];

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

                var userID = ctrl.userInfo.userId;

                var chatID = ctrl.id;

                myService.dataObj = {
                    'userID': userID,
                    'chatID': chatID
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

            ctrl.CheckIfChatExists = CheckIfChatExistsFn;



            ctrl.sendMessage = sendMessageFn;
            ctrl.showTicketDetail = showTicketDetailFn;


            init();

        }]);

