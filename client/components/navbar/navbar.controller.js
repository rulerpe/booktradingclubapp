'use strict';

angular.module('bookApp')
  .controller('NavbarCtrl', function ($scope, $location, auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    $scope.isCollapsed = true;

    $scope.isLoggedIn = function(){
      return auth.isLoggedIn();
    }
    $scope.currentUser = function(){
      return auth.currentUser();
    }
    $scope.logOut = function(){
      return auth.logOut();
    }
    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });