'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

mainAngularModule
    .directive('sidebar', ['AuthFactory', function (AuthFactory) {
        //console.log(AuthFactory);
        return {
            templateUrl: 'scripts/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope) {
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 0;
                $scope.multiCollapseVar = 0;
                $scope.userInfo = null;

                $scope.counter = 5;

                $scope.setSidebar = function () {
                    //console.log("entro nella setSidebar");
                    $scope.userInfo = AuthFactory.getAuthInfo();
                    console.log($scope.userInfo);
                    if ($scope.userInfo == null) {
                        //$state.go('login');
                        //} else if ($scope.userInfo.userType === 'admin') {
                    } else if ($scope.userInfo.userRole === 'ADMIN') {
                        $scope.sidebarList = {
                            lists: [
                                {
                                    "title": "Utente",
                                    "num": 5,
                                    "icon": "fa-user",
                                    item: [
                                        {
                                            "nome": "Inserisci Utente",
                                            "state": "user.create",
                                        },
                                        {
                                            "nome": "Elenco Utenti",
                                            "state": "user.list"
                                        },
                                        {
                                            "nome": "Informazioni Utente",
                                            "state": "user.info({userId:" + $scope.userInfo.userId + "})"
                                        },
                                        {
                                            "nome": "Guida Admin",
                                            "state": "admin.guide",
                                        }
                                    ]
                                },
                                {
                                    "title": "Ticket",
                                    "num": 6,
                                    "icon": "fa-ticket",
                                    item: [
                                        {
                                            "nome": "Inserisci Ticket",
                                            "state": "ticket.create"
                                        },
                                        {
                                            "nome": "Elenco Ticket",
                                            "state": "ticket.list"
                                        }
                                    ]
                                },
                                {
                                    "title": "Permessi",
                                    "num": 7,
                                    "icon": "fa-lock",
                                    item: [

                                        {
                                            "nome": "Gruppi",
                                            "state": "group.list"
                                        }
                                    ]
                                },
                                {
                                    "title": "Team",
                                    "num": 8,
                                    "icon": "fa-users",
                                    item: [
                                        {
                                            "nome": "Inserisci Team",
                                            "state": "team.create"
                                        },
                                        {
                                            "nome": "Elenco Team",
                                            "state": "team.list"
                                        }]
                                },
                                {
                                    "title": "Prodotto Software",
                                    "num": 9,
                                    "icon": "fa-desktop",
                                    item: [
                                        {
                                            "nome": "Inserisci Prodotto Software",
                                            "state": "productsoftware.create"
                                        },
                                        {
                                            "nome": "Elenco Prodotti Software",
                                            "state": "productsoftware.list"
                                        }]
                                },
                                {
                                    "title": "Logging",
                                    "num": 10,
                                    "icon": "fa-list-alt",
                                    item: [
                                        {
                                            "nome": "ACL logs",
                                            "state": "acl.logs"
                                        },
                                        {
                                            "nome": "Logging richieste",
                                            "state": "requestslogs.list"
                                        },
                                        {
                                            "nome": "Auditing logs",
                                            "state": "auditing.logs"
                                        }
                                    ]
                                },
                                {
                                    "title": "Relation",
                                    "num": 11,
                                    //"icon": "fa-list-alt",
                                    item: [
                                        {
                                            "nome": "Define new relation",
                                            "state": "relation.new"
                                        },
                                        {
                                            "nome": "Create relation",
                                            "state": "relation.create"
                                        }
                                    ]
                                },
                                {
                                    "title": "Escalation",
                                    "num": 12,
                                    //"icon": "fa-list-alt",
                                    item: [
                                        {
                                            "nome": "Define escalation",
                                            "state": "escalation.new"
                                        },
                                        {
                                            "nome": "Show queue",
                                            "state": "escalation.queue"
                                        }
                                    ]
                                },
                                {
                                    "title": "State Machine",
                                    "num": 13,
                                    //"icon": "fa-list-alt",
                                    item: [
                                        {
                                            "nome": "Create state machine",
                                            "state": "state_machine.create"
                                        }
                                    ]
                                }
                            ]
                        }
                        //} else if ($scope.userInfo.userType === "assistant") {
                    } else if ($scope.userInfo.userRole === 'TEAM_MEMBER') {
                        $scope.sidebarList = {
                            lists: [
                                {
                                    "title": "Utente",
                                    "num": 5,
                                    "icon": "fa-user",
                                    item: [
                                        {
                                            "nome": "Informazioni Utente",
                                            "state": "user.info({userId:" + $scope.userInfo.userId + "})"
                                        },
                                        {
                                            "nome": "Guida Utente",
                                            "state": "user.guide",
                                        }
                                    ]
                                },
                                {
                                    "title": "Ticket",
                                    "num": 6,
                                    "icon": "fa-ticket",
                                    item: [
                                        {
                                            "nome": "Elenco Ticket",
                                            "state": "ticket.list"
                                        },
                                        {
                                            "nome": "Ticket acquisiti",
                                            "state": "ticket.ofCurrentAssistant"
                                        }
                                    ]
                                },
                                {
                                    "title": "Team",
                                    "num": 7,
                                    "icon": "fa-users",
                                    item: [{
                                        "nome": "Informazioni Team",
                                        "state": "team.list"
                                    }]
                                },
                                {
                                    "title": "Prodotto Software",
                                    "num": 8,
                                    "icon": "fa-desktop",
                                    item: [
                                        {
                                            "nome": "Elenco Prodotti Software",
                                            "state": "productsoftware.list"
                                        }]
                                },
                                {
                                    "title": "Pianificazione",
                                    "num": 9,
                                    "icon": "fa-desktop",
                                    item: [
                                        {
                                            "nome": "Visualizza Gantt",
                                            "state": "gantt.list"
                                        }]
                                },
                                {
                                    "title": "Workflow",
                                    "num": 14,
                                    //"icon": "fa-list-alt",
                                    item: [
                                        {
                                            "nome": "Gestione workflow",
                                            "state": "workflow.dashboard"
                                        }
                                    ]
                                }
                            ]
                        }
                        //} else if ($scope.userInfo.userType === "customer") {
                    } else if ($scope.userInfo.userRole === 'CUSTOMER') {
                        $scope.sidebarList = {
                            lists: [
                                {
                                    "title": "Utente",
                                    "num": 5,
                                    "icon": "fa-user",
                                    item: [
                                        {
                                            "nome": "Informazioni Utente",
                                            "state": "user.info({userId:" + $scope.userInfo.userId + "})"
                                        },
                                        {
                                            "nome": "Guida Utente",
                                            "state": "user.guide",
                                        }
                                    ]
                                },
                                {
                                    "title": "Ticket",
                                    "num": 6,
                                    "icon": "fa-ticket",
                                    item: [{
                                        "nome": "Inserisci Ticket",
                                        "state": "ticket.create"
                                    },
                                        {
                                            "nome": "Elenco Ticket",
                                            "state": "ticket.customer"
                                        }]
                                }
                            ]
                        }
                    } else if ($scope.userInfo.userRole === 'TEAM_LEADER') {
                        $scope.sidebarList = {
                            lists: [
                                {
                                    "title": "Utente",
                                    "num": 5,
                                    "icon": "fa-user",
                                    item: [
                                        {
                                            "nome": "Informazioni Utente",
                                            "state": "user.info({userId:" + $scope.userInfo.userId + "})"
                                        },
                                        {
                                            "nome": "Guida Utente",
                                            "state": "user.guide",
                                        }
                                    ]
                                },
                                {
                                    "title": "Ticket",
                                    "num": 6,
                                    "icon": "fa-ticket",
                                    item: [
                                        {
                                            "nome": "Elenco Ticket",
                                            "state": "ticket.list"
                                        }/*,
                                        {
                                            "nome": "Ticket acquisiti",
                                            "state": "ticket.ofCurrentAssistant"
                                        }*/
                                    ]
                                },
                                {
                                    "title": "Team",
                                    "num": 7,
                                    "icon": "fa-users",
                                    item: [{
                                        "nome": "Informazioni Team",
                                        "state": "team.list"
                                    }]
                                },
                                {
                                    "title": "Prodotto Software",
                                    "num": 8,
                                    "icon": "fa-desktop",
                                    item: [
                                        {
                                            "nome": "Elenco Prodotti Software",
                                            "state": "productsoftware.list"
                                        }]
                                },
                                {
                                    "title": "Pianificazione",
                                    "num": 9,
                                    "icon": "fa-desktop",
                                    item: [
                                        {
                                            "nome": "Visualizza Gantt",
                                            "state": "gantt.list"
                                        }
                                        /*,
                                      {
                                            "nome": "Pianifica",
                                            "state": "gantt.planning"
                                        }*/]

                                },
                                {
                                    "title": "Workflow",
                                    "num": 14,
                                    //"icon": "fa-list-alt",
                                    item: [
                                        {
                                            "nome": "Gestione workflow",
                                            "state": "workflow.dashboard"
                                        }
                                    ]
                                }
                            ]
                        }
                    } else if ($scope.userInfo.userRole === 'TEAM_COORDINATOR') {
                        $scope.sidebarList = {
                            lists: [
                                {
                                    "title": "Utente",
                                    "num": 5,
                                    "icon": "fa-user",
                                    item: [
                                        {
                                            "nome": "Informazioni Utente",
                                            "state": "user.info({userId:" + $scope.userInfo.userId + "})"
                                        },
                                        {
                                            "nome": "Guida Utente",
                                            "state": "user.guide",
                                        }
                                    ]
                                },
                                {
                                    "title": "Ticket",
                                    "num": 6,
                                    "icon": "fa-ticket",
                                    item: [
                                        {
                                            "nome": "Elenco Ticket",
                                            "state": "ticket.list"
                                        },
                                        {
                                            "nome": "Ticket acquisiti",
                                            "state": "ticket.ofCurrentAssistant"
                                        }
                                    ]
                                },
                                {
                                    "title": "Team",
                                    "num": 7,
                                    "icon": "fa-users",
                                    item: [{
                                        "nome": "Informazioni Team",
                                        "state": "team.list"
                                    }]
                                },
                                {
                                    "title": "Prodotto Software",
                                    "num": 8,
                                    "icon": "fa-desktop",
                                    item: [
                                        {
                                            "nome": "Elenco Prodotti Software",
                                            "state": "productsoftware.list"
                                        }]
                                },
                                {
                                    "title": "Pianificazione",
                                    "num": 9,
                                    "icon": "fa-desktop",
                                    item: [
                                        {
                                            "nome": "Visualizza Gantt",
                                            "state": "gantt.list"
                                        }]
                                },
                                {
                                    "title": "Workflow",
                                    "num": 14,
                                    //"icon": "fa-list-alt",
                                    item: [
                                        {
                                            "nome": "Gestione workflow",
                                            "state": "workflow.dashboard"
                                        }
                                    ]
                                }
                            ]}
                        }

                    };

                    $scope.incrementCounter = function () {
                        $scope.counter++;
                    };

                    $scope.resetCounter = function () {
                        $scope.counter = 0;
                    };

                    $scope.$watch(function () {
                        return AuthFactory.getAuthInfo;
                    }, function () {
                        $scope.setSidebar();
                    });

                    $scope.check = function (x) {

                        if (x == $scope.collapseVar)
                            $scope.collapseVar = 0;
                        else
                            $scope.collapseVar = x;
                    };

                    $scope.multiCheck = function (y) {

                        if (y == $scope.multiCollapseVar)
                            $scope.multiCollapseVar = 0;
                        else
                            $scope.multiCollapseVar = y;
                    };
                }
            }
        }]);
