'use strict';
angular.module('customeFilters', [])
    .filter('unique', function() {
        return function(data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
                var result = [];
                var keys = {};
                angular.forEach(data, function(value, key) {
                    key = keys[value[propertyName]];
                    if (angular.isUndefined(key)) {
                        result.push(value);
                        keys[value[propertyName]] = true;
                    }
                });
                return result;
            } else {
                return data;
            }
        };
    })
    .filter('range', function($filter) {
        return function(data, page, size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var startIndex = (page - 1) * size;
                if (data.length < startIndex) {
                    return [];
                } else {
                    return $filter('limitTo')(data.splice(startIndex), size);
                }
            } else {
                return data;
            }
        };
    })
    .filter('pageCount', function() {
        return function(data, size) {
            if (angular.isArray(data) && angular.isNumber(size)) {
                var result = [];
                for (var i = 0, n = Math.ceil(data.length / size); i < n; i++) {
                    result.push(i);
                }
                return result;
            } else {
                return data;
            }
        };
    });
