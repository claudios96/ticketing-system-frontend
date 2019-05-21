'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller('TeamAssignCtrl', ['$scope', '$state', '$location', '$anchorScroll', '$stateParams', 'TeamDataFactory', 'UserDataFactory', 'ErrorStateRedirector', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        function ($scope, $state, $location, $anchorScroll, $stateParams, TeamDataFactory, UserDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder) {

            var ctrl = this;
            ctrl.currentTeam = {
                "teamLeader": null,
                "teamMembers": []
            };
            ctrl.assistantList = [];

            ctrl.value = true;

            ctrl.getAllAssistant = getAllAssistantFn;
            ctrl.setTeamLeader = setTeamLeaderFn;
            ctrl.unsetTeamLeader = unsetTeamLeaderFn;
            ctrl.setTeamMember = setTeamMemberFn;
            ctrl.unsetTeamMember = unsetTeamMemberFn;
            ctrl.buildTeam = buildTeamFn;
            ctrl.resetFields = resetFieldsFn;

            $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
            $scope.dtColumnDefsLeft = [
                DTColumnDefBuilder.newColumnDef(4).notSortable()
            ];
            $scope.dtColumnDefsRight = [
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];


            init();

            function init() {
                setCurrentTeam();
            }

            function filterWhatNotAssistant(user) {
                //return user.roles[0].name === 'assistant';
                return user.role === 'TEAM_MEMBER' || user.role === 'TEAM_COORDINATOR' || user.role === 'TEAM_LEADER';
            }


            function setCurrentTeam() {

                TeamDataFactory.GetCompleteTeam($stateParams.teamId, function (completeTeam) {
                    ctrl.currentTeam = completeTeam;
                    getAllAssistantFn();
                }, function (error) {
                    ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del team"})
                })
            }

            function getAllAssistantFn() {
                UserDataFactory.GetAll(function (assistants) {
                    ctrl.assistantList = assistants.filter(filterWhatNotAssistant);
                    mergeAssistantFn();
                }, function (error) {
                    ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei membri"});
                });
            }

            function changeStateFn() {
                if (ctrl.value) {
                    ctrl.value = false;
                } else {
                    ctrl.value = true;
                }
            }

            function setTeamLeaderFn(member) {
                changeStateFn();

                ctrl.currentTeam.teamLeader = member;
                let index = ctrl.assistantList.indexOf(member);
                ctrl.assistantList.splice(index, 1);
            }

            function unsetTeamLeaderFn() {
                changeStateFn();
                ctrl.assistantList.push(ctrl.currentTeam.teamLeader);
                ctrl.currentTeam.teamLeader = null;
            }

            function setTeamMemberFn(member) {
                ctrl.currentTeam.teamMembers.push(member);

                let index = ctrl.assistantList.indexOf(member);
                ctrl.assistantList.splice(index, 1);

            }

            function unsetTeamMemberFn(member) {

                ctrl.assistantList.push(member);
                let index = ctrl.currentTeam.teamMembers.indexOf(member);
                ctrl.currentTeam.teamMembers.splice(index, 1)
            }

            function buildTeamFn() {

                //da rivedere i parametri passati
                TeamDataFactory.BuildTeam(ctrl.currentTeam, function () {
                    $state.go('team.list')
                });
            }

            function resetFieldsFn() {
                //da fare
            }

            function mergeAssistantFn() {

                ctrl.assistantList.forEach(function (assistant) {
                    if (ctrl.currentTeam.teamLeader.id === assistant.id) {
                        let index = ctrl.assistantList.indexOf(assistant);
                        ctrl.assistantList.splice(index, 1);
                    }
                });

                ctrl.currentTeam.teamMembers.forEach(function (member) {
                    ctrl.assistantList.forEach(function (assistant) {
                        if (member.id === assistant.id) {
                            let index = ctrl.assistantList.indexOf(assistant);
                            ctrl.assistantList.splice(index, 1);
                        }
                    })
                });

            }

        }

    ]);

