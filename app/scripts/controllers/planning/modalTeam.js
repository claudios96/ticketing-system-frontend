mainAngularModule.controller('ctrlTeam',['$scope','$mdDialog','AuthFactory','$location','$sessionStorage', 'PlanningDataFactory', '$state', 'myService', 'TeamDataFactory',
    function($scope,$mdDialog,AuthFactory,$location,$sessionStorage, PlanningDataFactory, $state, myService, TeamDataFactory){

    $scope.myTeams = null;
    $scope.result = true;

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {

            $mdDialog.hide(answer);

    };


    $scope.getTeam = function () {

        var init = function () {
            var param = {};
            console.log("auth info", AuthFactory.getAuthInfo());
            if (AuthFactory.getAuthInfo().userRole === 'TEAM_COORDINATOR') {
                TeamDataFactory.GetAll(function (response) {

                    //if (response.status === 200) {
                        $scope.myTeams = response;
                        console.log("teams", $scope.myTeams );
                        if($scope.myTeams.length === 0) {
                            $scope.result = false;

                        }else {
                            $scope.result = true;
                        }

                    //}
                }, function () {

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Operation failed')
                            .textContent("Error in getting team")
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok')
                            .targetEvent()
                    );
                });
            } else {
                PlanningDataFactory.getTeamsByTeamMember(AuthFactory.getAuthInfo().username, function (response) {

                    if (response.status === 200) {

                        $scope.myTeams = response.data;
                        console.log($scope.myTeams);
                        if ($scope.myTeams.length === 0) {
                            $scope.result = false;

                        } else {
                            $scope.result = true;
                        }

                    }
                }, function () {

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Operation failed')
                            .textContent("Error in getting team")
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok')
                            .targetEvent()
                    );
                });
            }
        };


        init();
    };



    $scope.getTeam();

    $scope.showGantt = function (team) {

        //myService.dataObj.team = team;

        $sessionStorage.team = team;


        $scope.cancel();
        if ($scope.myTeams.length === 0) {
            $state.go('dashboard.home', {}, {reload: 'dashboard.home'});
            //$location.path("/homeCustomer");
        }else {
            $state.go('gantt.show', {}, {reload: 'gantt.show'});
            //$location.path("/gantt");
        }


    };



}]);




