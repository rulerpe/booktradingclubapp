'use strict';

angular.module('bookApp')
  .factory('auth', function ($http,$window) {
    var auth = {};
    auth.user = {};

    auth.saveToken = function (token){
      if(token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    };

    auth.getToken = function (){
      return $window.localStorage.getItem('token');
    }

    auth.getUser = function(){
      return $http.get('/api/users/user', {
          headers: {'Authorization': 'Bearer '+auth.getToken()}
        }).success(function(data){
        auth.user = data;
      })
    }

    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    auth.register = function(user){
      return $http.post('/api/users/register', user).success(function(data){
        auth.saveToken(data.token);
        auth.user = {};
      });
    };

    auth.logIn = function(user){
      return $http.post('/api/users//login', user).success(function(data){
        auth.saveToken(data.token);
        auth.user = {};
      });
    };

    auth.logOut = function(){
      $window.localStorage.removeItem('token');
    };

    auth.editUser = function(user){
      return $http.put('/api/users', user, {
          headers: {'Authorization': 'Bearer '+auth.getToken()}
        }).success(function(data){
        auth.user = data;
        console.log(auth.user);
      })
    }
    
    return auth;
  });
