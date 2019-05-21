'use strict';

mainAngularModule
    .controller('GroupListController', ['$scope', '$state', 'GroupDataFactory', 'PermissionDataFactory', 'ErrorStateRedirector', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        function ($scope, $state, GroupDataFactory, PermissionDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder) {

            var ctrl = this;
            ctrl.groups = {};

            ctrl.showGroups = showGroupsFn;
            ctrl.refreshGroups = refreshGroupsFn;
            ctrl.deleteGroup = deleteGroupFn;

            refreshGroupsFn();
            $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];

            function showGroupsFn() {
                GroupDataFactory.GetAll(
                    function (groups) {
                        ctrl.groups = groups;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei gruppi"});
                    });
            }

            function refreshGroupsFn() {
                ctrl.showGroups();
            }

            function deleteGroupFn(idGroup) {
                GroupDataFactory.Remove(
                    idGroup,
                    function () {
                        refreshGroupsFn()
                    }, function () {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'eliminazione del gruppo"});
                    });
            }


        }]);