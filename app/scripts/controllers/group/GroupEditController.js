'use strict';

mainAngularModule
    .controller('GroupEditController', ['$scope', '$state', '$stateParams', 'GroupDataFactory', 'ErrorStateRedirector',
        function ($scope, $state, $stateParams, GroupDataFactory, ErrorStateRedirector) {

            var ctrl = this;
            ctrl.currentGroup = {};

            ctrl.updateGroup = updateGroupFn;

            init();

            function init() {
                setCurrentGroup();
            }

            function setCurrentGroup() {
                GroupDataFactory.GetSingle($stateParams.groupId,
                    function (group) {
                        ctrl.currentGroup = group;
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del gruppo"});
                    });
            }

            function updateGroupFn() {
                GroupDataFactory.Update(ctrl.currentGroup,
                    function (response) {
                        $state.go('group.list', {}, {reload: 'group.list'});
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'aggiornamento del gruppo"});
                    });
            }

        }]);

