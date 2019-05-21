

mainAngularModule.controller('ctrlQueue', ['$scope', 'PlanningDataFactory',
    function($scope,PlanningDataFactory) {

    $scope.records;

    $scope.showQueue = function () {

        console.log("sono in show queue " );


        var param = {};

        var init = function () {

            PlanningDataFactory.getQueue(param, function (response) {

                if (response.status === 200) {
                    $scope.result = false;

                    $scope.records = response.data;
                    console.log(response.data);


                    $scope.resultNegative = true;
                }

            }, function () {

                $scope.resultNegative=false;

                $scope.result=true;
            });
        };

        init();


    };


    $scope.showQueue();

}]);