'use strict';

mainAngularModule
    .controller('GroupCreateController', ['$scope', '$state', '$location', '$anchorScroll', 'GroupDataFactory', 'PermissionDataFactory', 'ErrorStateRedirector',
        function ($scope, $state, $location, $anchorScroll, GroupDataFactory, PermissionDataFactory, ErrorStateRedirector) {

            var ctrl = this;
            ctrl.currentGroup = {
                "name": "",
                "sids": [],
                "members": []
            };
            ctrl.sidChoose = [];
            ctrl.oldSids = {};

            ctrl.populateSidList = populateSidListFn;
            ctrl.insertGroup = insertGroupFn;
            ctrl.resetFields = resetFieldsFn;
            ctrl.selectSids = selectSidsFn;
            ctrl.deselectSids = deselectSidsFn;

            init();

            function init() {
                populateSidListFn();
            }

            function populateSidListFn() {
                PermissionDataFactory.getAllSid(
                    function (sidList) {
                        ctrl.sids = sidList;
                        ctrl.oldSids = angular.copy(ctrl.sids);
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei SID"});
                    });
            }

            function insertGroupFn() {
                GroupDataFactory.Insert(ctrl.currentGroup,
                    function (group) {
                        console.log(group);
                        $state.go('group.list', {}, {reload: 'group.list'});
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'inserimento del gruppo"});
                    });
                resetFieldsFn();
            }

            function resetFieldsFn() {
                ctrl.currentGroup = {
                    "name": "",
                    "sids": [],
                    "members": []
                };
                ctrl.sids = angular.copy(ctrl.oldSids);
                ctrl.sidChoose = [];
            }

            function selectSidsFn(index) {
                console.log("seleziona oggetti");

                ctrl.sidChoose.push(ctrl.sids[index]);
                ctrl.currentGroup.sids.push(ctrl.sids[index].id);
                ctrl.sids.splice(index, 1);
                //ctrl.sidChoose.id = ctrl.sids[index].id;
                //ctrl.sidChoose.name = ctrl.sids[index].name;
                //ctrl.sidChoose = angular.copy(ctrl.objects[index]);
                console.log(ctrl.sidChoose);
                $location.hash('sid-scelto');
                $anchorScroll.yOffset = 100;
                $anchorScroll();
            }

            function deselectSidsFn(index) {
                console.log("deseleziona oggetti");

                ctrl.sids.push(ctrl.sidChoose[index]);
                ctrl.currentGroup.sids.splice(index, 1);
                ctrl.sidChoose.splice(index, 1);
                //ctrl.sidChoose.id = ctrl.sids[index].id;
                //ctrl.sidChoose.name = ctrl.sids[index].name;
                //ctrl.sidChoose = angular.copy(ctrl.objects[index]);
                console.log(ctrl.sidChoose);
                $location.hash('sid-iniziale');
                $anchorScroll.yOffset = 100;
                $anchorScroll();
            }

        }]);

