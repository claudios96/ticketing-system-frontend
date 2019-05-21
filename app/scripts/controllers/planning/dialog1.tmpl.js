mainAngularModule.controller('DialogController',['$scope','myService','$mdDialog','PlanningDataFactory',function($scope,myService,$mdDialog,PlanningDataFactory){

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    $scope.idTick = myService.dataObj;


    var init = function () {
        var param = {};
        PlanningDataFactory.getDetailsTicket(param, $scope.idTick.id, function (response) {

            if (response.status === 200) {
                $scope.ticket = response.data;


            }

        }, function () {

            alert("error in show details");
        });
    };

    init();


        $scope.showRelationTicket = function () {

            var param = {};
            PlanningDataFactory.getRelationTicket(param, function (response) {

                //$scope.items = data;
                if (response.status === 200) {
                    $scope.relationName = response.data;
                }
            }, function () {

                alert("Error getting relation's name");
            });


        };

        $scope.showRelationCustomTicket = function (ticketId) {
            var param = {};
            PlanningDataFactory.getRelationCustomTicket(param, ticketId, function (response) {

                if (response.status === 200) {
                    $scope.relTicket = response.data;
                }
            }, function () {

                alert("Error getting relation's name");
            });
        };

        $scope.relationAllForThis = function() {

            $scope.showRelationTicket();

            $scope.showRelationCustomTicket($scope.ticket.id);

            init();
        }

}]);




