'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

mainAngularModule
    .controller('UserInfoController', ['$scope', '$state', '$stateParams', 'UserDataFactory', 'AuthFactory', 'ErrorStateRedirector',
        function ($scope, $state, $stateParams, UserDataFactory, AuthFactory, ErrorStateRedirector) {

            var ctrl = this;

            ctrl.showUser = showUserFn;
            ctrl.updateUser = updateUserFn;
            ctrl.resetFields = resetFieldsFn;
            ctrl.changeState = changeStateFn;
            ctrl.printValue = printValueFn;
            ctrl.isAdmin = isAdminFn;
            ctrl.value = true;

            ctrl.user = {};
            ctrl.userGroups = {};
            ctrl.oldUser = null;
            ctrl.companies = [];

            init();

            function init() {
                showUserFn();

                UserDataFactory.metadata(function (response) {
                    ctrl.companies = response.data.companies;
                    ctrl.roles = response.data.roles;
                    console.log("resp", response);
                    //self.rolesList = response.data.roles;
                    /*$timeout(function () {
                        M.AutoInit();
                    });*/
                }, function () {
                    alert("Invalid metadata");
                });
            }

            /*
            ctrl.userTypes = [{
                label: 'Customer',
                role: {
                    type: 'customer'
                }
            },
                {
                    label: 'Assistant',
                    role: {
                        type: 'assistant',
                    }
                },
                {
                    label: 'Help desk operator',
                    role: {
                        type: 'help_desk_operator'
                    }
                }
            ];
*/
            function printValueFn() {
                console.log(ctrl.user);
                console.log(ctrl.oldUser);
            }

            function changeStateFn() {
                if (ctrl.value) {
                    ctrl.oldUser = angular.copy(ctrl.user);
                    ctrl.value = false;
                } else {
                    ctrl.value = true;
                }
            }

            function showUserFn() {
                /*
                UserDataFactory.GetSelf(
                    function (user) {
                        ctrl.user = user;
                        alert("IDIDIDI", ctrl.user);
                        console.log("showUserFn: ", ctrl.user);
                        UserDataFactory.GetGroupByUserID(ctrl.user.id,
                            function (userGroups) {
                                ctrl.userGroups = userGroups;
                            });
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'import dell' user"});

                    });
                    */

                let userId = $stateParams.userId;
                if (checkUserId(userId)) {
                    UserDataFactory.GetSingle(userId,
                        function (user) {
                            ctrl.user = user;
                            //console.log("showUserFn: ", ctrl.user.roles[0].name);
                            UserDataFactory.GetGroupByUserID(ctrl.user.id,
                                function (userGroups) {
                                    ctrl.userGroups = userGroups;
                                });
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'import dell' user"});

                        });
                } else {
                    ErrorStateRedirector.GoToErrorPage({Messaggio: "Id utente non tuo"});
                }


            }

            function updateUserFn() {
                /*
                if (ctrl.user.roles[0].name === 'ROLE_CUSTOMER') {
                    ctrl.user.roles[0].name = 'Customer';
                } else if (ctrl.user.roles[0].name === 'ROLE_TEAM_MEMBER') {
                    ctrl.user.roles[0].name = 'Assistant'
                } else if (ctrl.user.roles[0].name === 'ROLE_HELP_DESK_OPERATOR') {
                    ctrl.user.roles[0].name = 'HelpDeskOperator';
                }
                */
                ctrl.user.company = ctrl.user.company.id;
                console.log("updateUser: ", ctrl.user);

                UserDataFactory.Update(ctrl.user,
                    function () {
                        $state.go("dashboard.home");
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'update dell'utente"});

                    });
            }

            function checkUserId(userId) {
                let authInfo = AuthFactory.getAuthInfo();
                if (authInfo.userRole === "ADMIN") {
                    return true;
                }
                if (userId != authInfo.userId) {
                    return false;
                }
                return true;
            }

            function resetFieldsFn() {
                ctrl.user = ctrl.oldUser;
            }

            function isAdminFn(userType){
                return userType === 'ADMIN';
            }

        }

    ]);