angular.module('shoppingAdmin')
    .constant('PRODUCTS_URL', 'http://localhost:2403/products/')
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller('ProductsController', ['$scope', '$resource', 'PRODUCTS_URL',
        function($scope, $resource, PRODUCTS_URL) {
            var ctrl = this;
            ctrl.productsReource = $resource(PRODUCTS_URL + ':id', {
                id: '@id'
            });

            ctrl.listProducts = function() {
                ctrl.products = ctrl.productsReource.query();
            };

            ctrl.deleteProduct = function(product) {
                product.$delete().then(function() {
                    ctrl.products.splice(ctrl.products.indexOf(product), 1);
                });
            };

            ctrl.createProduct = function(product) {
                new ctrl.productsReource(product).$save().then(function(newProduct) {
                    ctrl.products.push(newProduct);
                    ctrl.editedProduct = null;
                });
            };

            ctrl.updateProduct = function(product) {
                product.$save();
                ctrl.editedProduct = null;
            };

            ctrl.startEdit = function(product) {
                ctrl.editedProduct = product;
            };

            ctrl.cancelEdit = function() {
                ctrl.editedProduct = null;
            };

            ctrl.listProducts();
        }
    ]);
