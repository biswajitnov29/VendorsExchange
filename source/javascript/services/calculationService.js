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