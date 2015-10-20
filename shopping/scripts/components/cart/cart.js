'use strict';
angular.module('cart', [])
    .factory('cart', [function() {
        var cartData = [];
        return {
            addProduct: function(id, name, price) {
                var isExist = false;
                for (var i = 0, n = cartData.length; i < n; i++) {
                    var product = cartData[i];
                    if (product.id === id) {
                        product.count++;
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    cartData.push({
                        id: id,
                        name: name,
                        price: price,
                        count: 1
                    });
                }
            },
            removeProduct: function(id) {
                for (var i = cartData.length-1; i > -1; i--) {
                    if (cartData[i].id === id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },
            getProducts: function() {
                return cartData;
            },

            clearProducts: function(){
                cartData.splice(0,cartData.length);
            }
        };
    }])
    .directive('cartSummary', ['cart', function(cart) {
        // Runs during compile
        return {
            templateUrl: 'scripts/components/cart/cartSummary.html',
            restrict: 'E',
            controller: function($scope) {
                var ctrl = this;
                var cartData = cart.getProducts();
                ctrl.total = function() {
                    var total = 0;
                    angular.forEach(cartData, function(value, key) {
                        total += value.price * value.count;
                    });
                    return total;
                };
                ctrl.itemCount = function() {
                    var total = 0;
                    angular.forEach(cartData, function(value, key) {
                        total += value.count;
                    });
                    return total;
                };
            },
            controllerAs: 'cartCtrl'
        };
    }]);
