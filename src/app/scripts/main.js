angular.module('webapp', [])
  .controller('AppController', ['$scope', function($scope) {
    $scope.mylist = [
      'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
      'siete', 'ocho', 'nueve', 'diez'
    ];
    $scope.showAngular = 'WE HAVE ANGULAR POWERS...lets count in spanish!';
  }]);
