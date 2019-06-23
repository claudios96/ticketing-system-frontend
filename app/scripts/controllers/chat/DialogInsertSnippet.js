'use strict';

mainAngularModule.controller('DialogInsertSnippetController',['$scope','myService','$mdDialog','ChatDataFactory','BACKEND_BASE_URL',
    function($scope,myService,$mdDialog, ChatDataFactory, BACKEND_BASE_URL){

    $scope.sendSnippet = function () {
        var code = document.getElementById('snippetCode').value;
        console.log('send snippet', code);

        /* invio messaggio */
        var userID = myService.dataObj.userID;
        var chatID = myService.dataObj.chatID;
        var chatType = myService.dataObj.type;
        var subject_id = myService.dataObj.subject_id;

        console.log(userID, '-', chatID);

        var snippetName = '<<<SNIPPET>>>' + chatID + userID;

        var params = [Number(chatID), Number(userID), String(code), String('SNIPPET')];

        // Don't send an empty snippet
        if (!code || code === '') {
            return;
        }
        if (ChatDataFactory.stompClient != null)
            ChatDataFactory.stompClient.send(BACKEND_BASE_URL + '/c/' + chatType + '/' + subject_id, {}, params.toString());

        $mdDialog.cancel();
    };

    $scope.cancelSnippet = function() {
        $mdDialog.cancel();
    };


}]);