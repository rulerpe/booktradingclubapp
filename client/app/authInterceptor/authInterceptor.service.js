'use strict';

angular.module('bookApp')
  .factory('authInterceptor', function ($q, $location, auth) {
    var interceptorFactory = {};

    interceptorFactory.request = function(config) {
      var token = auth.getToken();

      if(token){
        config.headers['x-access-token'] = token;
      }

      return config;
    }

    interceptorFactory.responseError = function(response){
      if(response.status == 403) {
        auth.saveToken();
        $location.path('/main');
      }
      return $q.reject(response)
    }

    return interceptorFactory;

  });
