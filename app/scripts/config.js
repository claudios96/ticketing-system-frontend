'use strict';

mainAngularModule.config(function Config($httpProvider, jwtOptionsProvider, AclServiceProvider) {
    // Please note we're annotating the function so that the $injector works when the file is minified
    jwtOptionsProvider.config({
        authPrefix: '',
        unauthenticatedRedirector: ['$state', function ($state) {
            $state.go('login');
        }],
        tokenGetter: ['AuthFactory', function (AuthFactory) {
            return AuthFactory.getJWTToken();
        }],
        whiteListedDomains: ['localhost', '10.220.233.144', '192.168.1.11', '10.220.240.230', '192.168.10.210', '172.20.0.50']
    });

    $httpProvider.interceptors.push('jwtInterceptor');
    $httpProvider.defaults.headers.common = {"Content-Type": "application/json"};

    AclServiceProvider.resume();
});