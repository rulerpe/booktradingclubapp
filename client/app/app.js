'use strict';

angular.module('bookApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
 //  $httpProvider.interceptors.push('authInterceptor');

    $urlRouterProvider
      .otherwise('/main');

    $locationProvider.html5Mode(true);
  });
