'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

mainAngularModule
    .controller('ChatCtrl', ['$scope','$state', 'AuthFactory', 'ErrorStateRedirector', 'DTOptionsBuilder',
        'DTColumnDefBuilder', 'AclService', 'httpService',
        function ($scope, $state, AuthFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder, AclService, httpService) {

            const ctrl = this;



            /*
                        $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
                        $scope.dtColumnDefs = [
                            DTColumnDefBuilder.newColumnDef(4).notSortable()
                        ];
            */


            function init() {
                ctrl.userInfo = AuthFactory.getAuthInfo();
                console.log('--->',ctrl.userInfo.userRole);
            }

            init();

            function avviaChatProdottoFn(id) {
                $state.go('chat');
            }

            function avviaChatLeaderMemberFn(id) {
                $state.go('chat');
            }

            function avviaChatTeamFn(id) {
                $state.go('chat');
            }

            ctrl.avviaChatProdotto = avviaChatProdottoFn;
            ctrl.avviaChatLeaderMember = avviaChatLeaderMemberFn;
            ctrl.avviaChatTeam = avviaChatTeamFn;

        }]);