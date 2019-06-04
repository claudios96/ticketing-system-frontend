'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('chat', {
                abstract: true,
                url: '/chat',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            // TODO : aggiungere uno stato per ogni tipologia di chat prodotto/leader-member/team
            .state('chat.visualizza', {
                url: '/{chatId:int}/{chatType:string}/chat_visualizza',
                templateUrl: 'views/chat/chat.html',
                controller: 'ChatCtrl',
                controllerAs: 'ctrl',
                /*resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('ticket_view');
                    }
                }*/
            })

    }]);
