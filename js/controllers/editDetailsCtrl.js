function editCtrl($scope, TaskService, $state,$stateParams){
    
    //получение данных из параметра name 
    $scope.event=JSON.parse($stateParams.name||null);
    
    
    $scope.save=function(){
        TaskService.setAllTask($scope.event.name,$scope.event);
        $state.go("task");
    };
    
    $scope.cancel=function(){
        $state.go("task");
    };
}