function taskCtrl($scope, TaskService, $state,$localStorage) {

    //получение списка задач
    $scope.getT = function () {
        TaskService.init().then(function () {;
            $scope.task = TaskService.user.task;
        });
    };

    $scope.order = 'name';

    //первичное получение списка задач, т.к. setIntervar выполняет функцию после периода времени
    if ($scope.task) {
        $scope.task = TaskService.user.task;
       // $scope.getT();
        console.log(TaskService.user.task);
    } else {
        $scope.getT();
    }

    //$interval($scope.getT, 5000);
    setInterval($scope.getT, 500000); //500 секунд

    //сначала вывести в табличной форме, false - вывод scrum доски
    $scope.checked = true;

    //передача параметра в состояние taskevent
    $scope.delails = function (person) {
        $state.go('taskevent', { name: JSON.stringify(person) });
    }

    //передача параметра в состояние edit
    $scope.edit = function (person) {
        $state.go('edittask', { name: JSON.stringify(person) });
    }
    
    //передача параметра в состояние edit
    $scope.logout = function (person) {
        $localStorage.user=null;
        
        $state.go('login');
    }
}