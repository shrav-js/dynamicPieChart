var myApp = angular.module('myApp', []);
myApp.controller('MainController', ['$scope', function ($scope) {
    $scope.pieChartDetails = [];
        

    $scope.addNewData = function () {
        if ($scope.pieChartDetails.length > 0 && $scope.pieChartDetails[$scope.pieChartDetails.length - 1].value !== undefined && $scope.pieChartDetails[$scope.pieChartDetails.length - 1].label !== undefined)
        {
            $scope.pieChartDetails.push({
                'label': $scope.label,
                'color': $scope.color,
                'value': $scope.value
            });

        }
        else if($scope.pieChartDetails.length==0)
        {
            $scope.pieChartDetails = [
            {
                'label': undefined,
                'color': '#C0C0C0',
                'value': undefined
            }];
        }
    };

    $scope.removeRow = function(index) {
        $scope.pieChartDetails.splice(index, 1);
    };

    $scope.pieChart = function () {
        if (!$scope.pie)
        {
            $scope.pie = new PieChart();
        }
        $scope.pie.createChart($scope.pieChartDetails);
 
    };
}]);

