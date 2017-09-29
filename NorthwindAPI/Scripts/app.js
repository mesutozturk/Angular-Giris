
var app = angular.module("NorthApp", []);

app.service("api", function ($http) {
    var apiUrl = "http://localhost:65408/category/";
    return {
        getAllCategories: function (success) {
            $http({
                url: apiUrl + 'getallcategories',
                method: 'GET',
                dataType: 'JSON'
            }).then(function (response) {
                success(response.data);
            });
        },
        getCategoryById: function (id, success) {
            $http({
                url: apiUrl + 'GetCategoryById/' + id,
                method: 'GET',
                dataType: 'JSON'
            }).then(function (response) {
                success(response.data);
            });
        }
    }
});

app.controller("CategoryCtrl", function ($scope, api) {
    $scope.categories = [];
    $scope.category = {};
    $scope.isnew = false;
    $scope.isopen = false;
    function init() {
        api.getAllCategories(function (response) {
            if (response.success)
                $scope.categories = response.data;
            else
                alert(response.message);
        });
    }
    $scope.duzenle = function (cat) {
        $scope.category = cat;
        $scope.isnew = false;
        $scope.isopen = true;
        console.log($scope.category)
    }
    $scope.yeni = function () {
        $scope.category = {};
        $scope.isnew = true;
        $scope.isopen = true;
    }
    init();
});