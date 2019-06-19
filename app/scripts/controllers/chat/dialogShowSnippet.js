'use strict';

mainAngularModule.controller('DialogShowSnippetController',['$scope','myService','$mdDialog',
    function($scope,myService,$mdDialog){

        var ctrl = this;

        function init() {

            // variabile contenente il nome del file
            ctrl.snippetText = myService.dataObj.snippetName;

            /* get snippet file */

        }

        $scope.cancelSnippet = function() {
            $mdDialog.cancel();
        };

        init();
    }]);