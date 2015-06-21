angular.module('taskApp', ['angular-repeat-n', 'ui.router', 'dndLists','ngStorage'])
    .directive('taskdedail', taskDelail)

    .service('TaskService', ['$http', '$q','$localStorage', Task])
    .service('SessionService', ['TaskService', '$location', '$state','$injector', routing])

    .controller('loginCtrl', ['$scope', 'TaskService', '$state', loginCtrl])
    .controller('taskCtrl', ['$scope', 'TaskService', '$state','$localStorage', taskCtrl])
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
            .state('taskevent', {
                parent: 'task',
                //url: '/taskevent/:name',
                params: { 'name': null },
                templateUrl: 'view/taskevent.html',
                controller: 'taskDetailCtrl'

            })
            .state('edittask', {
                //parent: 'task',
                url: '/edit/',
                templateUrl: 'view/edit.html',
                params: {'name':null},
                controller: 'editDetailCtrl'
                
            });
    }])

	.run(['$q', '$rootScope', '$state', 'SessionService','$localStorage', function ($q, $rootScope, $state, SessionService,$localStorage) {

	    // on state change
	    $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
	        var state = toState.name.match(/\.(.*)/);
            $rootScope.user = $localStorage.user;
	        $rootScope.prevState = fromState.name;
	        $rootScope.stateName = toState.name;
	        $rootScope.state = state ? state[1] : toState.name;

	        //проверка авторизации
	        SessionService.checkAccess(event, toState, toParams, fromState, fromParams);

	    });
	}]);