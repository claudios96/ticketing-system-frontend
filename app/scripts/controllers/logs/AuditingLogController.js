'use strict';

mainAngularModule
    .controller('AuditingLogController', ['$scope', 'AuditingLogDataFactory', 'ErrorStateRedirector', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        function ($scope, AuditingLogDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder) {

            var ctrl = this;

            ctrl.refreshAuditingLogs = refreshAuditingLogsFn;
            ctrl.removeAuditingLog = removeAuditingLogFn;
            ctrl.removeAuditingLogs = removeAuditingLogsFn;
            ctrl.showDetails = showDetailsFn;
            ctrl.auditingLogs = [];

            $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(5).notSortable()
            ];


            function init() {
                refreshAuditingLogsFn();
            }

            init();

            function refreshAuditingLogsFn() {
                console.log('refresh auditing records');
                AuditingLogDataFactory.GetAll(
                    function (logs) {
                        ctrl.auditingLogs = logs;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell recupero dei dati di auditing"});
                    });
            }

            function removeAuditingLogFn(id) {
                console.log('remove auditing record with id: ' + id);
                AuditingLogDataFactory.Remove(
                    id,
                    function () {
                        refreshAuditingLogsFn();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella rimozione del record di auditing"});
                    });
            }

            function removeAuditingLogsFn() {
                console.log('remove all auditing records');
                AuditingLogDataFactory.RemoveAll(
                    function () {
                        refreshAuditingLogsFn();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella rimozione dei record di auditing"});
                    });
            }

            function showDetailsFn(record) {
                ctrl.currentPayloads = record.payloads;
            }

        }]);