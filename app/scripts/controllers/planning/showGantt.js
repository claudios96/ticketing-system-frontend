mainAngularModule.controller('showGantt',['$scope','$mdDialog',
    function($scope,$mdDialog){
        $mdDialog.show({
            controller: "ctrlTeam",
            templateUrl: 'views/planning/modalTeam.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true

        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
}]);




