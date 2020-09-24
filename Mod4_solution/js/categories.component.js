(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'getAllCategories.html',
  bindings: {
    items: '<'
  }
});

})();
