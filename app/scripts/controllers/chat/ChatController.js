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

            const ctrl = this;



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
                for (var i=0;i<10;i++) {
                    ctrl.messages.push({sender:'Luigi', time:'15:23', data:'ciao mondo'});

                }
            }

            init();



        }]);