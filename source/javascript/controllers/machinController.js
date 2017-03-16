angular.module("VenderMachinApp").controller("MachinController", ["$scope", "CalculationService", function ($scope, CalculationService) {

    $scope.amount = 0;
    $scope.venderChange = [];
    $scope.InventoryStock = CalculationService.getInventoryStock();
    $scope.error = false;
    $scope.errorMsg = "";
    $scope.calculateVenderChange = function () {

        $scope.venderChange = [];
        var promise = CalculationService.calculateCoins($scope.amount,true);
        promise.then(function (data) {
            $scope.error = false;
            $scope.venderChange = data;

        }, function () {
            $scope.error = true;
        });

        $scope.InventoryStock = CalculationService.getInventoryStock();
    };
    
    $scope.calculateVenderChangeUnlimited = function () {

        $scope.venderChange = [];
        var promise = CalculationService.calculateCoins($scope.amount,false);
        promise.then(function (data) {
            $scope.error = false;
            $scope.venderChange = data;

        }, function () {
            $scope.error = true;
        });
    };

}]);