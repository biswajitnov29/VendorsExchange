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