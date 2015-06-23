function taskCtrl($scope, TaskService, $state, $cookies) {

    //получение списка задач
    $scope.getTask = function () {
        TaskService.init().then(function () {;
            $scope.task = TaskService.user.task;
        });
        $scope.datetime = new Date();
    };
    $scope.datetime = new Date();
    
    $scope.order = 'name';
    $scope.reverce = false;
    
    $scope.ordering=function(name){
        if($scope.order == name){
            $scope.reverce = !$scope.reverce;
        }
        else{
            $scope.reverce = false;
        }
        $scope.order = name;
    }
    

    //первичное получение списка задач, т.к. setIntervar выполняет функцию после периода времени
    if (!TaskService.user.task) {
        $scope.getTask();
    } else {
        $scope.task = TaskService.user.task;
    }

    //$interval($scope.getT, 5000);
    setInterval($scope.getTask, 500000); //500 секунд

    //сначала вывести в табличной форме, false - вывод scrum доски
    $scope.checked = true;

    //передача параметра в состояние taskevent
    $scope.delails = function (person) {
        $state.go('task.taskevent', { id: person.id });
    }

    //передача параметра в состояние edit
    $scope.edit = function (person) {
        $state.go('task.edittask', { id: person.id });
    }
}