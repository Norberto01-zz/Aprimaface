(function(ng) {
    
    'use strict';

    ng.module('aprimaface')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/sessions', '/sessions/list');

            $stateProvider
                .state('sessions', {
                    abstract: true,
                    url: '/sessions',
                    controller: 'SessionCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        SessionDefinition : function getSessionDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('sessions');
                        },
                        Sessions: function sessionsListResolve(Restangular) {
                            return Restangular.all('sessions').getList();
                        }
                    },
                })
                .state('sessions.list', {
                    url: '/list',
                    templateUrl: 'app/session/session-list.html'
                })
                .state('sessions.add', {
                    url: '/add',
                    templateUrl: 'app/session/session-add-edit.html'
                })
                .state('sessions.info', {
                    url: '/info/:id',
                    controller: 'SingleSessionCtrl',
                    templateUrl: 'app/session/session-info.html'
                })
                .state('sessions.edit', {
                    url: '/edit/:id',
                    controller: 'SingleSessionCtrl',
                    templateUrl: 'app/session/session-add-edit.html'
                });
        });
})(
    window.angular
);
