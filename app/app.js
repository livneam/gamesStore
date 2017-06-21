var myStore = angular.module("myStore",['ngRoute','ngAnimate']);

myStore.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/home',{
    templateUrl: 'views/home.html',
    controller: 'postLoginPageCtrl' 
  })
  .when('/login',{
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  })
  .when('/directory',{
    templateUrl: 'views/directory.html',
    controller: 'StoreController'
  })
  .when('/postLoginPage',{
    templateUrl: 'views/postLoginPage.html',
    controller: 'postLoginPageCtrl'
  })
  .when('/about',{
    templateUrl: 'views/about.html',
    controller: 'postLoginPageCtrl'
  })
  .otherwise({
    redirectTo: '/home',
    controller: 'postLoginPageCtrl'
  });
}]);


myStore.controller('StoreController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
  self.url = 'http://localhost:5001/games/getAll_Items';
  console.log("test" + $rootScope.currentUser);
  $http.get(self.url).success(function(data)
  {
    $scope.games=data;
    self.url2 = 'http://localhost:5001/users/getRecomandation?userName='; //todo: change to be according to userName;

    self.url2 += $rootScope.currentUser;
    $http.get(self.url2).success(function(data)
    {
      $scope.Recgames=data;
    });

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

   $scope.gameDetails = function(game){
     self.gameUrl = 'http://localhost:5001/games/getItemByID?gameName=';
     self.gameUrl += game.gameName;
     $http.get(self.gameUrl).success(function(data)
     {
       alert(JSON.stringify(data['0']));
     });
   }

}]);


myStore.controller('LoginController',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
  self.url = 'http://localhost:5001/users/login';
  self.getUser = 'http://localhost:5001/users/getUserByID?userName=';

  $scope.login = function(){
    //alert($scope.newlogin.userName); alert to check the name of the user
    //alert($scope.newlogin.password.length); for checking length
    $http.post(self.url,{userName:$scope.newlogin.userName,password:$scope.newlogin.password})
    .success(function(data){
      $scope.answer = data;
      alert(data);
      self.getUser += $scope.newlogin.userName;
      console.log(self.getUser);
      $rootScope.currentUser = $scope.newlogin.userName;

      //alert(self.getUser);
      $http.get(self.getUser).success(function(userData){
        console.log(userData);
        let user = userData['0'];
        console.log(user);
        //alert(user['lastLogin']);
        $rootScope.lastLoginTime = ' '
        $rootScope.lastLoginTime += Date(user['lastLogin']);
        $location.path('postLoginPage')
      });
    }).error(function (data) {
        alert(data);

  });
  }
}]); //controller ends

myStore.controller('postLoginPageCtrl',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
  if(!$rootScope.currentUser)  {
    $rootScope.currentUser = "guest";
  }
  self.url2 = 'http://localhost:5001/games/topfivegames';
  self.url3 = 'http://localhost:5001/games/getLastMonthItems';


  $http.get(self.url2).success(function(recData){
      $scope.topGames=recData;
      $http.get(self.url3).success(function(lastMonth){
        $scope.MonthGames=lastMonth;
      });
  });
}]);
