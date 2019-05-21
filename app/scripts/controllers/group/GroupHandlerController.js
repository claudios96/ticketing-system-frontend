'use strict';

mainAngularModule
    .controller('GroupHandlerController', ['$scope', '$state', '$location', '$anchorScroll', '$stateParams', 'GroupDataFactory', 'UserDataFactory', 'PermissionDataFactory', 'ErrorStateRedirector','$q',
        'UserDataFactory', function ($scope, $state, $location, $anchorScroll, $stateParams, GroupDataFactory, UserDataFactory, PermissionDataFactory, ErrorStateRedirector,$q) {

            var ctrl = this;

            ctrl.value = true;
            ctrl.currentGroup = {
                "name": "",
                "sids": [],
                "members": []
            };
            ctrl.oldGroup = {};
            ctrl.selectedTab = 'ruoli';
            ctrl.oldUsers = {};
            ctrl.usersChoose = [];
            ctrl.oldSids = {};
            ctrl.sidChoose = [];


            ctrl.changeState = changeStateFn;
            ctrl.populateSidList = populateSidListFn;
            ctrl.updateGroup = updateGroupFn;
            ctrl.deleteGroup = deleteGroupFn;
            ctrl.getCurrentGroup = getCurrentGroupFn;
            ctrl.selectTab = selectTabFn;
            ctrl.selectSids = selectSidsFn;
            ctrl.deselectSids = deselectSidsFn;
            ctrl.selectUser = selectUserFn;
            ctrl.deselectUser = deselectUserFn;


            init();

            function init() {

                let sidListProm = $q.defer();
                populateSidListFn(sidListProm);

                let userListProm = $q.defer();
                populateUserListFn(userListProm);

                $q.all([sidListProm.promise,userListProm.promise]).then(function (results) {
                    getCurrentGroupFn();
                })
            }

            function changeStateFn() {
                if (ctrl.value) {
                    //                ctrl.oldUser = ctrl.user;
                    ctrl.value = false;
                } else {
                    ctrl.value = true;
                }
            }

            function selectTabFn(tab) {
                ctrl.selectedTab = tab;
            }

            function getCurrentGroupFn() {
                console.log($stateParams.groupId);

                GroupDataFactory.GetCompleteGroup($stateParams.groupId,
                    function (completeGroup) {
                        ctrl.currentGroup = completeGroup;
                        mergeSidsFn();
                        mergeUserFn();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del gruppo"});
                    });
            }

            function populateSidListFn(promise) {
                PermissionDataFactory.getAllSid(
                    function (sidList) {
                        ctrl.sids = sidList;
                        ctrl.oldSids = angular.copy(ctrl.sids);

                        promise.resolve();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei SID"});
                    });
            }

            function populateUserListFn(promise) {
                UserDataFactory.GetAll(
                    function (users) {
                        ctrl.users = users;
                        console.log("CTRL USER", ctrl.users);
                        ctrl.oldUsers = angular.copy(ctrl.users);

                        promise.resolve();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero degli utenti"});
                    });
            }

            function updateGroupFn() {

                GroupDataFactory.BuildGroup(ctrl.currentGroup,
                    function (resp) {
                        console.log(resp);
                        $state.go('group.list')
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella costruzione del gruppo"});
                    });
            }

            //TODO
            function deleteGroupFn() {
                GroupDataFactory.Remove();
            }

            function selectSidsFn(index) {
                console.log("seleziona oggetti");

                ctrl.sidChoose.push(ctrl.sids[index]);
                ctrl.currentGroup.sids.push(ctrl.sids[index]);
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

            function selectUserFn(index) {
                console.log("seleziona oggetti");

                ctrl.usersChoose.push(ctrl.users[index]);
                ctrl.currentGroup.members.push(ctrl.users[index]);
                ctrl.users.splice(index, 1);
                //ctrl.sidChoose.id = ctrl.sids[index].id;
                //ctrl.sidChoose.name = ctrl.sids[index].name;
                //ctrl.sidChoose = angular.copy(ctrl.objects[index]);
                console.log(ctrl.usersChoose);
                $location.hash('utente-scelto');
                $anchorScroll.yOffset = 100;
                $anchorScroll();
                console.log("seleziona oggetti");

            }

            function deselectUserFn(index) {
                console.log("deseleziona oggetti");

                ctrl.users.push(ctrl.usersChoose[index]);
                ctrl.currentGroup.members.splice(index, 1);
                ctrl.usersChoose.splice(index, 1);
                //ctrl.sidChoose.id = ctrl.sids[index].id;
                //ctrl.sidChoose.name = ctrl.sids[index].name;
                //ctrl.sidChoose = angular.copy(ctrl.objects[index]);
                console.log(ctrl.usersChoose);
                $location.hash('utenti-iniziale');
                $anchorScroll.yOffset = 100;
                $anchorScroll();
            }

            function mergeSidsFn() {

                ctrl.currentGroup.sids.forEach(function (sidAssigned) {
                    ctrl.sids.forEach(function (sidAvailable) {
                        if (sidAssigned.id === sidAvailable.id) {
                            let index = ctrl.sids.indexOf(sidAvailable);
                            ctrl.sids.splice(index, 1);
                        }
                    })
                })

            }

            function mergeUserFn() {

                var resultList = [];

                ctrl.currentGroup.members.forEach(function (memberAssigned) {
                    ctrl.users.forEach(function (memberAvailable) {
                        if (memberAssigned.id === memberAvailable.id) {
                            let index = ctrl.users.indexOf(memberAvailable);
                            let result = ctrl.users.splice(index, 1);
                            let m = angular.copy(memberAvailable);
                            resultList.push(m);
                        }
                    })
                });
                ctrl.currentGroup.members = resultList;

            }

        }]);