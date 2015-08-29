'use strict';

angular.module('bookApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mybooks', {
        url: '/mybooks',
        templateUrl: 'app/mybooks/mybooks.html',
        controller: 'MybooksCtrl'
      });
  });