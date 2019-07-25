'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 */
mainAngularModule
    .controller('LoginCtrl', ['$scope', '$state', 'AuthFactory',
        function ($scope, $state, AuthFactory) {

            let ctrl = this;
            ctrl.authRequest = {username: 'admin', password: 'password'};
            ctrl.doLogin = doLoginFn;


            ctrl.authMessage = '';

            function doLoginFn() {
                console.log("doLoginFn");
                AuthFactory.sendLogin(ctrl.authRequest, successCB, errorCB);

                function successCB(response) {
                    let authInfo = response.data;
                    let header = response.headers();
                    authInfo.jwtToken = header['authorization'];

                    console.log("authInfo", authInfo);
                    // AuthFactory.user.username = authInfo.username;
                    // AuthFactory.user.role = authInfo.role;
                    let debugJWT = true;
                    //if (debugJWT) {
                    if (true) {
                        console.log("username: " + authInfo.username);
                        console.log("roles: " + JSON.stringify(authInfo.authorities));
                        console.log("jwtToken: " + authInfo.jwtToken);
                        console.log("userType: " + authInfo.userRole);
                    }
                    AuthFactory.setJWTAuthInfo(authInfo);
                    $state.go("dashboard.home");
                }

                function errorCB(response) {
                    let error = response.data;
                    if (error && error.status === 401) {
                        ctrl.authMessage = error.message;
                    }
                    else {
                        console.error(response);
                        console.log('error is ' + response.data);
                        ctrl.authMessage = 'No response from server';
                    }
                }

            }

        }


    ]);