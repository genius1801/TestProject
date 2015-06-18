function taskDetailCtrl($scope, TaskService, $state, $stateParams) {

    $scope.event = JSON.parse($stateParams.name || null);

    $scope.f = function (person) {
        $state.go('edittask', { name: JSON.stringify(person) });
    }
}