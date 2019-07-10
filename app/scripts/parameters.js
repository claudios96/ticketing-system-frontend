'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
mainAngularModule
    .constant('DEBUG', false)
    //.constant('BACKEND_BASE_URL','http://192.168.10.210:8200/esempioisssr')
    .constant('BACKEND_BASE_URL', 'http://172.20.0.50:8200/ticketingsystem')
    //.constant('BACKEND_BASE_URL','http://localhost:3000')
    .constant('SOFTWARE_PRODUCTS_ENDPOINT_URL', '/targets/')
    .constant('TEAM_ENDPOINT_URL', '/teams/')
    .constant('USER_ENDPOINT_URL', '/users/')
    .constant('TICKET_ENDPOINT_URL', '/tickets/')
    .constant('LOGIN_ENDPOINT_URL', '/public/login/')
    .constant('REGISTRATION_ENDPOINT_URL', '/public/register/')
    .constant('PERMS_ENDPOINT_URL', '/permissions/')
    .constant('GROUP_ENDPOINT_URL', '/groups/')
    .constant('ACLSID_ENDPOINT_URL', '/acl-sid/')
    .constant('ACL_RECORDS_ENDPOINT_URL', '/acl-records/')
    .constant('REQUESTS_LOGS_ENDPOINT_URL', '/requests-logs/')
    .constant('AUDITING_ENDPOINT_URL', '/auditing-logs/')
    .constant('CHAT_ENDPOINT_URL', '/chat/')


    .constant('STATE_MACHINE_ENDPOINT_URL', '/state_machine')

;