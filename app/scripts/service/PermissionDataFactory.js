'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */

mainAngularModule
    .factory('PermissionDataFactory', ['$http', 'BACKEND_BASE_URL', 'PERMS_ENDPOINT_URL', 'ACLSID_ENDPOINT_URL', 'ToasterNotifierHandler',
        function ($http, BACKEND_BASE_URL, PERMS_ENDPOINT_URL, ACLSID_ENDPOINT_URL, ToasterNotifierHandler) {

            var thisCrudService = {};
            thisCrudService.perms = {};
            var _endPointPermsJSON = BACKEND_BASE_URL + PERMS_ENDPOINT_URL;
            var _endPointAclSidJSON = BACKEND_BASE_URL + ACLSID_ENDPOINT_URL;

            thisCrudService.GetAllPermissions = GetAllPermissionsFn;
            //thisCrudService.getAcl = getAclFn;
            thisCrudService.updateAcl = updateAclFn;
            thisCrudService.createAcl = createAclFn;
            thisCrudService.deleteAcl = deleteAclFn;
            thisCrudService.getBlankAcl = getBlankAclFn;
            thisCrudService.getAllSid = getAllSidFn;


            thisCrudService.permission = [
                {
                    "class": "com.uniroma2.isssrbackend.entity.Team",
                    "type": "team",
                    "object_id_identity": 5,
                    "acls": [
                        {
                            "sid": "ROLE_TEAM_COORDINATOR",
                            "principal": 0,
                            "perms": [
                                {
                                    "permission": "R",
                                    "grant": true
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
                                    "grant": true
                                }
                            ]
                        },
                        {
                            "sid": "antonioschiazza",
                            "principal": 1,
                            "perms": [

                                {
                                    "permission": "R",
                                    "grant": true
                                },
                                {
                                    "permission": "W",
                                    "grant": true
                                },
                                {
                                    "permission": "C",
                                    "grant": true
                                },
                                {
                                    "permission": "D",
                                    "grant": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "class": "com.uniroma2.isssrbackend.entity.Ticket",
                    "type": "ticket",
                    "object_id_identity": 6,
                    "acls": [
                        {
                            "sid": "ROLE_TEAM_ASSISTANT",
                            "principal": 0,
                            "perms": [
                                {
                                    "permission": "R",
                                    "grant": true
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
                                    "grant": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "class": "com.uniroma2.isssrbackend.entity.SoftwareProduct",
                    "type": "product",
                    "object_id_identity": 7,
                    "acls": [
                        {
                            "sid": "ROLE_TEAM_LEADER",
                            "principal": 0,
                            "perms": [
                                {
                                    "permission": "R",
                                    "grant": true
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
                                    "grant": true
                                }
                            ]
                        }
                    ]
                }
            ];

            console.log(thisCrudService.permission[0].type);

            function getBlankAclFn() {
                let acl = {
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
                }
                return acl;
            }


            function getAllSidFn(successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointAclSidJSON
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function GetAllPermissionsFn(type, id, successCB, errorCB) {


                $http({
                    method: 'GET',
                    url: _endPointPermsJSON + type + '/' + id
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function createAclFn(newAcl, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: _endPointPermsJSON,
                    data: newAcl
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                                ToasterNotifierHandler.handleCreation(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function updateAclFn(id, acl, successCB, errorCB) {

                $http({
                    method: 'PUT',
                    url: _endPointPermsJSON + acl.domain_object_type + '/' + id,
                    data: acl
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function deleteAclFn(type, id, successCB, errorCB) {

                $http({
                    method: 'DELETE',
                    url: _endPointPermsJSON + type + '/' + id
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            return thisCrudService;

        }]);
