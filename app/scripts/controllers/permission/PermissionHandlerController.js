'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

mainAngularModule
    .controller('PermissionHandlerController', ['$scope', '$state', '$location', '$anchorScroll', '$stateParams', 'AuthFactory', 'PermissionDataFactory',
        'TicketDataFactory', 'TeamDataFactory', 'softwareProductDataFactory', 'UserDataFactory', 'ErrorStateRedirector',
        function ($scope, $state, $location, $anchorScroll, $stateParams, AuthFactory,
                  PermissionDataFactory, TicketDataFactory, TeamDataFactory, softwareProductDataFactory, UserDataFactory, ErrorStateRedirector) {

            var ctrl = this;


            ctrl.idTipo = $stateParams.idTipo;
            ctrl.sid = $stateParams.sid;
            ctrl.tipo = $stateParams.tipo;
            ctrl.value = true;
            ctrl.currentObject = {
                "sid": {
                    "id": 0,
                    "principal": 0
                },
                "domain_object_type": "",
                "domain_object_id": 0,
                "perms": [
                    {
                        "permission": "R",
                        "grant": false
                    },
                    {
                        "permission": "W",
                        "grant": false
                    },
                    {
                        "permission": "C",
                        "grant": false
                    },
                    {
                        "permission": "D",
                        "grant": false
                    }
                ]
            };


            ctrl.sidList = [];
            ctrl.usersList = [];

            ctrl.useUserForPermission = false;


            ctrl.objects1 = [];
            ctrl.acl = null;

            ctrl.changeState = changeStateFn;
            ctrl.modifyPermission = modifyPermissionFn;
            ctrl.deletePermission = deletePermissionFn;
            ctrl.createPermission = createPermissionFn;
            ctrl.resetFields = resetFieldsFn;
            ctrl.getSidList = getSidListFn;
            ctrl.printValue = printValueFn;
            ctrl.getAllObject = getAllObjectFn;
            ctrl.selezionaOggetti = selezionaOggettiFn;
            ctrl.deselectObject = deselectObjectFn;

            ctrl.changePrincipalFlag = changePrincipalFlagFn;
            ctrl.isSelected = isSelectedFn;


            function changePrincipalFlagFn() {
                ctrl.currentObject.sid.principal = (!ctrl.useUserForPermission) ? 1 : 0;
            }

            console.log(ctrl.idTipo + ' ' + ctrl.sid + ' ' + ctrl.tipo);


            function init() {
                PermissionDataFactory.getAllSid(
                    function (resp) {
                        ctrl.sidList = resp;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei SID"});
                    });

                UserDataFactory.GetAll(
                    function (users) {
                        ctrl.usersList = users;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero degli utenti"});
                    })


                ctrl.currentObject.domain_object_type = ctrl.tipo;
                let newAcl = PermissionDataFactory.getBlankAcl();
            }

            init();
            getAllObjectFn();


            function printValueFn() {
                console.log(ctrl.sidList);
                console.log(ctrl.objects);
            }

            function selezionaOggettiFn(object) {
                console.log("seleziona oggetti");

                //ctrl.objects1.push(ctrl.objects[index]);
                ctrl.currentObject.domain_object_id = object.id;
                //ctrl.objects.splice(index, 1);

                //console.log(ctrl.objects1);
            }

            function deselectObjectFn(index) {

                ctrl.currentObject.domain_object_id = null;

                console.log(ctrl.sidChoose);
            }

            function getAllObjectFn() {
                if (ctrl.tipo === 'team') {
                    console.log("entro nella getAllObject");
                    TeamDataFactory.GetAll(function (resp) {
                        console.log(resp);
                        return ctrl.objects = resp;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei Team"});
                    });
                } else if (ctrl.tipo === 'ticket') {
                    TicketDataFactory.GetAll(function (resp) {
                        console.log(resp);
                        return ctrl.objects = resp;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei team "});
                    });
                } else if (ctrl.tipo === 'product') {
                    softwareProductDataFactory.GetAll(function (resp) {
                        console.log(resp);
                        return ctrl.objects = resp;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei prodotti"});
                    });
                }
            }

            function changeStateFn() {
                if (ctrl.value) {
                    ctrl.oldUser = ctrl.user;
                    ctrl.value = false;
                } else {
                    ctrl.value = true;
                }
            }

            function getSidListFn() {
                PermissionDataFactory.getAllSid(function (response) {
                    ctrl.sidList = response;
                }, function (error) {
                    ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell"});
                });
            }

            function resetFieldsFn() {
                ctrl.currentObject = {};
                ctrl.perm = angular.copy(ctrl.oldPerm);
            }

            function modifyPermissionFn() {
                PermissionDataFactory.updateAcl(ctrl.tipo, ctrl.idTipo, ctrl.sid, ctrl.perm, function (error) {
                    ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell"});
                });
            }

            function deletePermissionFn() {
                PermissionDataFactory.deleteAcl(ctrl.tipo, ctrl.idTipo, ctrl.sid, function (error) {
                    ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell"});
                })
            }

            function createPermissionFn(object) {

                PermissionDataFactory.createAcl(object,
                    function () {
                        if (ctrl.tipo === 'team') {
                            $state.go('team.list', {}, {reload: 'permissions.team'});
                        } else if (ctrl.tipo === 'ticket') {
                            $state.go('permissions.ticket', {}, {reload: 'permissions.ticket'});
                        } else {
                            $state.go('permissions.product', {objectType: 'product' ,productId: object.domain_object_id}, {reload: 'permissions.product'});
                        }
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella creazione del permesso"});
                    });


            }

            function isSelectedFn(id) {
                if (ctrl.currentObject.domain_object_id === id) {
                    return true;
                }
                return false;
            }
        }]);
