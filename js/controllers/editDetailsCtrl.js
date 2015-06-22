function editCtrl($scope, TaskService, $state, $stateParams) {

    //получение данных из параметров 
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


    $scope.saveTask = function () {
        TaskService.setAllTask($scope.event.id, $scope.event);
        $state.go("task");
    };

    $scope.cancel = function () {
        $state.go("task");
    };
}