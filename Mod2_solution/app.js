(function() {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    toBuyList.replaceItem = function (itemIndex) {
      ShoppingListCheckOffService.replaceItem(itemIndex);
    };
  }
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtList = this;
    alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }
  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyItems = [
      { name: "Cakes", quantity: 8 },
      { name: "Pizzas", quantity: 4 },
      { name: "Chicken", quantity: 6 },
      { name: "Eggs", quantity: 16 },
      { name: "Mangoes", quantity: 11 }
    ];
    var boughtItems = [];
    service.getToBuyItems = function () {
      return toBuyItems;
    };
    service.getBoughtItems = function () {
      return boughtItems;
    };
    service.replaceItem = function (itemIndex) {
      boughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    };
  }
})();