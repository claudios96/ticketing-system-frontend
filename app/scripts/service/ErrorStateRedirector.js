'use strict';

mainAngularModule
    .service('ErrorStateRedirector', ['$state', function ($state) {
        this.GoToErrorPage = function (errorMsgObject) {
            $state.go('error.details', {errorObject: errorMsgObject});
        };

    }])