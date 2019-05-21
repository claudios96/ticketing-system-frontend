
mainAngularModule.controller('ctrlRelation', ['$scope', 'PlanningDataFactory','$location', '$mdDialog', 'ToasterNotifierHandler', '$state',
    function( $scope, PlanningDataFactory, $location, $mdDialog, ToasterNotifierHandler, $state) {


        //tickets available for dependency
        $scope.ticketsforDep=null;
        //tickets available for equality
        $scope.ticketsforEqu=null;
        //tickets available for regression
        $scope.ticketsforReg=null;

        $scope.allRelation=null;
        $scope.allTick=null;
        $scope.relations = {};
        $scope.ticketsForRel=null;



       $scope.rel = ["equality","dependency","regression"];


        $scope.getAllRelation = function() {

             var init = function () {
                 var param = {};

                 PlanningDataFactory.getAllRel(param, function (response) {

                     if (response.status === 200)
                         $scope.allRelation =  response.data;

                 }, function () {
/*
                    //alert("success");

                     $mdDialog.show(
                         $mdDialog.alert()
                             .parent(angular.element(document.querySelector('#popupContainer')))
                             .clickOutsideToClose(true)
                             .title('Operation failed')
                             .textContent("Error getting relations")
                             .ariaLabel('Alert Dialog Demo')
                             .ok('Ok')
                             .targetEvent()
                     );
*/
                 });
             };

             init();



        };


         $scope.getAllRelation();


    //returns tickets available for dependency
    $scope.getTicketForDependency = function() {


        var init = function () {
            var param = {};

            PlanningDataFactory.getTicketForDep(param, function (response) {

                //$scope.items = data;
                if (response.status === 200)
                    $scope.ticketsforDep =  response.data;

            }, function () {

                //alert ("failure");
/*
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error getting tickets")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
*/
            });
        };

        init();


    };

    //returns tickets available for regression
    $scope.getTicketForRegression = function() {


        var init = function () {
            var param = {};

            PlanningDataFactory.getTicketForReg(param, function (response) {

                //$scope.items = data;
                if (response.status === 200)
                    $scope.ticketsforReg =  response.data;

            }, function () {

/*
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error getting tickets")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
                */
            });
        };

        init();

    };

    //returns tickets available for equality
    $scope.getTicketForEquality = function() {



        var init = function () {
            var param = {};

            PlanningDataFactory.getTicketForEqual(param, function (response) {

                if (response.status === 200)
                    $scope.ticketsforEqu =  response.data;

            }, function () {
/*

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error getting tickets")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
                */
            });
        };

        init();



    };

    $scope.getTicketForDependency();
    $scope.getTicketForEquality();
    $scope.getTicketForRegression();




    $scope.valueRelation = function (name, ticketId) {
        console.log("dati..." + name);
        $scope.relations[ticketId] = name;
    };

    $scope.idTicket = function (id) {
        console.log("dati..." + id);
        $scope.idChoose = id;
    };

    $scope.createRel = function (index,id) {

        var choosenTable;
        if (index != null) {
            choosenTable = $scope.ticketsForRel[index].id;
        }else if (id != null) {
            choosenTable = id;
        }
        //alert(id);
        console.log("relation in createRel = " + $scope.relations[choosenTable]);

        if ($scope.relations[choosenTable]==='equality') {


            var init = function () {
                //alert($scope.idChoose);
                var param = {
                    sameTicket: { id: $scope.idChoose}
                };
                PlanningDataFactory.putRelationEqual(param,choosenTable, function (response) {
/*
                    if (response.status === 200) {

                        if (index != null) {
                            $mdDialog.show()
                            {
                                var resp = $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation success')
                                    .textContent('Relation correctly created!')
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('Ok')
                                    .targetEvent();

                                $mdDialog.show(resp).then(function () {
                                    $location.path("/showAllTickets");
                                }, function () {
                                    console.log("error");

                                });
                            };

                        }else{

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation success')
                                    .textContent("Relation correctly created!")
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );



                        }


                    }

*/
                }, function (err) {
/*
                    if (err.status === 401) {

                       // $location.path("/relation");



                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation failed')
                                .textContent("Cannot create equality with the same ticket")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );
                    } else {

                        //$location.path("/relation");

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation failed')
                                .textContent("Error in creation")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );
                    }
                    */
                });
            };

            init();

        }else if ($scope.relations[choosenTable]=== 'dependency') {


            var init = function () {
                var param = {};
                PlanningDataFactory.putRelationDep(param,choosenTable,$scope.idChoose, function (response) {
/*
                 //   alert("OK");
                    if (response.status === 200){

                     //   alert("OK2");

                        if (index != null) {

                           // alert("OK3");
                            $mdDialog.show()
                            {
                                var resp = $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation success')
                                    .textContent('Relation correctly created!')
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('Ok')
                                    .targetEvent();

                                $mdDialog.show(resp).then(function () {
                                    $location.path("/showAllTickets");
                                }, function () {
                                    console.log("error");

                                });
                            };

                        }else{


                          //  $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            //alert("OK4");
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation success')
                                    .textContent("Relation correctly created!")
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );



                        }



                    }

*/



                }, function (err) {
/*
                    if (err.status === 424) {
                        if (err.data.length === 0) {
                            //$location.path("/relation");

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation failed')
                                    .textContent("Reflective relation is forbidden")
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );


                        } else {
                            var cicle = "" + err.data[0].id;
                            for (var i = 1; i < err.data.length; i++) {
                                cicle += ", " + err.data[i].id;
                            }
                            //$location.path("/relation");

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation failed')
                                    .textContent("Creation failed due to this cycle: " + cicle)
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );


                        }
                    }
                    */
                });
            };

            init();

        } else if ($scope.relations[choosenTable]==='regression') {



            var init = function () {
                var param = {};
                PlanningDataFactory.putRelationRegression(param,choosenTable,$scope.idChoose, function (response) {
/*
                    if (response.status === 200) {


                        if (index != null) {

                            $mdDialog.show()
                            {
                                var resp = $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation success')
                                    .textContent('Relation correctly created!')
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('Ok')
                                    .targetEvent();

                                $mdDialog.show(resp).then(function () {
                                    $location.path("/showAllTickets");
                                }, function () {
                                    console.log("error");

                                });
                            };

                        }else{

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation success')
                                    .textContent("Relation correctly created!")
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );



                        }

                    }
*/

                }, function (err) {
/*
                    if (err.status === 424) {

                        //$location.path("/relation");

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation failed')
                                .textContent("cannot create regression with the same ticket ")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );


                    }
                    */
                });
            };

            init();

        } else if ($scope.relations[choosenTable] !== null && $scope.relations[choosenTable] !== 'equality' && $scope.relations[choosenTable] !== 'regression' && $scope.relations[choosenTable] !== 'dependency') {



            var init = function () {
                var param = {
                    relation: {
                        name: $scope.relations[choosenTable]
                    },
                    fatherTicket: {
                        id: choosenTable
                    },
                    sonTicket: {
                        id: $scope.idChoose
                    }
                };
                PlanningDataFactory.putRelationCustom(param, function (response) {
/*
                    if (response.status === 201) {

                        console.log("Ok");

                        if (index != null) {

                            $mdDialog.show()
                            {
                                var resp = $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation success')
                                    .textContent('Relation correctly created!')
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('Ok')
                                    .targetEvent();

                                $mdDialog.show(resp).then(function () {
                                    $location.path("/showAllTickets");
                                }, function () {
                                    console.log("error");

                                });
                            };

                        }else{

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation success')
                                    .textContent("Relation correctly created!")
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );



                        }

                    }else if (response.status === 208) {


                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation failed')
                                .textContent("Relation already exist")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );
                    }
*/
                }, function (err) {
/*
                    if (err.status === 424) {
                        if (err.data.length === 0) {
                            //$location.path("/showAllTickets");

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation failed')
                                    .textContent("Reflective relation is forbidden")
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );
                        } else {
                            var cicle = "" + err.data[0].id;
                            for (var i = 1; i < err.data.length; i++) {
                                cicle += ", " + err.data[i].id;
                            }
                            //$location.path("/showAllTickets");
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation failed')
                                    .textContent("Creation failed due to this cycle: " + cicle)
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );

                        }
                    }
                    */
                });
            };

            init();

            }
    };


    //returns all tickets
    $scope.allTickets = function () {


        var param = {};

        var init = function () {

            PlanningDataFactory.getTickets(param, function (response) {

                if (response.status === 200) {

                    $scope.allTick = response.data;

                }
            }, function () {
/*
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in get tickets")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
                */
            });
        };

        init();
    };

    $scope.allTickets();

    $scope.allTicketsForRel = function () {


        var param = {};

        var init = function () {

            PlanningDataFactory.getTicketsForRel(param, function (response) {

                if (response.status === 200) {

                    $scope.ticketsForRel = response.data;

                }
            }, function () {
/*
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in get tickets for relation")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );*/
            });
        };

        init();
    };

    $scope.allTicketsForRel();


}]);