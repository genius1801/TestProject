function Task($http, $q, $cookies) {

    return {
        // user data
        user: {
            task: null,
            login: null,
            password: null
        },

        //получение списка задач на основе данных авторизации
        getTaskList: function () {
            var user = this.user;
            var temp;
            var deferred = $q.defer();
            var name = $cookies.user;
            $http.get(Const.task).then(function (response) {
                temp = response.data;

                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].login == name) {
                        user.task = temp[i].tasklist;
                    }
                }
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },

        //получение данных о задаче
        getTask: function (id) {
            var self = this;
            var task = self.user.task;
            var currentTask = null;
            if (task) {
                for (var i = 0; i < task.length; i++) {
                    if (task[i].id == id) {
                        currentTask = task[i];
                    }
                }
            }
            return JSON.stringify(currentTask);
        },

        //получение списка пользователей и определение, прошла ли авторизация
        getAuth: function () {
            var deferred = $q.defer();
            var user = this.user;
            $http.get(Const.auth).then(function (response) {
                var temp = response.data;
                for (var i in temp) {
                    if (user.login == temp[i].login && user.password == temp[i].password) {
                        $cookies.user = user.login;
                    }
                }
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },

        //изменение статуса задачи
        setTask: function (id, atr, value) {
            var task = this.user.task;
            for (var i = 0; i < task.length; i++) {
                if (id == task[i].id) {
                    task[i][atr] = value;
                }
            };
        },

        //изменение всей задачи по имени/id
        setAllTask: function (id, detail) {
            var task = this.user.task;
            for (var i = 0; i < task.length; i++) {
                if (id == task[i].id) {
                    task[i] = detail;
                }
            };
        },

        //функция инициализации при успешной авторизации
        init: function () {
            var self = this;
            var deferred = $q.defer();
            self.getTaskList().then(function (response) {
                deferred.resolve(response);
            }, function () {
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }
};