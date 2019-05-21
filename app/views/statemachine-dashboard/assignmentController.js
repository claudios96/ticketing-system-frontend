
/**
 * @ngdoc           controller
 * @name            AssignmentModalCtrl
 * @description     Controller for the "assignment" modal
 *
 * @param $scope                $scope
 * @param $modalInstance        $modalInstance
 * @param getState              the next state to which the ticket is to be sent
 * @param getAction             the "action" related to the new state
 * @param getRole               the role in charge of managing the ticket in the new state
 * @param getTicket             the ticket itself
 * @param restService           restService
 * @param httpService           httpService
 */
var AssignmentModalCtrl = function ($scope, $modalInstance, getState, getAction, getRole, getTicket, restService, httpService, AuthFactory, ToasterNotifierHandler) {
//mainAngularModule.controller('AssignmentModalCtrl', ['$scope', '$modalInstance', 'getState', 'getAction', 'getRole', 'getTicket', 'restService', 'httpService',
//    function ($scope, $modalInstance, getState, getAction, getRole, getTicket, restService, httpService) {
    const ctrl = this;

    //Initial value
    $scope.membersList = [];
    ctrl.date = new Date();
    ctrl.duration = 0;


    //In the future these values ​​will be recovered from the backend
    $scope.priorityList = [{"id": "1", "name": "LOW"}, {"id": "2", "name": "AVERAGE"}, {"id": "3", "name": "HIGH"}];
    $scope.difficultyList = [{"id": "1", "name": "LOW"}, {"id": "2", "name": "MEDIUM"}, {"id": "3", "name": "HIGH"}];
    $scope.categoryList = getTicket.target.categories;


    $scope.cancelAssignment = function () {
        $modalInstance.dismiss('cancel');
    };

    /**
     * @ngdoc           function
     * @name            changeTicketDifficulty
     * @description     This function allows to change the param "difficulty" of a ticket, sending a request to the backend
     *
     * @param difficulty        new difficulty
     * @param ticket            the ticket itself
     */
    var changeTicketDifficulty = function (difficulty, ticket) {
        httpService.put(restService.changeTicketDifficulty + '/' + difficulty, ticket.id)
            .then(function () {
                $modalInstance.close('assigned')
            }, function err() {
                $modalInstance.close('error')
            });
    };

    /**
     * @ngdoc           function
     * @name            setInternalPriorityAndType
     * @description     This function allows to change the params "priority" and "type" of a ticket
     *
     * @param priority      new priority
     * @param ticket        ticket itself
     * @param type          new type
     */
    var setInternalPriorityAndType = function (priority, ticket, type) {
        httpService.put(restService.createTicket + '/changePriorityAndType/' + priority + '/' + type, ticket.id)
            .then(function () {
                $modalInstance.close('assigned')
            }, function err() {
                $modalInstance.close('error')
            });
    };

    /**
     *  @ngdoc function
     *  @name cancel
     *  @description Modal is dismissed with reason 'cancel'.
     */
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /**
     * @ngdoc           function
     * @name            continueAssignment
     * @description     This function is used to perform the true change of status of a ticket.
     *
     */
    $scope.continueAssignment = function () {

        //When a ticket is sent back to the customer, the resolver user is set to 0
        let resolverID = "0";
        if ($scope.membersList.length > 0) {
            resolverID = $scope.membersList.selected.id;
        }
        var month, d, param;

        if (ctrl.date) {
            month = ctrl.date.getMonth() + 1;
            d = ctrl.date.getDate() + "-" + month + "-" + ctrl.date.getFullYear();
            //d = encodeURIComponent(d);
            //alert(d);
        }
        if (ctrl.duration) {
            param = {
                id: $scope.ticket,
                durationEstimation: ctrl.duration
            };
        }
//alert(d);
  //      alert(param);
        if (d && param) {
            //httpService.post(restService.getPlanningAndChangeTicketState + '/' + getTicket.id + '/' + getAction + '/' + resolverID + '/' + ctrl.duration + '/' + d + '/' + AuthFactory.getAuthInfo().username, param).then(function(response) {
            httpService.post(restService.getPlanningAndChangeTicketState + '/' + getTicket.id + '/' + getAction + '/' + resolverID + '/' + ctrl.duration + '/' + d + '/' + $scope.membersList.selected.username, param).then(function(response) {
           // PlanningDataFactory.getPlanningAndChangeTicketState(param,d,ctrl.duration,getTicket.id, getAction, resolverID, function (response) {

                if (response.status === 200) {
                    $scope.cancel();
                }
            }, function (err) {

                var messageError = null;

                if (err.status === 406) {
                    messageError = "Planning failed following day not available: ";

                    for (var g = 0; g < err.data.length; g++) {

                        messageError = messageError + err.data[g].keyGanttDay.day + " " + ";";

                    }
                    ToasterNotifierHandler.showErrorToast(messageError);
                }

                if (err.status === 424) {

                    var init = function () {
                        var param = {};
                        PlanningDataFactory.getFatherTicket(param, $scope.ticket, function (response) {
                            messageError = "Planning failed. Need to resolve the following ticket first: ";
                            if (response.status === 200) {

                                for (var g = 0; g < response.data.length; g++) {
                                    messageError = messageError + response.data[g].id + " " + response.data[g].title + " " + ";";

                                }
                                ToasterNotifierHandler.showErrorToast(messageError);

                            }
                        }, function () {

                            messageError = "Planning failed internal error cause";

                            ToasterNotifierHandler.showErrorToast(messageError);
                        });
                    };
                }
            });

        } else {
            //Service that allows you to advance the ticket in the next state
            //alert(getAction);
            httpService.post(restService.changeTicketState + '/' + getTicket.id + '/' + getAction + '/' + resolverID)
                .then(function () {
                    //check if difficulty adn priority have changed
                    if (!angular.isUndefined($scope.difficultyList.selected))
                        changeTicketDifficulty($scope.difficultyList.selected.name, getTicket);
                    if (!angular.isUndefined($scope.priorityList.selected))
                        setInternalPriorityAndType($scope.priorityList.selected.name, getTicket, $scope.categoryList.selected);
                    $modalInstance.close('assigned')
                }, function err() {
                    $modalInstance.close('error')
                });
        }

    };


    /**
     * @ngdoc           function
     * @name            searchResolverUsers
     * @description     This function finds all the internal Users to which the ticket can be assigned
     *
     * @param role              the name of the role (i.e. 'TeamMember')
     * @returns {Array}         all members found
     */
    $scope.searchResolverUsers = function () {
        if (getRole !== "CUSTOMER") {
            httpService.get(restService.getEmployedUserByRole + '/' + getRole)
                .then(function (response) {
                    $scope.membersList = response.data;
                }, function err(response) {

                });
        } else {
            return [];
        }
    };

    //Used to populate the "SELECT"
    $scope.searchResolverUsers();
};

//]);