function editCtrl($scope, TaskService, $state, $stateParams) {

    //получение данных о задаче на основе полученных параметров 
    if ($stateParams.id) {
        
        //если страница была обновлена, при изменении запроса - сделать рефакторинг
        if (!TaskService.user.task) {
            TaskService.init().then(function () {
                $scope.event = JSON.parse(TaskService.getTask($stateParams.id));
                if (!$scope.event) {
                    alert("Error. Not find this task!");
                    $state.go("task");
                };
            });
        }
        else{
            $scope.event = JSON.parse(TaskService.getTask($stateParams.id));
            if (!$scope.event) {
                alert("Error. Not find this task!");
                $state.go("task");
            };
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