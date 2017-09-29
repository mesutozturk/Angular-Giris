/// <referance path="angular.js"/>

var app = angular.module("MyApp", []);


app.controller("SepetCtrl", function ($scope) {
    $scope.selam = "Merhaba Angular JS";
    $scope.urunler = [{
        id: 1,
        ad: "Pantolon",
        fiyat: 120.99
    }, {
        id: 2,
        ad: "Ceket",
        fiyat: 329.99
    }, {
        id: 3,
        ad: "T-Shirt",
        fiyat: 89.99
    }, {
        id: 4,
        ad: "Ayakkabı",
        fiyat: 259.99
    }];
    $scope.sepet = [];
    $scope.sepettutar = 0;
    $scope.sepeteEkle = function (gelen) {
        if ($scope.sepet.length == 0) {
            gelen.adet = 1;
            $scope.sepet.push(gelen);
        } else {
            var varmi = false;
            for (var i = 0; i < $scope.sepet.length; i++) {
                if ($scope.sepet[i].id == gelen.id) {
                    varmi = true;
                    $scope.sepet[i].adet++;
                    continue;
                }
            }
            if (!varmi) {
                gelen.adet = 1;
                $scope.sepet.push(gelen);
            }
        }
        sepethesapla();
        console.log($scope.sepet);
    }
    function sepethesapla() {
        var total = 0;
        for (var i = 0; i < $scope.sepet.length; i++) {
            total += $scope.sepet[i].adet * $scope.sepet[i].fiyat;
        }
        $scope.sepettutar = total;
        console.log(total);
    }

});
app.controller("OdemeCtrl", function ($scope) {
    $scope.selam = "Merhaba Ödeme";
});