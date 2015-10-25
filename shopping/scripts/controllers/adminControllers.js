angular.module('shoppingAdmin')
    .constant('AUTH_URL', 'http://localhost:2403/users/login')
    .constant('ORDERS_URL', 'http://localhost:2403/orders')
    .controller('AdminController', ['$scope', '$http', '$state', 'AUTH_URL',
        function($scope, $http, $state, AUTH_URL) {
            var ctrl = this;
            ctrl.authenticate = function(username, password) {
                $http.post(AUTH_URL, {
                        username: username,
                        password: password
                    }, {
                        withCredentials: true
                    })
                    .success(function(data) {
                        $state.go('main.products');
                    })
                    .error(function(error) {
                        ctrl.authenticationError = error;
                    });
            };
        }
    ])
    .controller('AdminMainController', ['$scope', '$state', function($scope, $state) {
        var ctrl = this;
        ctrl.screens = ['Products', 'Orders'];
        ctrl.setScreen = function(index) {
            $state.go('main.' + ctrl.screens[index].toLowerCase());
            ctrl.current = ctrl.screens[index];
        };

        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
            	var screen = toState.name.split('.')[1];
            	ctrl.current = screen[0].toUpperCase()+screen.slice(1);
            });
        // ctrl.getScreen = function(){
        // 	return ctrl.current === 'Products' ? 
        // 	'views/adminProducts.html':'views/adminOrders.html';
        // };
    }])
    .controller('OrdersController', ['$scope', '$http', 'ORDERS_URL',
        function($scope, $http, ORDERS_URL) {
            var ctrl = this;
            $http.get(ORDERS_URL, {
                withCredentials: true
            }).success(function(data) {
                ctrl.orders = data;
            }).error(function(error) {
                ctrl.error = error;
            });

            ctrl.selectedOrder = null;
            ctrl.selectOrder = function(order) {
                ctrl.selectedOrder = order;
            };
            ctrl.calcTotal = function(order) {
                var total = 0;
                angular.forEach(order.products, function(value, key) {
                    total += value.price * value.count;
                });
                return total;
            };
        }
    ]);
