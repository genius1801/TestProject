function routing(TaskService, $location, $state, $injector) {
    this.checkAccess = function (event, toState, toParams, fromState, fromParams) {
        var $scope = $injector.get('$rootScope'),
            $localStorage = $injector.get('$localStorage');
        console.log('routing');
        console.log($localStorage.user);
        if ($localStorage.user) {
            $scope.$root.user = $localStorage.user;
          } else {
            // если пользователь не авторизован - отправляем на страницу авторизации
            event.preventDefault();
            $location.path('/login');
          }
       /* if (!TaskService.user.isAuth) {
            $location.path('/login');
        };*/
    }
}