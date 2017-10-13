'use strict';

/**
 * @ngdoc service
 * @name niftybinzApp.loginService
 * @description
 * # loginService
 * Service in the niftybinzApp.
 */
angular.module('niftybinzApp')
  .service('loginService', function ($http,$q, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var loginService = this;
    var deferred = $q.defer();

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
    
    loginService.facebookLogin = function (FBUser){
        var data = JSON.stringify(FBUser);
        var requestURL = 'http://chiteacake.com/addfbuser';
        var config = {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': $rootScope.authorizationToken
                }
        };

         $http.post(requestURL,data,config)
             .then(function (response, status, headers, config) {
                   deferred.resolve(response);
             })
             .catch(function (error, status, headers, config) {
                 console.log(error);
                 console.log(status);
                deferred.reject(error);
             });
         return deferred.promise;
    };
    
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

    return loginService;
  });
