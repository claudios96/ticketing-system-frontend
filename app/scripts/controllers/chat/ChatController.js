'use strict';


mainAngularModule
    .controller('ChatCtrl', ['$scope','$state', '$stateParams', 'AuthFactory', 'ChatDataFactory', 'ErrorStateRedirector', 'DTOptionsBuilder',
        'DTColumnDefBuilder', 'AclService', 'httpService', 'BACKEND_BASE_URL', '$mdDialog', 'myService', 'util', '$location', '$anchorScroll', 'ToasterNotifierHandler',
        function ($scope, $state, $stateParams, AuthFactory, ChatDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder,
                  AclService, httpService, BACKEND_BASE_URL, $mdDialog, myService, util, $location, $anchorScroll, ToasterNotifierHandler) {

            var ctrl = this;
            var chatData;
            ctrl.messages = [];
            var websocketPath = BACKEND_BASE_URL;

            //aggiornamento della lista dei messaggi
            function refreshChatFn(chatData) {
                console.log('refresh chat');

                ChatDataFactory.GetMsgs(chatData.username, chatData.type, chatData.subject_id,
                    function (response) {

                        ctrl.messages = response.messages;
                        ctrl.id = response.id;

                        setTimeout(scrollToBottomFn(), 500);


                    }, function () {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei messaggi"});
                    });

            }

            //connessione alla socket
            function connect() {

                var socket;

                socket = new SockJS(websocketPath + '/chat-websocket');
                ChatDataFactory.stompClient = Stomp.over(socket);

                ChatDataFactory.stompClient.connect({}, function(frame) {
                    console.log('DEBUG: Connected: ' + frame);
                    setTimeout(function() {
                        ChatDataFactory.stompClient.subscribe('/t/' + chatData.type + '/' + chatData.subject_id, function (response) {
                            ctrl.messages.push(JSON.parse(response.body));
                            $scope.$apply();
                            scrollToBottomFn();
                        });
                    }, 1000);
                });

            }


            //inizializzazione della view
            function init() {
                ctrl.userInfo = AuthFactory.getAuthInfo();
                ctrl.subject_id = $stateParams.chatId;
                ctrl.type = $stateParams.chatType;


                console.log("ChatController", "init()");


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


            //invio di messaggi testuali
            function  sendMessageFn() {
                var params = [Number(ctrl.id), Number(ctrl.userInfo.userId), String('MESSAGE'), String(ctrl.messageContent)];

                console.log('insert message');
                // Don't send an empty message
                if (!ctrl.messageContent || ctrl.messageContent === '') {
                    return;
                }

                console.log("ChatController", "send()");
                console.log("user_id", ctrl.userInfo.userId);
                console.log("text", ctrl.messageContent);
                console.log("chat_id", ctrl.id);


                ChatDataFactory.stompClient.send(BACKEND_BASE_URL + '/c/' + chatData.type + '/' + chatData.subject_id, {}, JSON.stringify(params));

                // Reset the messageContent input
                ctrl.messageContent = '';

            }


            // funzione che mostra la pagina di dettaglio del ticket
            function showTicketDetailFn(id) {

                // estrapolo dalla stringa l'id del ticket
                var pos = id.indexOf("ID:");
                var ticketID = id.substr(pos+4, id.length);
                console.log('Visualizza il dettaglio del ticket ',ticketID);

                myService.dataObj = {
                    'ticketID': ticketID
                };

                $mdDialog.show({
                    controller: 'DialogTicketDetailController',
                    controllerAs: 'ctrl',
                    templateUrl: 'views/chat/dialogTicketDetail.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });

            }

            //mostra la text area dove inserire lo snippet di codice
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

            //mostra il testo del ticket inviato
            $scope.showDialogSnippetDetail = function(text) {
                myService.dataObj = {
                    'snippetText': text
                };

                console.log('snippet:', text)

                $mdDialog.show({
                    controller: 'DialogShowSnippetController',
                    templateUrl: 'views/chat/dialogShowSnippet.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true

                });
            };

            //controlla l'esistenza della chat
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
                    console.log('event', event);
                uploadFileFn(event.target.files[0].name, result);
                document.getElementById("file_button").value = "";
                scrollToBottomFn();
            })
            };


            //upload del file
            function uploadFileFn(filename, file) {

                console.log('uploadFn()', file);

                var d = new Date();
                var timestamp = d.toISOString();
                timestamp = timestamp.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'-');
                filename = timestamp + filename;

                var params = [Number(ctrl.id), Number(ctrl.userInfo.userId), String('FILE'), String(filename)];


                ChatDataFactory.stompClient.send(BACKEND_BASE_URL + '/c/' + chatData.type + '/' + chatData.subject_id, {}, JSON.stringify(params));


                ChatDataFactory.UploadFile( file, ctrl.id,  filename,
                    function (response) {
                        console.log(response);

                        ToasterNotifierHandler.showSuccessToast('File caricato con successo');

                    }, function () {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'upload del file"})
                    });

            }

            //download del file
            function getFileFn(chatId, filename) {

                ChatDataFactory.GetFile(chatId, filename,
                    function (response) {

                        console.log('file received -->',response);

                        downloadFile(response, filename);

                        console.log('file downloaded');

                        $state.reload();

                    }, function (response) {
                        console.log('Error in download file');
                    });

            }

            //creazione del link
            function downloadFile(url, filename) {
                fetch(url).then(function(t) {
                    return t.blob().then((b)=>{
                            var a = document.createElement("a");
                            a.href = URL.createObjectURL(b);
                            a.setAttribute("download", filename);
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }
                    );
                });
            }

            //gestisce lo scrolling dell'area dei messaggi
            function scrollToBottomFn() {
                console.log('SCROLL');
                $location.hash('scrollToBottom');
                $anchorScroll();
            }


            ctrl.CheckIfChatExists = CheckIfChatExistsFn;
            ctrl.sendMessage = sendMessageFn;
            ctrl.showTicketDetail = showTicketDetailFn;
            ctrl.uploadFile = uploadFileFn;
            ctrl.getFile = getFileFn;
            ctrl.scrollToBottom = scrollToBottomFn;

            init();

        }])


.filter('filename', function() {
    return function(filename) {

        filename = filename.substring(24);

        return filename;
    };
});
