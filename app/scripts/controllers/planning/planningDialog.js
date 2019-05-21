mainAngularModule.controller('planningDialog',['$mdDialog', function($mdDialog){

    $mdDialog.show({
        controller: "ctrlPlanning",
        templateUrl: 'views/planning/modalPlanning.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
    });
}]);




