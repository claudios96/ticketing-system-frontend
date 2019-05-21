'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('state_machine', {
                abstract: true,
                url: '/stateMachine',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('state_machine.create', {
                templateUrl: 'views/createStateMachine/stateMachine.html',
                controller: 'createStateMachineCtrl',
                url: "/create",
                data: {
                    requiresLogin: true,
                    //access: ['Admin']
                },
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('state_machine_create');
                    }
                }
            })
            .state('state_machine.dashboard', {
                templateUrl: 'views/statemachine-dashboard/dashboard.html',
                controller: 'dashboardController',
                url: "/dashboard",
                data: {
                    requiresLogin: true,
                    //access: ['Admin']
                },
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('state_machine_dashboard');
                    }
                }
            })
    }]);