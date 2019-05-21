mainAngularModule.controller('ctrlEscalation', ['$scope', 'PlanningDataFactory','$state', '$mdDialog',
    function($scope,PlanningDataFactory,$state, $mdDialog) {



    $scope.defineEscalation = function () {


        var init = function () {
            var param = {
                customerPriority: $scope.customerPriority,
                teamPriority: $scope.teamPriority,
                time: $scope.time
            };

            PlanningDataFactory.escalation(param, function (response) {

                if (response.status === 201) {
                    $scope.customerPriority = "";
                    $scope.teamPriority = "";
                    $scope.time = "";

                    $mdDialog.show()
                    {
                        var resp = $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Operation success')
                            .textContent('Escalation created')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok')
                            .targetEvent();

                        $mdDialog.show(resp).then(function () {
                            $state.go('dashboard.home', {}, {reload: 'dashboard.home'});
                        }, function () {
                            console.log("error");

                        });
                    }



                }
            }, function () {

                $scope.customerPriority = "";
                $scope.teamPriority = "";
                $scope.time = "";
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in escalation's creation")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
            });
        };

        init();




    }





}]);