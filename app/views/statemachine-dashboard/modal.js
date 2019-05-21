'use strict';

/**
 *  @ngdoc module
 *  @name  modal
 *  @description The module manages tthe modal mechanism.
 */
//var app = angular.module('modal', ['ui.bootstrap']);

/**
 *  @ngdoc controller
 *  @module modal
 *  @name  modalController
 *  @description The controller is used to show the modal popup.
 */
mainAngularModule.controller("modalController", ['$scope', '$modal', '$log', 'AuthFactory', 'TicketDataFactory', 'ErrorStateRedirector',
    function ($scope, $modal, $log, AuthFactory, TicketDataFactory, ErrorStateRedirector) {

        $scope.edit = [];
        /**
         * @ngdoc                   function
         * @name                    resetIndexes
         * @description             Function resets the index used for the 'Modify' function.
         *
         * @param arrayOfIndexes    items' indexes
         * @returns {*}             reset items' indexes
         */
        function resetIndexes(arrayOfIndexes) {

            angular.forEach(arrayOfIndexes, function (value, key) {
                arrayOfIndexes[key] = false;
            });

            return arrayOfIndexes;
        }


        /**
         * @ngdoc           function
         * @name            modifyTicket
         * @description     Function used for saving an edited ticket.
         *
         * @param item     selected item
         * @param index    iterator offset
         */
        $scope.modifyTicket = function (item, index) {
            $scope.edit = resetIndexes($scope.edit);
            /*console.log("item", item)
            $scope.editTicket = angular.copy(item);
            $scope.edit[index] = true;
            $scope.index = index;
            $scope.editTicket['customer'] = null;
            */
            //console.log("item", item);
            $scope.editTicket = {};
            $scope.editTicket['currentTicketStatus'] = item['currentTicketStatus'];
            $scope.editTicket['title'] = item['title'];
            $scope.editTicket['description'] = item['description'];
            $scope.editTicket['category'] = item['presumedType'];
            $scope.editTicket['tags'] = item['tags'];
            //$scope.editTicket['target'] = item['target'];
            $scope.editTicket['id'] = item['id'];
            //alert($scope.editTicket['id']);
            //$scope.editTicket['target'] = item['target'];
        };


        /**
     *  @ngdoc function
     *  @module modal
     *  @name showEditForm
     *  @description Modal for editing ticket
     *  @param item
     */
    $scope.showEditForm = function (item) {

        $scope.message = "Show Form Button Clicked";
        //  Save the item to modify it later.
        $scope.formItem = item;

        var modalInstance = $modal.open({
            templateUrl: '/views/statemachine-dashboard/modal/modal-form.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    /**
     *  @ngdoc function
     *  @module modal
     *  @name showInfoForm
     *  @description Modal to see the details about the ticket
     *  @param item
     */
    $scope.showInfoForm = function (item) {

        $scope.message = "Show Form Button Clicked";
        $scope.formItem = item;

        var modalInstance = $modal.open({
            templateUrl: '/views/statemachine-dashboard/modal/modal-info.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    /**
     *  @ngdoc function
     *  @module modal
     *  @name showMessageForm
     *  @description Modal to show Ticket's comments.
     *  @param item
     */
    $scope.showMessageForm = function (item) {
        $scope.terminateSending = false;
        $scope.formItem = item;
        $scope.newMessage = {};
        let date = Date.now();
        $scope.newMessage.timestamp = moment(date).format("DD/MM/YY, h:mm:ss");

        //  Author is inserted in teamCoordinatorController.sendNewTicketComment
        var modalInstance = $modal.open({
            templateUrl: '/views/statemachine-dashboard/modal/modal-message.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            backdrop: 'static',
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    /**
     *  @ngdoc function
     *  @module modal
     *  @name showInfoTeam
     *  @description Modal to show info of the Team.
     *  @param item
     */
    $scope.showInfoTeam = function (item) {
        $scope.formItem = item;

        var modalInstance = $modal.open({
            templateUrl: '/views/statemachine-dashboard/modal/modal-info-team.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    var ModalInstanceCtrl2 = ModalInstanceCtrl;

}]);


/**
 *
 *  @description    controller of the modal
 *  @param $state           page state
 *  @param $scope           controller scope
 *  @param $modalInstance   instance of the modal
 *  @param httpService      HTTP service
 *  @param restService      Rest API service
 *  @constructor
 */
var ModalInstanceCtrl = function ($state, $scope, $modalInstance, httpService, restService, TicketDataFactory, AuthFactory ) {
    $scope.form = {};

    /**
     *  @ngdoc function
     *  @name submitForm
     *  @description Modal to show info of the Team.
     */
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            console.log("EDIT", $scope.editTicket);
            //$scope.saveTicket($scope.editTicket, $scope.index);
  /*          if ($scope.editTicket.currentTicketStatus === 'EDIT')       // temporary hot fix
                $scope.editTicket.currentTicketStatus = 'VALIDATION';   // temporary hot fix
*/
            if ($scope.editTicket.currentTicketStatus === 'EDIT')       // temporary hot fix
                var action = 'Action1';   // temporary hot fix

//console.log("ticketttttt", $scope.editTicket);
            //Service that allows you to advance the ticket in the next state
            httpService.post(restService.changeTicketState + '/' +  $scope.editTicket.id + '/' + action)
                .then(function () {
                    $modalInstance.close('changed')
                }, function err() {
                    $modalInstance.close('error')
                });
            /*

            TicketDataFactory.Update($scope.editTicket,
                function () {
                    location.reload();

                }, function (error) {
                    ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'update del ticket"});

                });
*/
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    /**
     *  @ngdoc function
     *  @name submitForm
     *  @description Modal is shown when "ok" button is clicked.
     */
    $scope.messageOk = function () {
        $scope.sendNewTicketComment($scope.formItem.id, $scope.newMessage);
        $scope.terminateSending = true;
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
     *  @ngdoc function
     *  @name closeMessageModal
     *  @description Modal is dismissed with reason 'closed'.
     */
    $scope.closeMessageModal = function () {
        $modalInstance.dismiss("closed");

        //riduco i reload della pagina: reload solo quando
        //inserisco un commento o la textarea non è vuota
        if ($scope.newMessage.description) {
            $state.reload();
        }

    };

    /**
     *  @ngdoc function
     *  @name sendNewTicketComment
     *  @description Modal to post new comment of the Ticket.
     */
    //TODO Aggiungere success
    $scope.sendNewTicketComment = function (ticketID, msg) {
        //msg['eventGenerator'] = JSON.parse(sessionStorage.getItem('userInformation'));
        //msg['eventGenerator'] = AuthFactory.getAuthInfo().userId;
        httpService.post(restService.insertComment + '/' + ticketID + '/' + AuthFactory.getAuthInfo().userId, msg)
            .then(function (data) {
                    //$route.reload();
                },
                function (err) {
                    window.alert("Error!")
                })
    };



    /**
     *  @ngdoc function
     *  @module modal
     *  @name showMessageForm
     *  @description Modal to show Ticket's comments.
     *  @param item
     */
    $scope.showMessageForm = function (item) {
        $scope.terminateSending = false;
        $scope.formItem = item;
        $scope.newMessage = {};
        let date = Date.now();
        $scope.newMessage.timestamp = moment(date).format("DD/MM/YY, h:mm:ss");

        //  Author is inserted in teamCoordinatorController.sendNewTicketComment
        var modalInstance = $modal.open({
            templateUrl: '/modal/modal-message.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            backdrop: 'static',
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

};


