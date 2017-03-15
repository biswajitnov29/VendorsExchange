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