'use strict';

mainAngularModule.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('auditing', {
                abstract: true,
                url: '/auditing',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                },
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('log_view');
                    }
                }
            })
            .state('auditing.logs', {
                url: '/logs',
                templateUrl: 'views/logs/auditing-logs.html',
                controller: 'AuditingLogController',
                controllerAs: 'ctrl'
            });
    }]
);