angular.module('taskApp', ['ui.router', 'dndLists','ngCookies'])
    .directive('taskdedail', taskDelail)

    .service('TaskService', ['$http', '$q','$cookies', Task])
    .service('SessionService', ['TaskService','$injector',routing])

    .controller('loginCtrl', ['$scope', 'TaskService', '$state', '$cookies',loginCtrl])
    .controller('taskCtrl', ['$scope', 'TaskService', '$state','$cookies', taskCtrl])
    .controller('taskDetailCtrl', ['$scope', 'TaskService', '$state', '$stateParams', taskDetailCtrl])
    .controller('editDetailCtrl', ['$scope', 'TaskService', '$state', '$stateParams', editCtrl])

    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
        // default route
        $urlRouterProvider.otherwise('/login');
        // routes
        $stateProvider
			.state('login', {
			    url: '/login',
			    controller: 'loginCtrl',
			    templateUrl: 'view/login.html',
			})
			.state('task', {
			    url: '/task',
			    templateUrl: 'view/task.html',
			    controller: 'taskCtrl'

			})
            .state('task.taskevent', {
                //parent: 'task',
                url: '/{id}',
                params: {'id':null },
                templateUrl: 'view/taskevent.html',
                controller: 'taskDetailCtrl'

            })
            .state('task.edittask', {
               // parent: 'task',
                url: '/edit/{id}',
                templateUrl: 'view/edit.html',
                params: {'id':null},
                controller: 'editDetailCtrl'
            });
    }])

	.run(['$rootScope', '$state', 'SessionService','$cookies','$cookieStore', function ($rootScope, $state, SessionService,$cookies,$cookieStore) {

        $rootScope.logout = function () {
                $cookieStore.remove('user');
                $rootScope.user=null;
                $state.go('login');
            }
        
	    // on state change
	    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
	        var state = toState.name.match(/\.(.*)/);
            $rootScope.user = $cookies.user?$cookies.user:null;
	        $rootScope.prevState = fromState.name;
	        $rootScope.stateName = toState.name;
	        $rootScope.state = state ? state[1] : toState.name;

	        //проверка авторизации
	        SessionService.checkAccess();

	    });
	}]);