'use strict';

mainAngularModule
    .controller('PermissionGroupController', ['$scope', '$state', 'PermissionDataFactory', 'ErrorStateRedirector', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        function ($scope, $state, PermissionDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder
        ) {

            $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(7).notSortable()
            ];

        }]);