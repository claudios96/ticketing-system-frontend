'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller('UserCreateCtrl', ['$scope', '$state', 'UserDataFactory', 'ErrorStateRedirector',
        function ($scope, $state, UserDataFactory, ErrorStateRedirector) {

            var ctrl = this;
            ctrl.resetFields = resetFieldsFn;
            ctrl.insertUser = insertUserFn;
/*
            ctrl.userTypes = [
                'Customer',
                'Assistant',
                'HelpDeskOperator'
            ];
*/
            resetFieldsFn();
            ctrl.resetFields = resetFieldsFn;
            ctrl.insertUser = insertUserFn;



            UserDataFactory.metadata(function (response) {
                ctrl.companies = response.data.companies;
                ctrl.rolesList = response.data.roles;
                console.log(ctrl.rolesList);
                /*$timeout(function () {
                    M.AutoInit();
                });*/
            }, function () {
                alert("Invalid metadata");
            });

            function resetFieldsFn() {
                //ctrl.currentUser = {roles: "ROLE_CUSTOMER"};
            }

            function insertUserFn() {
                UserDataFactory.Insert(
                    ctrl.currentUser,
                    function (user) {
                        console.log("insertUser: ", user);
                        resetFieldsFn();
                        $state.go('user.list', {}, {reload: 'user.list'});
                    }, function (response) {
                        ErrorStateRedirector.GoToErrorPage(
                            {
                                Info: "Errore in inserimento utente. Riprova."
                            }
                        )
                    }
                );
            }
        }

    ]);