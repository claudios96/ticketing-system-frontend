'use strict';

/**
*  @ngdoc  service
*  @module  ticketsystem.storageService
*  @name   storageService
*  @description   Service manages the operation save/load user data.
*/
mainAngularModule.service('storageService', ['$rootScope',
function ($rootScope) {
    let userInformation = {};
    let logged = false;
    return {

        /**
         *  @ngdoc function
         *  @name get
         *  @description Function gets the required user data field.
         *  @param key      field of the user data
         *  @returns {string | null}    user data if field is found, null otherwise
         */
        get: function (key) {
            return sessionStorage.getItem(key);
        },
        /**
         *  @ngdoc function
         *  @name save
         *  @description Function saves the user data in the specified key.
         *  @param key      field of the user data
         *  @param data     user data
         */
        save: function (key, data) {
            sessionStorage.setItem(key, data);
        },
        /**
         *  @ngdoc function
         *  @name setuser
         *  @description Function saves the user data and set him/her as logged.
         *  @param user
         */
        setUser: function (user) {
            sessionStorage.setItem('userInformation',JSON.stringify(user));
            sessionStorage.setItem('logged',true);
        },
        /**
         *  @ngdoc function
         *  @name getUser
         *  @description Function gets all the user data.
         *  @returns {any}  Complete user data
         */
        getUser: function () {
            return JSON.parse(sessionStorage.getItem('userInformation'));
        },
        /**
         *  @ngdoc function
         *  @name invalidateUser
         *  @description Function erases the saved user data.
         *  @returns {any}  Complete user data
         */
        invalidateUser: function () {
            sessionStorage.removeItem('userInformation')
            sessionStorage.removeItem('logged')
        },
        /**
         *  @ngdoc function
         *  @name isLogged
         *  @description Function returns data if user is logged.
         *  @returns {string | null}    User data if logged, null otherwise.
         */
        isLogged: function () {
            return sessionStorage.getItem('logged');
        }

    };
}]);