mainAngularModule.controller('ctrlNewRelation', ['$scope', 'PlanningDataFactory','$state', '$mdDialog',
    function($scope, PlanningDataFactory, $state, $mdDialog) {


    $scope.cyclic = false;

    $scope.createNewRel = function() {


        var init = function () {
            var param = {
                name: $scope.name,
                cyclic: $scope.cyclic
            };
            PlanningDataFactory.newRelation(param, function (response) {
                if (response.status === 201) {

                    //alert("success");

                    $mdDialog.show()
                    {

                        var resp = $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Operation success')
                            .textContent('Relation created with success')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok')
                            .targetEvent();

                        $mdDialog.show(resp).then(function () {
                            //$location.path("/relation");
                            $state.go('relation.create', {}, {reload: 'relation.create'});
                        }, function () {
                            console.log("error");

                        });
                    };
                }


            }, function (err) {

                if (err.status === 302) {

                    //alert("failure");

                    $mdDialog.show()
                    {
                        var resp = $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Operation failed')
                            .textContent('Error in relation\'s creation')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok')
                            .targetEvent();

                        $mdDialog.show(resp).then(function () {
                            $state.go('relation.new', {}, {reload: 'relation.new'});
                        }, function () {
                            console.log("error");

                        });
                    };
                }
            });
        };

        init();

    }

}]);
