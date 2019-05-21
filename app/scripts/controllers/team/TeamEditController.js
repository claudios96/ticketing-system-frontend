'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller('TeamEditCtrl', ['$scope', '$state', '$stateParams', 'TeamDataFactory', 'ErrorStateRedirector',
        function ($scope, $state, $stateParams, TeamDataFactory, ErrorStateRedirector) {

            var ctrl = this;
            ctrl.saveTeam = saveTeamFn;

            setCurrentTeam();

            function setCurrentTeam() {
                TeamDataFactory.GetSingle($stateParams.teamId,
                    function (team) {
                        ctrl.currentTeam = team;
                    }, function (response) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del Team"})
                    });
            }

            function saveTeamFn() {
                TeamDataFactory.Update(ctrl.currentTeam,
                    function (response) {
                        console.log(response);
                        $state.go('team.list', {}, {reload: 'team.list'});
                    }, function (response) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel salvataggio del Team"})
                    });
            }
        }


    ]);

