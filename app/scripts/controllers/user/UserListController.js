'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller('UserListCtrl', ['$scope', '$state', 'UserDataFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ErrorStateRedirector',
        function ($scope, $state, UserDataFactory, DTOptionsBuilder, DTColumnDefBuilder, ErrorStateRedirector) {

            var ctrl = this;
            ctrl.refreshUsers = refreshUsersFn;
            ctrl.deleteUser = deleteUserFn;
            ctrl.showInfo = showInfoFn;
            ctrl.isAdmin = isAdminFn;
            $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">');
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(6).notSortable()
            ];

            refreshUsersFn();

            function refreshUsersFn() {
                console.log("refresh users");
                UserDataFactory.GetAll(
                    function (users) {
                        ctrl.users = users;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'import degli user"});

                    });
            }

            function deleteUserFn(id) {
                console.log("delete user with id: " + id);
                UserDataFactory.Remove(id,
                    function () {
                        refreshUsersFn();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'eliminazione dell'utente"});

                    });
            }

            function showInfoFn(id) {
                $state.go('user.info', {
                    userId: id
                });
            }

            function isAdminFn(userType) {
                return userType === 'ADMIN';
            }

        }]);