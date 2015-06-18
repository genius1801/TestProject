function taskDelail() {
    return {
        restrict: 'AE',
        replace: true,
        scope: true,
        template: "<div><div>{{item.name}}</div><div><span>Time data - {{item.date}}</span><div><span>Estimated - {{item.estimated}}<span><div><span>Priority - {{item.priority}}</span></div>"
    };
}