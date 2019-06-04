'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('chat', {
                url: '/chat',
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
