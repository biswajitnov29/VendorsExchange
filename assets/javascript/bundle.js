angular.module("VenderMachinApp", ["ngRoute"]);

angular.module("VenderMachinApp").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "source/partials/limited.html",
            controller: "MachinController"
        })
        .when("/unlimited", {
            templateUrl: "source/partials/unlimited.html",
            controller: "MachinController"
        });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);
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
angular.module("VenderMachinApp").service("CalculationService", ["InventoryFactory", "$q", function (InventoryFactory, $q) {
    debugger;
    var _InventoryFactory=new InventoryFactory();
    this.calculateCoins = function (totalAmount, limited) {
        var venderChange = [];
        var index = 0;
        var tempTotal = angular.copy(totalAmount);
        var deffered = $q.defer();
        while (totalAmount < 0 || index < _InventoryFactory.length) {
            var option = _InventoryFactory[index];
            var qty = parseInt(totalAmount / option.amount);
            if (limited) {
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
            } else {
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
            if(limited){
                this.reduceFromStock(venderChange);
            }
            //this.addToStock(tempTotal);
            deffered.resolve(venderChange);
        }
        return deffered.promise;
    };

    this.addToStock = function (amount) {
        for (var i = 0; i < _InventoryFactory.length; i++) {
            var option = _InventoryFactory[i];
            if (option.amount == amount) {
                _InventoryFactory[i].quantity++;
            }
        }
    };

    this.reduceFromStock = function (vendorChange) {
        for (var x = 0; x < vendorChange.length; x++) {
            for (var i = 0; i < _InventoryFactory.length; i++) {
                if (_InventoryFactory[i].amount == vendorChange[x].amount) {
                    _InventoryFactory[i].quantity = _InventoryFactory[i].quantity - vendorChange[x].quantity;
                }
            }
        }
    };

    this.getInventoryStock = function () {
        return _InventoryFactory;
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
    return function(){
        return venderStorage;
    };

}]);