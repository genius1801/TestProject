function routing(TaskService, $injector) {

    this.checkAccess = function () {
        var $cookies =$injector.get('$cookies'),
            $location=$injector.get('$location');
        // если пользователь не авторизован - отправляем на страницу авторизации
        if (!$cookies.user) {
            
              $location.path('/login');
          }
       /* if (!TaskService.user.isAuth) {
            $location.path('/login');
        };*/
    }
}