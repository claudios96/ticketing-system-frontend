'use strict';

var mainAngularModule = angular
    .module('TicketingSystemApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ui.select',
        'datatables',
        'angular-jwt',
        'swxSessionStorage',
        'toaster',
        'mm.acl',

        'ngMaterial', 'ngAnimate',
        'ngTagsInput',

        'drag-and-drop'

    ]);
