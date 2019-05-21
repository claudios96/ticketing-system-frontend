'use strict';

mainAngularModule.run(['$rootScope', 'DEBUG', 'authManager', 'DTDefaultOptions', 'AclService', 'ErrorStateRedirector', '$transitions',
    function ($rootScope, DEBUG, authManager, DTDefaultOptions, AclService, ErrorStateRedirector, $transitions) {

        var aclData = {
            ROLE_GROUP_COORDINATOR: ['group_view', 'group_create', 'group_update', 'group_delete', 'group_permission', 'group_details'],
            ROLE_GROUP_READER: ['group_view'],

            ROLE_SOFTWARE_PRODUCT_COORDINATOR: ['software_view', 'software_create', 'software_update', 'software_delete', 'software_permission'],
            ROLE_SOFTWARE_PRODUCT_READER: ['software_view'],

            ROLE_TEAM_COORDINATOR: ['team_view', 'team_create', 'team_update', 'team_delete', 'team_permission', 'team_assign', 'gantt', 'planning', 'state_machine_dashboard', 'workflow'],
            ROLE_TEAM_READER: ['team_view'],
            ROLE_TEAM_MEMBER: ['user_info', 'ticket_assign', 'gantt', 'planning', 'state_machine_dashboard', 'workflow'],
            ROLE_TEAM_LEADER: ['user_info', 'ticket_assign', 'gantt', 'planning', 'state_machine_dashboard', 'workflow'],

            ROLE_TICKET_COORDINATOR: ['ticket_view', 'ticket_create', 'ticket_update', 'ticket_delete', 'ticket_permission'],
            ROLE_TICKET_READER: ['ticket_view'],

            ROLE_ADMIN: ['log_view', 'log_delete', 'users_list', 'user_create', 'user_permission', 'user_info', 'show_queue', 'define_escalation', 'new_relation', 'define_relation', 'state_machine_create'],
            //ROLE_ASSISTANT: ['users_list'],
            ROLE_CUSTOMER: ['ticket_create', 'ticket_view', 'user_info']
        };
        AclService.setAbilities(aclData);
        $rootScope.hasPermission = AclService.can;

        $rootScope.isDebug = DEBUG;
        console.info('isDebug: ' + $rootScope.isDebug);

        $transitions.onError({}, ($transition$) => {
            var toStateName = $transition$.to().name;
            var fromStateName = $transition$.from().name;
            if (toStateName != fromStateName) {

                let Msg = "Rotta non autorizzata";
                if (DEBUG) {
                    Msg += ": " + toStateName;
                }
                ErrorStateRedirector.GoToErrorPage({Messaggio: Msg});
            }
        });

        authManager.checkAuthOnRefresh();
        authManager.redirectWhenUnauthenticated();

        DTDefaultOptions.setLanguageSource('//cdn.datatables.net/plug-ins/1.10.9/i18n/Italian.json');

    }]);