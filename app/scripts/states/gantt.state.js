'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('gantt', {
                abstract: true,
                url: '/gantt',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('gantt.list', {
                url: '/ganttList',
                //templateUrl:"views/planning/gantt.html",
                //templateUrl:"views/planning/modalTeam.html",
                //controller:"MainGanttCtrl",
                //controller:"ctrlTeam",
                controller: "showGantt",
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('gantt');
                    }
                }
            })
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
    }]);