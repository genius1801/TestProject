function loginCtrl($scope, TaskService, $state) {

    if($scope.$root.user){
        console.log($scope.$root.user);
        $state.go('task');
    }
        
        $scope.user = TaskService.user;

        $scope.send = function () {
            TaskService.getAuth().then(function () {
                if ($scope.user.isAuth) {
                    TaskService.init().then(function () {
                        $state.go('task');
                    });
                } else {
                    alert('Incorrect username or password. Check the entered data.');
                };
            }, function () {
                alert('Incorrect username or password. Check the entered data.');
            });
        };

}