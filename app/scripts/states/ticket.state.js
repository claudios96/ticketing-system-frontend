'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('ticket', {
                abstract: true,
                url: '/ticket',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('ticket.list', {
                url: '/list',
                templateUrl: 'views/ticket/ticket-list.html',
                controller: 'TicketListCtrl',
                controllerAs: 'ctrl',
                /*resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('ticket_view');
                    }
                }*/
            })
            .state('ticket.create', {
                url: '/create',
                templateUrl: 'views/ticket/ticket-create.html',
                controller: 'TicketCreateCtrl',
                controllerAs: 'ctrl',
                /*resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('ticket_create');
                    }
                }*/
            })
            .state('ticket.ofCurrentAssistant', {
                url: '/ofCurrentAssistant',
                templateUrl: 'views/ticket/ticket-list-acquired.html',
                controller: 'TicketListOfCurrentAssistantCtrl',
                controllerAs: 'ctrl'
            })
            .state('ticket.edit', {
                url: '/{ticketId: int}/edit',
                templateUrl: 'views/ticket/ticket-edit.html',
                controller: 'TicketEditCtrl',
                controllerAs: 'ctrl'
            })
            .state('ticket.customer', {
                url: '/customer',
                templateUrl: 'views/ticket/ticket-list-customer.html',
                controller: 'TicketListCustomerCtrl',
                controllerAs: 'ctrl',
            });
    }]);