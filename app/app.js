var myStore = angular.module("myStore",['ngRoute','ngAnimate']);

myStore.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/home',{
    templateUrl: 'views/home.html'
  })
  .when('/login',{
    templateUrl: 'views/login.html',
    controller: 'LoginController'
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
      gameName: $scope.newgame.gameName,
      publisher: $scope.newgame.publisher,
      price: parseInt($scope.newgame.price),
      available:true
    });
    $scope.newgame.gameName = "";
    $scope.newgame.publisher = "";
    $scope.newgame.price = "";
   }

}]);


myStore.controller('LoginController',['$scope','$http',function($scope,$http){
  self.url = 'http://localhost:5001/users/login';
$scope.login = function()
{
  alert($scope.newlogin.userName);
  //alert($scope.newlogin.password.length); for checking length
  $http.post(self.url,{userName:$scope.newlogin.userName,password:$scope.newlogin.password})
  .success(function(data){
    $scope.answer = data;
    alert(data);
  }).error(function (data) {
      alert(data);
});

}

}]);
