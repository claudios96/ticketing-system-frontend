'use strict';

mainAngularModule.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('productsoftware', {
                abstract: true,
                url: '/productsoftware',
                templateUrl: 'views/dashboard/main.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('productsoftware.list', {
                url: '/list',
                templateUrl: 'views/productsoftware/productsoftware-list.html',
                controller: 'ProductSoftwareListCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('software_view');
                    }
                }
            })
            .state('productsoftware.create', {
                url: '/create',
                templateUrl: 'views/productsoftware/productsoftware-create.html',
                controller: 'ProductSoftwareCreateCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('software_create');
                    }
                }
            })
            .state('productsoftware.edit', {
                url: '/{spId:int}/edit',
                templateUrl: 'views/productsoftware/productsoftware-edit.html',
                controller: 'ProductSoftwareEditCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    acl: function (AclRouteProtector) {
                        return AclRouteProtector.checkRoutePermission('software_update');
                    }
                }
            })
    }]);