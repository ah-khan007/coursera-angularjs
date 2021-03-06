(function () {
  'use strict';

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItems);
  
  function FoundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'list',
      bindToController: true
    }
    return ddo;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.searchTerm = "";
    list.nothingFound = false;

    list.searchItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      promise.then(function (response) {
        list.found = response;
        list.nothingFound = (list.found.length === 0);
      })
    };

    list.deleteItem = function (index) {
      MenuSearchService.deleteItem(index);
    };
  };
  
  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var findIt = this;

    findIt.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        if (searchTerm === "") {
          findIt.foundItems = [];
        } else {
          findIt.foundItems = result.data.menu_items.filter( 
            item => item.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return findIt.foundItems;
      })  
    };

    findIt.deleteItem = function (index) {
      findIt.foundItems.splice(index, 1);
    };
  };
  
})();