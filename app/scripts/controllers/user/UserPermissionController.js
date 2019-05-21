'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

mainAngularModule
    .controller('UserPermissionController', ['$scope', '$state', '$stateParams', 'AuthFactory', 'PermissionDataFactory',
        'TeamDataFactory', 'softwareProductDataFactory', 'TicketDataFactory', 'GroupDataFactory', 'ErrorStateRedirector',
        function ($scope, $state, $stateParams, AuthFactory, PermissionDataFactory,
                  TeamDataFactory, softwareProductDataFactory, TicketDataFactory, GroupDataFactory, ErrorStateRedirector
        ) {

            var ctrl = this;


            ctrl.currentObject = {
                id: null,
                name: null
            }

            ctrl.PermissionACL = "";

            ctrl.acl = null;
            ctrl.perm = null;
            ctrl.currentPermissions = null;

            function init() {
                let objectType = $stateParams.objectType;
                if (objectType === "team") {
                    ctrl.currentObject.id = $stateParams.teamId;
                    ctrl.permissionACL = "team_permission";
                    TeamDataFactory.GetSingle(ctrl.currentObject.id, function (team) {
                        ctrl.currentObject.name = team.name;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del team"});
                    })

                } else if (objectType === "ticket") {
                    ctrl.currentObject.id = $stateParams.ticketId;
                    ctrl.permissionACL = "ticket_permission";
                    TicketDataFactory.GetSingle(ctrl.currentObject.id, function (ticket) {
                        ctrl.currentObject.name = ticket.title;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del ticket"});
                    })

                } else if (objectType === "group") {
                    ctrl.currentObject.id = $stateParams.groupId;
                    ctrl.permissionACL = "group_permission";
                    GroupDataFactory.GetSingle(ctrl.currentObject.id, function (group) {
                        console.log(group);
                        ctrl.currentObject.name = group.name;
                        console.log(ctrl.currentObject);
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del gruppo"});
                    })

                }
                else if (objectType === "product") {
                    ctrl.currentObject.id = $stateParams.productId;
                    ctrl.permissionACL = "software_permission";
                    softwareProductDataFactory.GetSingle(ctrl.currentObject.id, function (product) {
                        ctrl.currentObject.name = product.name;
                        console.log(product);
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del prodotto"});
                    })

                }


                PermissionDataFactory.GetAllPermissions(objectType, ctrl.currentObject.id,
                    function (permissions) {
                        ctrl.currentPermissions = permissions;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei permessi"});
                    });
            }

            init();

            ctrl.allPermissionsForUser = allPermissionsForUserFn;
            ctrl.addPermission = addPermissionFn;
            ctrl.deletePermission = deletePermissionFn;
            ctrl.updatePermission = updatePermissionFn;
            ctrl.showUserDetails = showUserDetailsFn;
            ctrl.showSinglePerm = showSinglePermFn;
            ctrl.showLog = showLogFn;
            ctrl.getAcl = getAclFn;
            ctrl.init = init;

            function showLogFn() {
                console.log(ctrl.singleUser);
                console.log(ctrl.permission);
            }

            function getAclFn() {
                ctrl.acl = ctrl.permission.find(x => x === $stateParams.idTipo);
                ctrl.perm = ctrl.acl.find(y => y === $stateParams.sid);
            }


            function showUserDetailsFn(id) {
                console.log(id);
                console.log(ctrl.singleUser);
            }

            function showSinglePermFn(id) {

            }

            function allPermissionsForUserFn(id) {
                console.log("refresh permissions");
                PermissionDataFactory.GetAllPermissions(id,
                    function (permissions) {
                        ctrl.perms = permissions;
                    });
            }

            function addPermissionFn() {

            }

            function deletePermissionFn() {

            }

            function updatePermissionFn() {

            }

        }]);