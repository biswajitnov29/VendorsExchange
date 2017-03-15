angular.module("VenderMachinApp", []);
angular.module("VenderMachinApp").controller("MachinController", ["$scope", "CalculationService", function ($scope, CalculationService) {

    $scope.amount = 0;
    $scope.venderChange = [];
    $scope.InventoryStock = CalculationService.getInventoryStock();
    $scope.error = false;
    $scope.errorMsg = "";
    $scope.calculateVenderChange = function () {

        $scope.venderChange = [];
        var promise = CalculationService.calculateCoins($scope.amount);
        promise.then(function (data) {
            $scope.error = false;
            $scope.venderChange = data;

        }, function () {
            $scope.error = true;
        });

        $scope.InventoryStock = CalculationService.getInventoryStock();
    };

}]);
angular.module("VenderMachinApp").service("CalculationService", ["InventoryFactory", "$q", function (InventoryFactory, $q) {
    this.calculateCoins = function (totalAmount) {
        var venderChange = [];
        var index = 0;
        var tempTotal = angular.copy(totalAmount);
        var deffered = $q.defer();
        while (totalAmount < 0 || index < InventoryFactory.length) {
            var option = InventoryFactory[index];
            var qty = parseInt(totalAmount / option.amount);
            if (qty > 0 && option.quantity > 0 && (option.quantity - qty) >= 0) {

                var temp = angular.copy(option);
                temp.quantity = qty;
                venderChange.push(temp);
                totalAmount = totalAmount - (qty * option.amount);
            } else if (qty > 0 && option.quantity > 0) {
                qty = option.quantity;
                var temp = angular.copy(option);
                temp.quantity = qty;
                venderChange.push(temp);
                totalAmount = totalAmount - (qty * option.amount);
            }
            index++;
        }

        if (totalAmount > 0) {
            deffered.reject();
        } else {
            this.reduceFromStock(venderChange);
            //this.addToStock(tempTotal);
            deffered.resolve(venderChange);
        }
        return deffered.promise;
    };

    this.addToStock = function (amount) {
        for (var i = 0; i < InventoryFactory.length; i++) {
            var option = InventoryFactory[i];
            if (option.amount == amount) {
                InventoryFactory[i].quantity++;
            }
        }
    };

    this.reduceFromStock = function (vendorChange) {
        for (var x = 0; x < vendorChange.length; x++) {
            for (var i = 0; i < InventoryFactory.length; i++) {
                if (InventoryFactory[i].amount == vendorChange[x].amount) {
                    InventoryFactory[i].quantity=InventoryFactory[i].quantity-vendorChange[x].quantity;
                }
            }
        }
    };

    this.getInventoryStock = function () {
        return InventoryFactory;
    };
}]);
angular.module("VenderMachinApp").factory("InventoryFactory", [function () {
    var venderStorage = [
        {
            name: "One pound",
            amount: 100,
            quantity: 11,
        }, {
            name: "Fifty pence",
            amount: 50,
            quantity: 24,
        }, {
            name: "Twenty pence",
            amount: 20,
            quantity: 0,
        }, {
            name: "Ten pence",
            amount: 10,
            quantity: 99,
        }, {
            name: "Five pence",
            amount: 5,
            quantity: 200,
        }, {
            name: "Two pence",
            amount: 2,
            quantity: 11,
        }, {
            name: "One penny",
            amount: 1,
            quantity: 23,
        }
    ];
    return venderStorage;

}]);