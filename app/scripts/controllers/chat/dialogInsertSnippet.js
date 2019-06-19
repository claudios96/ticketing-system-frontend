'use strict';

mainAngularModule.controller('DialogInsertSnippetController',['$scope','myService','$mdDialog',
    function($scope,myService,$mdDialog){

    $scope.sendSnippet = function () {
        var code = document.getElementById('snippetCode').value;
        console.log(code);


        /* invio messaggio */
        var userID = myService.dataObj.userID;
        var chatID = myService.dataObj.chatID;
        console.log(userID, '-', chatID);

        var snippetName = '<<<SNIPPET>>>' + chatID + userID;

        /*
        ChatDataFactory.InsertMsg(Number(userID), String(snippetName), Number(chatID),
            function (response) {
                console.log(response);
                //ctrl.messages.push(response);

            }, function (response) {
                ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella scrittura dello snippet"});
            });
        */

        $mdDialog.cancel();
    };

    $scope.cancelSnippet = function() {
        $mdDialog.cancel();
    };


}]);