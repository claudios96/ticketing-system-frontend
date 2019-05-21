'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('user', {
                abstract: true,
                url: '/user',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('user.list', {
                url: '/list',
                templateUrl: 'views/user/user-list.html',
                controller: 'UserListCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('users_list');
                    }
                }
            })
            .state('user.info', {
                url: '/{userId: int}/info',
                templateUrl: 'views/user/user-info.html',
                controller: 'UserInfoController',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('user_info');
                    }
                }
            })
            .state('user.create', {
                url: '/create',
                templateUrl: 'views/user/user-create.html',
                controller: 'UserCreateCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('user_create');
                    }
                }
            })
            .state('user.permission', {
                url: '/permission',
                templateUrl: 'views/user/user-permissions.html',
                controller: 'UserPermissionController',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('user_permission');
                    }
                }
            })
    }]);