function routing(TaskService, $location, $state) {
    this.checkAccess = function () {
        if (!TaskService.user.isAuth) {
            $location.path('/login');
        };
    }
}