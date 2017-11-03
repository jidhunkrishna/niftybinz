'use strict';

/**
 * @ngdoc function
 * @name niftybinzApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the niftybinzApp
 */
angular.module('niftybinzApp')
    .controller('DashboardCtrl', function ($scope, $filter, $location, $state,$rootScope,$window,$http) {

        $scope.state=$state.current.name;
        $scope.$state = $state;
        $rootScope.icon_loading = false;
        $scope.searchArchiveText = "";

        $scope.Logout=function(){
            FB.getLoginStatus(function(response) {
                if(response.status === 'connected'){
                    FB.logout(function (response) {})
                }
            });

            if(auth2.isSignedIn.get()){
                auth2.signOut();
            }
            $window.localStorage.clear();
        };
    });