'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller(
        'AclRecordsController',
        ['$scope', 'ACLRecordsDataFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ErrorStateRedirector',
            function ($scope, ACLRecordsDataFactory, DTOptionsBuilder, DTColumnDefBuilder, ErrorStateRedirector) {
                let ctrl = this;
                ctrl.refreshRecords = refreshRecordsFn;
                ctrl.removeRecord = removeRecordFn;
                ctrl.removeAllRecords = removeAllRecordFn;
                ctrl.search = {
                    granting: true,
                    sid: '',
                    type: ''
                };

                $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
                $scope.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(7).notSortable()
                ];
                init();


                function init() {
                    refreshRecordsFn();
                    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
                        .withDisplayLength(5).withOption('lengthMenu', [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Tutti"]]);
                }

                function refreshRecordsFn() {
                    console.log('refresh Records');
                    ACLRecordsDataFactory.GetAll(
                        function (response) {
                            ctrl.aclRecords = response;
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei record"});
                        });

                }

                function removeRecordFn(id) {
                    console.log('remove record with id: ' + id);
                    ACLRecordsDataFactory.Remove(id,
                        function () {
                            refreshRecordsFn();
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella rimozione del record"});
                        });

                }

                function removeAllRecordFn() {
                    console.log('remove all records');
                    ACLRecordsDataFactory.RemoveAll(
                        function () {
                            refreshRecordsFn();
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella rimozione dei record"});
                        });

                }


            }]
    );