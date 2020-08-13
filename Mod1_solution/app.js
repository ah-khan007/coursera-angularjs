(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.numberOfItems = function () {
        $scope.yourMessage = numberOfItems($scope.items);};
        function numberOfItems(items) {
            var count = 0;
            if (items) {
                var number = items.split(',');
                for (var char in number) {
                    if (number[char].length != null) {
                        count += 1;}
        }
    }
            if (count == 0) {
                return "Please enter data first";}
            else if (count <=3) {
                return "Enjoy!";}
            else {
                return 'Too Much!';}

        };
    }
})();