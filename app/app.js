var myStore = angular.module("myStore",['ngRoute']);

myStore.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/home',{
    templateUrl: 'views/home.html'
  })
  .when('/login',{
    templateUrl: 'views/login.html'
  })
  .when('/directory',{
    templateUrl: 'views/directory.html',
    controller: 'StoreController'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

myStore.controller('StoreController',['$scope','$http',function($scope,$http){

self.url = 'http://localhost:5001/games/getAll_Items';
 $http.get(self.url).success(function(data)
{
  $scope.games=data;  
});

 $scope.removeGame = function(game){
    var removeGame = $scope.games.indexOf(game);
    $scope.games.splice(removeGame,1);
  }

  $scope.addGame = function(){
    $scope.games.push({
      name: $scope.newgame.name,
      belt: $scope.newgame.belt,
      rate: parseInt($scope.newgame.rate),
      available:true
    });
    $scope.newgame.name = "";
    $scope.newgame.belt = "";
    $scope.newgame.rate = "";
   }

}]);
