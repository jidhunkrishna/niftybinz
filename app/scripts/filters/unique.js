'use strict';

/**
 * @ngdoc filter
 * @name tappAppApp.filter:unique
 * @function
 * @description
 * # unique
 * Filter in the tappAppApp.
 */
angular.module('niftybinzApp')
    .filter('unique', function () {

        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {},
                    newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    });
angular.module('niftybinzApp')
    .filter('unique_multiple', function () {
  return function(collection, properties) {
    var trace = [];
    angular.forEach(collection, function(item) {
      for (var i = 0; i < trace.length; i++) {
         if (equalsPartial(item, trace[i], properties))
           return;
      }
      trace.push(item);
    });
    return trace;
  };

    function equalsPartial(item,traceItem,properties){
        for (var j = 0; j < properties.length; j++) {
          if (item[properties[j]] !== traceItem[properties[j]])
            return false;
        }
      return true;
    }
});

