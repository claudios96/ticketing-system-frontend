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
        'RequestsLogsController',
        ['$scope', 'RequestsLogsDataFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ErrorStateRedirector',
            function ($scope, RequestsLogsDataFactory, DTOptionsBuilder, DTColumnDefBuilder, ErrorStateRedirector) {

                let ctrl = this;
                ctrl.search = {

                };

                $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
                $scope.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(7).notSortable()];


                function refreshRequestsLogsFn() {
                    console.log('refresh Requests logs');
                    RequestsLogsDataFactory.GetAll(
                        function (response) {
                            ctrl.requestsLogs = response;
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero delle richieste"});
                        });

                }

                function removeRequestLogFn(id) {
                    console.log('remove request log with id: ' + id);
                    RequestsLogsDataFactory.Remove(id,
                        function () {
                            refreshRequestsLogsFn();
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella rimozione della richiesta"});
                        });
                }

                function removeRequestsLogsFn() {
                    console.log('remove all requests logs');
                    RequestsLogsDataFactory.RemoveAll(
                        function () {
                            refreshRequestsLogsFn();
                        }, function (error) {
                            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'eliminazione delle richieste"});
                        });
                }

                function init() {
                    refreshRequestsLogsFn();
                    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
                        .withDisplayLength(5).withOption('lengthMenu', [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Tutti"]]);
                }


                ctrl.refreshRequestsLogs = refreshRequestsLogsFn;
                ctrl.removeRequestLog = removeRequestLogFn;
                ctrl.removeRequestsLogs = removeRequestsLogsFn;


                init();

            }]);