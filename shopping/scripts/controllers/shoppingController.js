angular.module('shopping')
    .constant('dataUrl', 'http://localhost:2403/products/')
    .constant('orderUrl', 'http://localhost:2403/orders/')
    .controller('shoppingController', ['$scope', '$http', '$state','dataUrl','orderUrl','cart',
        function($scope, $http, $state,dataUrl,orderUrl,cart) {
            var ctrl = this;

            ctrl.data = {};
            $http.get(dataUrl).success(function(data) {
                ctrl.data.products = data;
            }).error(function(error) {
                ctrl.data.error = error;
            });

            $scope.sendOrder = function(shippingDetails){
                var order = angular.copy(shippingDetails);
                order.products = cart.getProducts();
                $http.post(orderUrl,order).success(function(data){
                    ctrl.data.orderId = data.id;
                    cart.clearProducts();
                }).error(function(error){
                    ctrl.data.orderError = error;
                }).finally(function(){
                    $state.go('complete');
                });
            };

            /* ctrl.data = {
                 products: [{
                     name: "Product #1",
                     description: "A product",
                     category: "Category #1",
                     price: 100
                 }, {
                     name: "Product #2",
                     description: "A product",
                     category: "Category #1",
                     price: 110
                 }, {
                     name: "Product #3",
                     description: "A product",
                     category: "Category #2",
                     price: 210
                 }, {
                     name: "Product #4",
                     description: "A product",
                     category: "Category #3",
                     price: 202
                 }]
             };*/
        }
    ]);
