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
        'DTColumnDefBuilder', 'AclService', 'httpService',
        function ($scope, $state, $stateParams, AuthFactory, ChatDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder, AclService, httpService) {

            var ctrl = this;
            var chatData;


            /*
                        $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
                        $scope.dtColumnDefs = [
                            DTColumnDefBuilder.newColumnDef(4).notSortable()
                        ];
            */



            function init() {
                ctrl.userInfo = AuthFactory.getAuthInfo();
                //console.log('--->',ctrl.userInfo.userRole);
                ctrl.id = $stateParams.chatId;
                ctrl.type = $stateParams.chatType;

                console.log("ChatController", "init()")
                console.log("ChatController", Number(ctrl.id))
                console.log("ChatController", String(ctrl.type))
                console.log("ChatController", ctrl.userInfo.username)

                chatData = {'username' : ctrl.userInfo.username,
                    'type' : String(ctrl.type),
                    'subject_id' : Number(ctrl.id)};


                //ctrl.messages = [];

                //refreshChatFn(chatData);

                // creazione dummy messages
                /*for (var i=0;i<5;i++) {
                    ctrl.messages.push({sender:'Giovanni', date: new Date(), content:'Ciao mondo'});

                }*/
            }

            function refreshChatFn(chatData) {
                console.log('refresh chat');

                ChatDataFactory.GetMsgs(chatData.username, chatData.type, chatData.subject_id,
                    function (msgs) {

                        //ctrl.messages = msgs;

                        //TODO gestire info

                        console.log("username", msgs.messages.username)
                        console.log("nomeCognome", msgs.messages.completeName)
                        console.log("testo", msgs.messages.text)
                        console.log("timestamp", msgs.messages.timestamp)


                        console.log("ChatController", ctrl.messages)
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei messaggi"});
                    });
            }

            function  sendMessageFn() {
                console.log('insert message');
                // Don't send an empty message
                if (!ctrl.messageContent || ctrl.messageContent === '') {
                    return;
                }

                console.log("ChatController", "send()")
                console.log("ChatController", Number(ctrl.userInfo.userId))
                console.log("ChatController", String(ctrl.messageContent))
                console.log("ChatController", Number(ctrl.id))

                //ctrl.messages.push({sender:'Giovanni', date: new Date(), content: ctrl.messageContent});
                /*var msgData = {'user_id' : Number(ctrl.userInfo.userId),
                                'text' : String(ctrl.messageContent),
                                'chat_id' : Number(ctrl.id)};
                */

                ChatDataFactory.InsertMsg(Number(ctrl.userInfo.userId), String(ctrl.messageContent), Number(ctrl.id),
                    function (response) {
                        console.log(response);
                    }, function (response) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella scrittura del messaggio"})
                    });

                // Reset the messageContent input
                ctrl.messageContent = '';

                refreshChatFn(chatData);

            }


            ctrl.sendMessage = sendMessageFn;
            init();

        }]);