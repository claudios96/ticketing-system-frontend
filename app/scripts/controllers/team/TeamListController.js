'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller('TeamListCtrl', ['$scope', 'TeamDataFactory', 'ErrorStateRedirector', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        function ($scope, TeamDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder) {

            var ctrl = this;
            ctrl.refreshTeam = refreshTeamFn;
            ctrl.editTeam = editTeamFn;
            ctrl.deleteTeam = deleteTeamFn;

            refreshTeamFn();

            $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];


            function refreshTeamFn() {
               // alert("team get all");
                //console.log("refresh Teams");
                TeamDataFactory.GetAll(
                    function (teams) {
                        ctrl.teams = teams;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'import dei team"});
                    });
            }

            function editTeamFn(team) {
                console.log("update team with id: " + team.id);
                TeamDataFactory.Update(team,
                    function () {
                        refreshTeamFn();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'update del team"});

                    });
            }

            function deleteTeamFn(id) {
                console.log("delete team with id: " + id);
                TeamDataFactory.Remove(id,
                    function () {
                        refreshTeamFn();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'eliminazione del team"});

                    });
            }
        }]);