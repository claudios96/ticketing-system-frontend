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

            .state('chat.visualizza', {
                url: '/{chatId:int}/{chatType:string}/chat_visualizza',
                templateUrl: 'views/chat/chat.html',
                controller: 'ChatCtrl',
                controllerAs: 'ctrl',

            })

    }]);
