'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('escalation', {
                abstract: true,
                url: '/escalation',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('escalation.new', {
                url: '/defineEscalation',
                controller:"ctrlEscalation",
                templateUrl: "views/planning/defineEscalation.html",
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('define_escalation');
                    }
                }
            })
            .state('escalation.queue', {
                controller:"ctrlQueue",
                url: '/showQueue',
                templateUrl: "views/planning/showQueue.html",
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('show_queue');
                    }
                }
            })
    }]);