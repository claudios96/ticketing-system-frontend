'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

mainAngularModule
    .controller('ChatCtrl', ['$scope','$state', '$stateParams', 'AuthFactory', 'ErrorStateRedirector', 'DTOptionsBuilder',
        'DTColumnDefBuilder', 'AclService', 'httpService',
        function ($scope, $state, $stateParams, AuthFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder, AclService, httpService) {

            var ctrl = this;



            /*
                        $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
                        $scope.dtColumnDefs = [
                            DTColumnDefBuilder.newColumnDef(4).notSortable()
                        ];
            */

            // TODO : manca il get dal be


            function init() {
                ctrl.userInfo = AuthFactory.getAuthInfo();
                //console.log('--->',ctrl.userInfo.userRole);
                ctrl.id = $stateParams.chatId;
                ctrl.type = $stateParams.chatType;

                ctrl.messages = [];
                // creazione dummy messages
                /*for (var i=0;i<5;i++) {
                    ctrl.messages.push({sender:'Giovanni', date: new Date(), content:'Ciao mondo'});

                }*/
            }

            init();

            function  sendMessageFn() {
                // Don't send an empty message
                if (!ctrl.messageContent || ctrl.messageContent === '') {
                    return;
                }

                ctrl.messages.push({sender:'Giovanni', date: new Date(), content: ctrl.messageContent});

                // Reset the messageContent input
                ctrl.messageContent = '';

            }

            ctrl.sendMessage = sendMessageFn;

        }]);