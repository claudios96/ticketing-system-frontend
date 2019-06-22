'use strict';

mainAngularModule.controller('DialogShowSnippetController',['$scope','myService','$mdDialog',
    function($scope,myService,$mdDialog){

        function init() {
            $scope.snippetText = myService.dataObj.snippetText;
        }

        $scope.cancelSnippet = function() {
            $mdDialog.cancel();
        };

        init();
    }]);