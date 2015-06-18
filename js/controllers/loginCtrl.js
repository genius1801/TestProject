function loginCtrl($scope, TaskService, $state){
    
    $scope.user=TaskService.user;
    
    $scope.send=function(){
        TaskService.getAuth().then(function(){ 
            if($scope.user.isAuth) {
                TaskService.init().then(function(){
                    $state.go('task');
                });
            }
            else {
                alert('Error');
            };
        },function(){
            alert('Error');
        });
	}; 
}