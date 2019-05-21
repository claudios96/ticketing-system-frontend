'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('team', {
                abstract: true,
                url: '/team',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('team.list', {
                url: '/list',
                templateUrl: 'views/team/team-list.html',
                controller: 'TeamListCtrl',
                controllerAs: 'ctrl',
                data: {
                    requiresLogin: true
                },
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('team_view');
                        //return AclRouteProtector.checkRoutePermission('user_list');
                    }
                }
            })
            .state('team.create', {
                url: '/create',
                templateUrl: 'views/team/team-create.html',
                controller: 'TeamCreateCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('team_create');
                    }
                }
            })
            .state('team.edit', {
                url: '/{teamId:int}/edit',
                templateUrl: 'views/team/team-edit.html',
                controller: 'TeamEditCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('team_update');
                    }
                }
            })
            .state('team.assign', {
                url: '/{teamId:int}/assign',
                templateUrl: 'views/team/team-assign.html',
                controller: 'TeamAssignCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('team_assign');
                    }
                }
            })

    }]);