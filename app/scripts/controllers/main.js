'use strict';
/**
 * Created by jidhun krishna on 6/10/17.
 */
/**
 * @ngdoc function
 * @name niftybinzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the niftybinzApp
 */
angular.module('niftybinzApp')
    .controller('MainCtrl', ['$rootScope','$scope','$state','$http','loginService','$window','postDataService',
        function ($rootScope,$scope,$state,$http, loginService ,$window,postDataService) {

            $scope.invalidData = false;
            //Log in check, when user logged in through nifty account.
            $scope.onLoginCheck = function () {
                $scope.invalidData = false;
                $scope.dataLoading = true;
                $window.localStorage.setItem('niftyUserName',$scope.user.name);
                var apiParams= {"username":$scope.user.name, "password": $scope.user.password};
                $.ajax({
                    url: "http://chiteacake.com/niftybinzlogin",
                    type: "POST",
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    processData: false,
                    data: JSON.stringify(apiParams),
                    success: function (response) {
                        console.log('Successfully logged in.');
                        if (response.STATUS == "EXIST"){
                            $scope.dataLoading = false;
                            $state.go('dashboard');
                        }
                        else{
                            $scope.dataLoading = false;
                            $scope.invalidData = true;
                            $scope.$digest();
                            console.log('Invalid status')
                        }
                    },
                    error: function (response, textStatus, errorThrown) {
                        $scope.dataLoading = false;
                        $scope.invalidData = true;
                        $scope.$digest();
                        console.log(response.MESSAGE);
                    }
                });
            };

            //Log in check, when user logged in through google account.
            $scope.onGoogleLogin= function () {
                auth2.signIn().then(function() {
                    if (auth2.isSignedIn.get()) {
                        var profile = auth2.currentUser.get().getBasicProfile();
                        var usermail = profile.getEmail();
                        var Url = 'http://chiteacake.com/webmailvalidation';
                        var dataParam = {"useremail":usermail};
                        var googlemailStatus = postDataService.postData(Url,dataParam);
                        googlemailStatus.then(function (response) {
                            if (response.data.STATUS == 'EXISTS'){
                                var niftyusername = response.data.DETAILS.niftyusername;
                                $window.localStorage.setItem('niftyUserName',niftyusername);
                                $state.go('dashboard');
                            }
                            else{
                                alert('Sorry!, This account is not linked with Nifty. Please download our mobile and create an account');
                                auth2.signOut();
                            }
                        }).catch(function () {
                            auth2.signOut()
                        });

                    }
                }).catch(function (error) {
                    console.log(error);
                    auth2.signOut();
                });
            };
            // $scope.showLinkEmail = false;
            $scope.gmail = {
                userName: "",
                email: ""
            };

            $scope.facebook = {
                Id: "",
                Name: "",
                Picture:""
            };

            //Log in check, when user logged in through facebook account.
            $scope.onFaceBookLogin = function(){
                FB.login(function(response){
                    if(response.authResponse){
                        FB.api('/me', 'GET', {fields: 'email, first_name, name, id, picture '},function(response){
                            $scope.$apply(function () {
                                $scope.facebook.Name = response.name;
                                $scope.facebook.Id = response.id;
                                $scope.facebook.Picture = response.picture.data.url;
                                // $scope.showLinkEmail = true;
                            });
                            loginService.facebookLogin($scope.facebook).then(function (response) {
                                if(response.data.STATUS=='EXISTS'){
                                    var niftyusername = response.data.DETAILS.niftyusername;
                                    $window.localStorage.setItem('niftyUserName',niftyusername);
                                    $state.go('dashboard');
                                }
                                else{
                                    alert('Sorry!, This account is not linked with Nifty. Please download our mobile and create an account');
                                    FB.logout();
                                    console.log(data.MESSAGE);
                                }
                            });
                        });
                    }
                },{
                    scope: 'email',
                    return_scope: true
                });
            };
        }]);
