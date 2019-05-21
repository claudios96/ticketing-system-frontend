'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('group', {
                abstract: true,
                url: '/group',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            }).state('group.list', {
            url: '/list',
            templateUrl: 'views/group/group-list.html',
            controller: 'GroupListController',
            controllerAs: 'ctrl',
            resolve: {
                acl: function (AclRouteProtector) {
                    return AclRouteProtector.checkRoutePermission('group_view');
                }
            }
        }).state('group.create', {
            url: '/create',
            templateUrl: 'views/group/group-create.html',
            controller: 'GroupCreateController',
            controllerAs: 'ctrl',
            resolve: {
                acl: function (AclRouteProtector) {
                    return AclRouteProtector.checkRoutePermission('group_create');
                }
            }
        }).state('group.edit', {
            url: '/{groupId:int}/edit',
            templateUrl: 'views/group/group-edit.html',
            controller: 'GroupEditController',
            controllerAs: 'ctrl',
            resolve: {
                acl: function (AclRouteProtector) {
                    return AclRouteProtector.checkRoutePermission('group_update');
                }
            }
        }).state('group.details', {
            url: '/details/{groupId}',
            templateUrl: 'views/group/group-details.html',
            controller: 'GroupHandlerController',
            controllerAs: 'ctrl',
            resolve: {
                acl: function (AclRouteProtector) {
                    return AclRouteProtector.checkRoutePermission('group_details');
                }
            }
        })

    }]);