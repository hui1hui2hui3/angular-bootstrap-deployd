angular.module('shopping', ['ui.router', 'customeFilters', 'cart'])
    .config([
        '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('products', {
                    url: '/products',
                    templateUrl: 'views/productlist.html'
                })
                .state('checkout', {
                    url: '/checkout',
                    templateUrl: 'views/checkoutSummary.html',
                    controller: 'checkoutController as checkoutCtrl'
                })
                .state('placeorder',{
                	url: '/placeorder',
                	templateUrl: 'views/placeorder.html'
                })
                .state('complete',{
                	url:'/complete',
                	templateUrl: 'views/complete.html'
                });

            $urlRouterProvider.otherwise("/products");
        }
    ]);
