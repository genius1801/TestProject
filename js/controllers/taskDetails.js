function taskDetailCtrl($scope, TaskService, $state, $stateParams) {

    if ($stateParams.id) {
        if (!TaskService.user.task) {
            TaskService.init().then(function () {
                $scope.event = TaskService.getTask();
            });
        }
        $scope.event = TaskService.getTask($stateParams.id);
        if (!$scope.event) {
            alert("Error. Not find this task!");
            $state.go("task");
        };
    }
    else {
        alert("Error. Not find this task!");
        $state.go("task");
    }

    $scope.editTask = function (person) {
        $state.go('task.edittask', { id: person.id });
    }
}