'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('relation', {
                abstract: true,
                url: '/relation',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('relation.new', {
                url: '/defineNewRelation',
                templateUrl: "views/planning/defineNewRelation.html",
                controller: "ctrlNewRelation",
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('define_relation');
                    }
                }
            })
            .state('relation.create', {
                controller:"ctrlRelation",
                url: '/createNewRelation',
                templateUrl: 'views/planning/relation.html',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('new_relation');
                    }
                }
            })
            .state('relation.view', {
                templateUrl:"views/planning/dialog1.tmpl.html",
                url: '/relationview',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('new_relation');
                    }
                }
            })
    }]);