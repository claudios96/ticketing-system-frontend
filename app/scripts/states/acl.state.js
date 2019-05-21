'use strict';

mainAngularModule.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('acl', {
                abstract: true,
                url: '/record',
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
            .state('acl.logs', {
                controller: 'AclRecordsController',
                controllerAs: 'ctrl',
                url: '/log',
                templateUrl: 'views/logs/acl-records.html'
            });
    }]
);