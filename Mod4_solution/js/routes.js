(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise('/');


  $stateProvider


  .state('home', {
    url: '/',
    templateUrl: 'homeIndex.html'
  })


  .state('mainList', {
    url: '/main-list',
    templateUrl: 'main-categories.html',
    controller: 'AllCategoriesController as mainList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('itemDetail', {
    url: '/item-detail/{shortName}',
    templateUrl: 'mainCategoryIndex.html',
    controller: "CategoryItemsController as itemDetail",
    resolve: {
      items: ['MenuDataService','$stateParams', function (MenuDataService,$stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }


  });

}

})();
