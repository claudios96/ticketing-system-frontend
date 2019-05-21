'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # RegistrationCtrl
 */
mainAngularModule
    .controller('RegistrationCtrl', ['$scope', '$state', 'RegistrationFactory',
        function ($scope, $state, RegistrationFactory) {

            let ctrl = this;
            ctrl.registerForm = {firstName: '', lastName: '', email: '', username: '', password: '', confirmPassword: ''};
            ctrl.doRegistration = doRegisterFn;

            ctrl.registerMessage = '';

            function doRegisterFn() {

                let validateForm = function (form) {
                    console.log("Form: ", form);
                    return form.firstName.length > 1 &&
                        form.lastName.length > 1 &&
                        form.email.length > 1 &&
                        form.username.length > 1 &&
                        form.password.length > 1 &&
                        form.confirmPassword.length > 1 &&
                        form.password === form.confirmPassword;
                };

                if (!validateForm(ctrl.registerForm)) {
                    alert("Invalid form");
                    return;
                }

                const user = {
                    firstName: ctrl.registerForm.firstName,
                    lastName: ctrl.registerForm.lastName,
                    email: ctrl.registerForm.email,
                    username: ctrl.registerForm.username,
                    password: ctrl.registerForm.password
                };

                console.log("doRegisterFn");
                RegistrationFactory.sendRegistration(user, successCB, errorCB);

                function successCB(response) {
                    alert("Registration successfully")
                    $state.go("login");
                }

                function errorCB(response) {
                    let error = response.data;
                    if (error && error.status === 401) {
                        ctrl.registerMessage = error.message;
                    }
                    else {
                        console.error(response);
                        ctrl.authMessage = 'No response from server';
                    }
                }

            }
        }


    ]);