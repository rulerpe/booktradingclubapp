'use strict';

angular.module('bookApp')
  .controller('MainCtrl', function ($scope, $state, auth) {
  	$scope.user = {};
    $scope.stateValue = true; //ture for login, false for reigster
    $scope.user.username = "";
    $scope.user.password = "";
    $scope.user.conPassword = "";
    $scope.error = {};
    $scope.logOrReg = function(){
      if($scope.stateValue === "Login"){
        $scope.login();
      }else {
        $scope.register();
      }
    }

  	$scope.register = function(){
      $scope.error = {};
      if(!$scope.user.username){
        $scope.error.username = "missing username";
      }
      if(!$scope.user.password){
        $scope.error.password = "missing password";
      }
      if($scope.user.conPassword !== $scope.user.password){
        $scope.error.conPassword = "password not same"; 
      }
      if(!$scope.error.username && !$scope.error.password && !$scope.error.conPassword){
        auth.register($scope.user).error(function(error){
          $scope.error = {message: "Username already exist"};
        }).then(function(){
          auth.getUser();
          $scope.user.username = "";
          $scope.user.password = "";
          $scope.user.conPassword = "";
          $state.go('mybooks');
        })
      }
  		
  	}

  	$scope.login = function(){
      $scope.error = {};
      if(!$scope.user.username){
        $scope.error.username = "missing username";
      }
      if(!$scope.user.password){
        $scope.error.password = "missing password";
      }
      if(!$scope.error.username && !$scope.error.password){
    		auth.logIn($scope.user).error(function(error){
    			$scope.error = error;
    		}).then(function(){
          auth.getUser();
    			$state.go('mybooks');
    		})
      }
  	}


    
    $scope.state = function(state){
      if(state){
        $scope.stateValue = true;
      }else {
        $scope.stateValue = false;
      }
    }

    $scope.isLoggedIn = function(){
      return auth.isLoggedIn();
    }

  });
