'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('error', {
                abstract: true,
                url: '/error',
                templateUrl: 'views/dashboard/main.html',
                params: {
                    errorObject: null
                },
                data: {
                    requiresLogin: true
                }
            }).state('error.details', {
            url: '/details',
            templateUrl: 'views/error/error.html',
            controller: 'ErrorController',
            controllerAs: 'ctrl'
        })

    }]);