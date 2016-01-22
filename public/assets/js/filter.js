angular.module('qznews.filter', [])
.filter('CityTypeName', function () {
    return function (input) {
        if (input === '1') {
            return '一级';
        }
        if (input === '2') {
            return '二级';
        }        
    };
})
.filter('Highlighting', function () {
    return function (input, query) {
        if (input.indexOf(query) >= 0) {
            return 'xxx';
        }
        return input;
    };
});