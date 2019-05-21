'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller('TeamCreateCtrl', ['$scope', '$state', 'TeamDataFactory', 'ErrorStateRedirector',
        function ($scope, $state, TeamDataFactory, ErrorStateRedirector) {

            var ctrl = this;
            resetFieldsFn();

            ctrl.resetFields = resetFieldsFn;
            ctrl.insertTeam = insertTeamFn;

            function resetFieldsFn() {
                ctrl.currentTeam = {};
            }

            function insertTeamFn() {
                TeamDataFactory.Insert(ctrl.currentTeam,
                    function (response) {
                        console.log(response);
                        resetFieldsFn();
                        $state.go('team.list', {}, {reload: 'team.list'});
                    }, function (response) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'inserimento del team"})
                    });
            }
        }

    ]);