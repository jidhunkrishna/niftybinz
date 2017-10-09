'use strict';

/**
 * @ngdoc service
 * @name niftybinzApp.loginService
 * @description
 * # loginService
 * Service in the niftybinzApp.
 */
angular.module('niftybinzApp')
  .service('loginService', function ($http, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var loginService = {};

        loginService.googleLogin = function () {
            var dataParam = JSON.stringify({
                "authcode": ""
            });
            var requestURL = 'http://chiteacake.com/passtokentoserver';

            return $http({
                url: requestURL,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': $rootScope.authorizationToken
                },
                data: dataParam
            });
        };
    
    loginService.facebookLogin = function (){
        var dataParam = JSON.stringify({
                "authcode": ""
            });
            var requestURL = 'http://chiteacake.com/addfbuser';

            return $http({
                url: requestURL,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': $rootScope.authorizationToken
                },
                data: dataParam
            });
    }
    
    loginService.gmailLogin = function (){
        var dataParam = JSON.stringify({
                "authcode": ""
            });
            var requestURL = 'http://chiteacake.com/readgooglemails';

            return $http({
                url: requestURL,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': $rootScope.authorizationToken
                },
                data: dataParam
            });
    }
  });
