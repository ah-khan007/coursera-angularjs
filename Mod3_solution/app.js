(function () {
  'use strict';

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);
  
  function FoundItemsDirective() {
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
      .catch(function (error) {
        console.log('something went wrong: ' + error)
      });
    };

    list.removeItem = function (index) {
      MenuSearchService.removeItem(index);
    };
  };
  
  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        if (searchTerm === "") {
          service.foundItems = [];
        } else {
          service.foundItems = result.data.menu_items.filter( 
            item => item.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return service.foundItems;
      })
      .catch(function (error) {
        console.log('something went wrong: ' + error)
      });
    };

    service.removeItem = function (index) {
      service.foundItems.splice(index, 1);
    };
  };
  
})();