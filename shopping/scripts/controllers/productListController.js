angular.module('shopping')
    .constant('productActiveClass', 'btn-primary')
    .constant('productPageSize', 3)
    .controller('productListController', [
        '$scope', 'productActiveClass', 'productPageSize', 'cart',
        function($scope, productActiveClass, productPageSize, cart) {
            var ctrl = this;
            var selectedCategory;

            ctrl.selectedPage = 1;
            ctrl.pageSize = productPageSize;

            ctrl.selectCategory = function(category) {
                selectedCategory = category;
                ctrl.selectedPage = 1;
            };

            ctrl.selectPage = function(page) {
                ctrl.selectedPage = page;
            };

            ctrl.categoryFilterFn = function(product) {
                return selectedCategory === undefined ||
                    selectedCategory == product.category;
            };

            ctrl.getCategoryClass = function(category) {
                return selectedCategory == category ? productActiveClass : '';
            };

            ctrl.getPageClass = function(page) {
                return ctrl.selectedPage == page ? productActiveClass : '';
            };

            ctrl.addProductToCart = function(product) {
            	cart.addProduct(product.id,product.name,product.price);
            };
        }
    ]);
