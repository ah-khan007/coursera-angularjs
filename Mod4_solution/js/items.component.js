(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'categoryIndex.html',
  bindings: {
    items: '<'
  }
});


})();