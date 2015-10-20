'use strict';


angular.module('todoApp', [])
    .controller('todoController', ['$scope', function($scope) {
        var ctrl = this;
        ctrl.todo = {
            user: "Huis",
            items: [{
                action: "Buy Flowers",
                done: false
            }, {
                action: "Get Shoes",
                done: false
            }, {
                action: "Collect Tickets",
                done: true
            }, {
                action: "Call Joe",
                done: false
            }]
        };

        ctrl.incompleteCount = function() {
            var count = 0;
            angular.forEach(ctrl.todo.items, function(value, key) {
                if (!value.done) count++;
            });
            return count;
        };

        ctrl.warnningLevel = function() {
            return ctrl.incompleteCount() < 3 ? "label-success" : "label-warning";
        };

        ctrl.addNewItem = function(text) {
            ctrl.todo.items.push({
                action: text,
                done: false
            });
        };
    }])
    .filter('checkedItems', function() {
        return function(items, showComplete) {
            var result = [];
            angular.forEach(items, function(item, key) {
                if (item.done === false || showComplete === true) {
                    result.push(item);
                }
            });
            return result;
        };
    });
