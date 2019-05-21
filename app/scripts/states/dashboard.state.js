'use strict';

mainAngularModule.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                },
            })
            .state('dashboard.home', {
                url: '/home',
                controller: 'MainCtrl',
                templateUrl: 'views/dashboard/home.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('login', {
                templateUrl: 'views/auth/login.html',
                url: '/login',
                controller: 'LoginCtrl',
                controllerAs: 'ctrl'
            })
            .state('register', {
                templateUrl: 'views/auth/registration.html',
                url: '/register',
                controller: 'RegistrationCtrl',
                controllerAs: 'ctrl'
            })
    }]);