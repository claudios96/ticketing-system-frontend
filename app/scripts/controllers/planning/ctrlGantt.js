'use strict';


mainAngularModule.controller('MainGanttCtrl', ['$scope', 'PlanningDataFactory','$sessionStorage', '$mdDialog', '$state',
    function($scope,PlanningDataFactory,$sessionStorage, $mdDialog, $state) {

    $scope.makeVisible=true;


    $scope.tasks = {

        data: []
    };
/*
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);

    };
*/
/*
    $scope.planning = function(){
        $mdDialog.show({
            controller: "ctrlPlanning",
            templateUrl: 'html/modalPlanning.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true

        });
    };

*/
    $scope.getGantt = function() {


        //$scope.team = myService.dataObj.team;

        $scope.team = $sessionStorage.team;

        if (!$scope.team) {
            $state.go('gantt.list', {}, {reload: 'gantt.list'});
        }

        var init = function () {
            var param = {};
            var i;

            PlanningDataFactory.getTicketGantt(param,$scope.team, function (response) {

                if (response.status === 200) {

                    for(i = 0; i < response.data.length; i++) {

                        var tick = {};

                        tick.id = response.data[i].id;
                        tick.text = response.data[i].title;
                        tick.start_date = response.data[i].dateExecutionStart;
                        tick.duration = response.data[i].durationEstimation;
                        $scope.tasks.data.push(tick);

                    }


                }


            }, function () {

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in gantt")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
//alert("Error");
            });
        };

        init();

    };

    $scope.getGantt();







}]);