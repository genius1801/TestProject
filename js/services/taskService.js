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
            var t;
            var deferred = $q.defer();
            var name = $cookies.user;
            $http.get(Const.task).then(function (response) {
                t = response.data;

                for (var i = 0; i < t.length; i++) {
                    if (t[i].login == name) {
                        user.task = t[i].tasklist;
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
            var t = null;
            if (task) {
                for (var i = 0; i < task.length; i++) {
                    if (task[i].id == id) {
                        t = task[i];
                    }
                }
            }
            return t;
        },

        //получение списка пользователей и определение, прошла ли авторизация
        getAuth: function () {
            var deferred = $q.defer();
            var bool = false;
            var user = this.user;
            $http.get(Const.auth).then(function (response) {
                var y = response.data;
                for (var i in y) {
                    if (user.login == y[i].login && user.password == y[i].password) {
                        user.isAuth = true;
                        $cookies.user = user.login;
                    }
                }
                deferred.resolve(response);
            }, function (response) {
                user.isAuth = false;
                deferred.reject(response);
            });
            user.isAuth = bool;
            return deferred.promise;
        },

        //изменение статуса задачи
        setTask: function (id, atr, value) {
            var t = this.user.task;
            for (var i = 0; i < t.length; i++) {
                if (id == t[i].id) {
                    t[i][atr] = value;
                }
            };
        },

        //изменение всей задачи по имени/id
        setAllTask: function (id, detail) {
            var t = this.user.task;
            for (var i = 0; i < t.length; i++) {
                if (id == t[i].id) {
                    t[i] = detail;
                }
            };
        },

        //функция инициализации при успешной авторизации
        init: function () {
            var t = this;
            var deferred = $q.defer();
            t.getTaskList().then(function (response) {
                deferred.resolve(response);
            }, function () {
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }
};