'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('workflow', {
                abstract: true,
                url: '/workflow',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('workflow.dashboard', {
                url: '/workflowdashboard',
                //templateUrl:"views/planning/gantt.html",
                //templateUrl:"views/planning/modalTeam.html",
                templateUrl: "views/statemachine-dashboard/dashboard.html",
                //controller:"MainGanttCtrl",
                //controller:"ctrlTeam",
                controller: "dashboardController",
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('workflow');
                    }
                }
            })
            /*
            .state('gantt.show', {
                url: '/ganttshow',
                templateUrl:"views/planning/gantt.html",
                controller:"MainGanttCtrl",
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('gantt');
                    }
                }
            })
            .state('gantt.planning', {
                //templateUrl:"views/planning/modalPlanning.html",
                controller: "planningDialog",
                url: '/planning',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('gantt');
                    }
                }
            })
            */
    }]);