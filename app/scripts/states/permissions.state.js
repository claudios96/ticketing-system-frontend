'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('permissions', {
                abstract: true,
                url: '/permissions',
                templateUrl: 'views/dashboard/main.html',

                data: {
                    requiresLogin: true
                }
            }).state('permissions.team', {
            url: '/{objectType}/team/{teamId}',
            templateUrl: 'views/permission/team-permission.html',
            controller: 'UserPermissionController',
            controllerAs: 'ctrl',
            resolve: {
                acl: function (AclRouteProtector) {
                    return AclRouteProtector.checkRoutePermission('team_permission');
                }
            }
        }).state('permissions.ticket', {
            url: '/{objectType}/ticket/{ticketId}',
            templateUrl: 'views/permission/ticket-permission.html',
            controller: 'UserPermissionController',
            controllerAs: 'ctrl',
            resolve: {
                acl: function (AclRouteProtector) {
                    return AclRouteProtector.checkRoutePermission('ticket_permission');
                }
            }
        }).state('permissions.product', {
            url: '/{objectType}/product/{productId}',
            templateUrl: 'views/permission/product-permission.html',
            controller: 'UserPermissionController',
            controllerAs: 'ctrl',
            resolve: {
                acl: function (AclRouteProtector) {
                    return AclRouteProtector.checkRoutePermission('software_permission');
                }
            }
        }).state('permissions.group', {
            url: '/{objectType}/group/{groupId}',
            templateUrl: 'views/permission/group-permission.html',
            controller: 'UserPermissionController',
            controllerAs: 'ctrl',
            resolve: {
                acl: function (AclRouteProtector) {
                    return AclRouteProtector.checkRoutePermission('group_permission');
                }
            }
        }).state('permissions.details', {
            url: '/details/{sid}/{tipo}/{idTipo}',
            templateUrl: 'views/permission/permission-details.html',
            controller: 'PermissionHandlerController',
            controllerAs: 'ctrl'
        }).state('permissions.create', {
            url: '/details/{tipo}/',
            templateUrl: 'views/permission/permission-create.html',
            controller: 'PermissionHandlerController',
            controllerAs: 'ctrl'
        });
    }]);