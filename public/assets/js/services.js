angular.module('qznews.services', [])

.factory('Shop', function ($http) {

    var shops = [
        { id: 0, name: '' },
        { id: 1, name: '' },
        { id: 2, name: '' },
        { id: 3, name: '' }
    ];

    return {
        all: function (qduseraccount) {
            var url = "" + qduseraccount;
            $http.get(url).then(function successCallback(response) {
                //alert((response.data)[0].ShopName);
                return response.data;
            }, function errorCallback(response) {
                alert("发生错误");
            });
        },
        getByCityId: function (shopId) {
            return shops[shopId];
        },        
        OperateOptions: [
            { id: 1, name: '加盟' },
            { id: 2, name: '直营' },
            { id: 3, name: '联营' }
        ]        
    }
});