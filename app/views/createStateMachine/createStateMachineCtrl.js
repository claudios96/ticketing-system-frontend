'use strict';

//var app = angular.module('ticketsystem.createStateMachine', ['ngRoute', 'ui.bootstrap']);
mainAngularModule.controller('createStateMachineCtrl', ['$scope', '$state', 'restService', 'httpService', 'util',
    function ($scope, $state, restService, httpService, util) {


    /**
     * @ngdoc           function
     * @name            downloadTemplate
     * @description     Used to download an .XML template for the default state machine.
     *
     */
    $scope.downloadTemplate = function () {
        httpService.get(restService.getStateMachines + '/downloadTemplate')
            .then(function (data) {
                    var base64String = data.data.templateBase64;
                    var anchor = document.createElement('a');
                    anchor.href = 'data:text/xml;base64,' + base64String;
                    anchor.target = '_blank';
                    anchor.download = "Template";
                    anchor.style = "visibility:hidden";
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                },
                function (err) {
                    console.log("ERRORE")
                })
    };


    /**
     * @ngdoc           function
     * @name            selectedFile
     * @description     Function converts .xml state machine file in base64 string.
     *
     * @param event     event containing the file
     */
    $scope.selectedFile = function (event) {
        util.getBase64(event.target.files[0])
            .then(result => {
                $scope.attachedFile = result;
            })
    };

    /**
     * @ngdoc           function
     * @name            selectDiagram
     * @description     Function converts state machine diagrama image in base64 string.
     *
     * @param event     event containing the file
     */
    $scope.selectedDiagram = function (event) {
        util.getBase64(event.target.files[0])
            .then(result => {
                $scope.attachedDiagram = result;
            })
    };


    /**
     * @ngdoc               function
     * @name                createStateMachine
     * @description         Rest Service to POST the created state machine.
     *
     * @param stateMachine  the state machine to be saved
     */

    $scope.createStateMachine = function (stateMachine) {
        stateMachine.base64StateMachine = $scope.attachedFile;
        stateMachine.base64Diagram = $scope.attachedDiagram;

        httpService.post(restService.getStateMachines, stateMachine)
            .then(function (data) {
                    window.alert("State Machine Created");

                    $state.reload();
                },
                function (err) {
                    console.log(err.data.response)
                    window.alert("Error : " + err.data.response)
                })
    }
}]);