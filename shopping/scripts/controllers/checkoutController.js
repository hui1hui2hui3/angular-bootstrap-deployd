angular.module('shopping')
    .controller('checkoutController', ['$scope', 'cart', function($scope, cart) {
        var ctrl = this;
        ctrl.cartData = cart.getProducts();
        ctrl.total = function() {
            var total = 0;
            angular.forEach(ctrl.cartData, function(value, key) {
                total += value.price * value.count;
            });
            return total;
        };
        ctrl.remove = function(id) {
        	cart.removeProduct(id);
         };
    }]);
