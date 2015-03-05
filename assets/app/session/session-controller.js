(function(ng, _) {

    'use strict';

    ng.module('aprimaface')
        .controller('SessionCtrl', SessionCtrl)
        .controller('SingleSessionCtrl', SingleSessionCtrl);

    function SessionCtrl($scope, $state, Sessions, SessionDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('sessions'.toLowerCase());
        
        $scope.sessions = Sessions;
        $scope.model_def = SessionDefinition.originalElement;
        $scope.session = {};

        $scope.remove = function remove(session) {
            session = session || $scope.session;
            if (window.confirm('Are you sure you want to delete this session?')) {
                return resourceService.remove(session, $scope.sessions);
            }
        };

        $scope.save = function save(session) {
            session = session || $scope.session;
            return resourceService.save(session, $scope.sessions)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleSessionCtrl($scope, $stateParams, Sessions, SessionDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.session = _.find(Sessions, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
