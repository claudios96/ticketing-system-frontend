mainAngularModule.controller('ctrlPlanning',['$scope','myService','PlanningDataFactory','AuthFactory','$state','$mdDialog', 'ToasterNotifierHandler',
    function($scope,myService,PlanningDataFactory,AuthFactory, $state,$mdDialog, ToasterNotifierHandler){

    $scope.myTeams = null;
    $scope.penTicket = null;
    $scope.date=null;


    $scope.date =new Date();

    this.isOpen = false;

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
            //var param = {};
            PlanningDataFactory.getTeamsByTeamMember(AuthFactory.getAuthInfo().username, function (response) {

                if (response.status === 200) {

                    $scope.myTeams = response.data;


                }
            }, function () {
/*
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
                */
            });
        };


        init();
    };



    $scope.getTeam();

    $scope.getPendingTicket = function () {

        var init = function () {
            var param = {};
            PlanningDataFactory.getQueue(param, function (response) {

                if (response.status === 200) {

                    $scope.penTicket = response.data;


                }
            }, function () {
/*
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in getting pending ticket")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
                */
            });
        };


        init();
    };

    $scope.getPendingTicket();


    $scope.sendPlanning= function () {
        var month = $scope.date.getMonth() + 1;
       var d= $scope.date.getDate() + "-"+ month + "-"+$scope.date.getFullYear();
        console.log("DATAAAAAAAAAA"+ d);

        var init = function () {
            var param = {
                        id:$scope.ticket,
                        durationEstimation: $scope.duration,
                        dateExecutionStart: d,
                        team:{
                            name:$scope.team.name

                        },
                        currentTicketStatus:'EXECUTION'
            };

            PlanningDataFactory.getPlanning(param,$scope.team.name,d,$scope.duration,$scope.ticket, function (response) {

                if (response.status === 200) {


                    $scope.cancel();
                   // $route.reload();


                }


            }, function (err) {

                var messageError = null;

                    if(err.status === 406) {
                        messageError = "Planning failed following day not available: ";

                        for(var g = 0; g < err.data.length; g++){

                            messageError = messageError + err.data[g].keyGanttDay.day +" " + ";" ;

                        }
                        /*
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation failed')
                                .textContent(messageError)
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );
                        */
                        ToasterNotifierHandler.showErrorToast(messageError);
                    }

                    if (err.status === 424) {

                        var init = function () {
                            var param = {};
                            PlanningDataFactory.getFatherTicket(param,$scope.ticket, function (response) {
                                messageError = "Planning failed. Need to resolve the following ticket first: "  ;
                                if (response.status === 200) {

                                    for(var g = 0; g < response.data.length; g++){
                                        messageError = messageError + response.data[g].id + " " + response.data[g].title + " " +  ";";

                                    }
/*
                                    $mdDialog.show(
                                        $mdDialog.alert()
                                            .parent(angular.element(document.querySelector('#popupContainer')))
                                            .clickOutsideToClose(true)
                                            .title('Operation failed')
                                            .textContent(messageError)
                                            .ariaLabel('Alert Dialog Demo')
                                            .multiple(true)
                                            .ok('Ok')
                                            .targetEvent()
                                    );
                                    */

                                    ToasterNotifierHandler.showErrorToast(messageError);

                                }
                            }, function () {

                                messageError = "Planning failed internal error cause";
/*
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .title('Operation failed')
                                        .textContent(messageError)
                                        .ariaLabel('Alert Dialog Demo')
                                        .multiple(true)
                                        .ok('Ok')
                                        .targetEvent()
                                );
*/
                        ToasterNotifierHandler.showErrorToast(messageError);
                            });
                        };

                        init();


                    }



            });
        };

        init();


    };

    $scope.showGantt= function () {



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
/*
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
                */
                ToasterNotifierHandler.showErrorToast("Error in gantt");
            });
        };

        init();
    };





}]);




