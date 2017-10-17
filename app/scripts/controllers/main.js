'use strict';

/**
 * @ngdoc function
 * @name niftybinzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the niftybinzApp
 */
angular.module('niftybinzApp')
    .controller('MainCtrl', ['$rootScope','$scope','$state','$http','loginService','$window','postDataService', function ($rootScope,$scope,$state,$http, loginService ,$window,postDataService) {
        // this.awesomeThings = [
        //     'HTML5 Boilerplate',
        //     'AngularJS',
        //     'Karma'
        // ];
        // $scope.user={ 'name':'', 'password':''};
        $scope.invalidData = false;



        //Log in check, when user logged in through nifty account.
        $scope.onLoginCheck = function () {
            $scope.invalidData = false;
            $scope.dataLoading = true;
            $window.localStorage.setItem('niftyUserName',$scope.user.name);
            console.log($window.localStorage.getItem('niftyUserName'));
            var apiParams= {"username":$scope.user.name, "password": $scope.user.password};
            $.ajax({
                // url: "http://192.168.137.57:3000/niftybinzlogin",
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
                    console.log(response);
                    if (response.STATUS == "EXIST"){
                        $scope.dataLoading = false;
                        $state.go('dashboard');
                    }
                    else{
                        $scope.dataLoading = false;
                        $scope.invalidData = true;
                        $scope.$digest();
                        console.log('status is not correct')
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
                        console.log('response from server...',response.data);
                        if (response.data.STATUS == 'EXISTS'){
                        var niftyusername = response.data.DETAILS.niftyusername;
                        console.log('username..',niftyusername);
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

        // function signInCallback(authResult) {
        //     console.log(authResult);
        //     if (authResult['code']) {
        //         var apiParams = {
        //             "authcode": authResult['code']
        //         };
        //
        //         console.log(authResult['code']);
        //         // Send the auth code to the server
        //         $.ajax({
        //             url: "/passtokentoserver",
        //             type: "POST",
        //             headers: {
        //                 'X-Requested-With': 'XMLHttpRequest'
        //             },
        //             contentType: "application/json;charset=utf-8",
        //             dataType: "json",
        //             processData: false,
        //             data: JSON.stringify(apiParams),
        //             success: function (response) {
        //                 if (response.STATUS == 'SUCCESS') {
        //                     //alert(response.MESSAGE);
        //                     console.log(response);
        //                     $scope.$apply(function () {
        //                         $scope.showLinkEmail = true;
        //                         console.log("APPLY")
        //                     });
        //                 }
        //             }
        //         });
        //     }
        // }



        $scope.showLinkEmail = false;

        $scope.gmail = {
            userName: "",
            email: ""
        };

        $scope.facebook = {
            Id: "",
            Name: "",
            Picture:""
        };

        $scope.dummy = {
            id: "10155609754188886",
            name: "Hari Ŋair",
            picture:"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/18951231_10155251382328886_3616901027800973859_n.jpg?oh=cbecc733c42463bb2e5f07d03f71acee&oe=5A4B5B36"
        };

        // $scope.onGoogleLogin = function (){
        //     auth2.grantOfflineAccess().then(signInCallback);
        // };

        // $scope.onGoogleLogin1 = function () {
        //     var params = {
        //         'clientid': '786033947350-qecnse6l4oc2c7chu4t730c9ifm9lvpk.apps.googleusercontent.com',
        //         'redirect_uri' : 'http://localhost:9000/#!/',
        //         'cookiepolicy': 'single_host_origin',
        //         'callback': function (result) {
        //             console.log(result);
        //             if (result['status']['signed_in']) {
        //                 //console.log(result);
        //                 var request = gapi.client.plus.people.get({
        //                     'userId': 'me'
        //                 });
        //                 request.execute(function (resp) {
        //                     console.log(resp);
        //                     $scope.$apply(function () {
        //                         $scope.gmail.userName = resp.displayName;
        //                         $scope.gmail.email = resp.emails[0].value;
        //                     });
        //                 });
        //                 $scope.showLinkEmail = true;
        //             }
        //         },
        //         'approvalprompt': 'force',
        //         'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.profile.emails.read'
        //     };
        //     // gapi.auth.signIn(params);
        // };

        $scope.onFaceBookLogin = function(){
            console.log('fblog......');
            FB.login(function(response){
                console.log('response......',response);
                console.log(response.authResponse);
                if(response.authResponse){
                    FB.api('/me', 'GET', {fields: 'email, first_name, name, id, picture '},function(response){
                        $scope.$apply(function () {
                            $scope.facebook.Name = response.name;
                            $scope.facebook.Id = response.id;
                            $scope.facebook.Picture = response.picture.data.url;
                            $scope.showLinkEmail = true;
                        });
                        console.log(response.email);
                        console.log($scope.facebook);
                            console.log(loginService.facebookLogin($scope.facebook));
                            loginService.facebookLogin($scope.facebook).then(function (response) {
                                console.log('niftydata......',response.data);
                                if(response.data.STATUS=='EXISTS'){
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

        $scope.showSignIn = true;
        $scope.showSignUp = false;

        $scope.emailAccounts = [
            {
                'emailProvider': "gmail",
                'isSelected': false
            },
            {
                'emailProvider': "yahoo",
                'isSelected': false
            },
            {
                'emailProvider': "exchange",
                'isSelected': false
            },
            {
                'emailProvider': "outlook",
                'isSelected': false
            },
            {
                'emailProvider': "aol",
                'isSelected': false
            },
            {
                'emailProvider': "icloud",
                'isSelected': false
            }
        ];

        $scope.selectEmailAccount = function (emailAccount) {
            emailAccount.isSelected = !emailAccount.isSelected;
            $scope.emailSelected = false;
            if (emailAccount.isSelected) {
                $scope.emailSelected = true;
                angular.forEach($scope.emailAccounts, function (value, key) {
                    if (emailAccount.emailProvider !== value.emailProvider) {
                        value.isSelected = false;
                    }
                });
            }
        }


    }]);
