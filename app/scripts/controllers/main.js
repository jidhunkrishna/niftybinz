'use strict';

/**
 * @ngdoc function
 * @name niftybinzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the niftybinzApp
 */
angular.module('niftybinzApp')
    .controller('MainCtrl', ['$scope','$state','$http','loginService', function ($scope,$state,$http, loginService ) {
        // this.awesomeThings = [
        //     'HTML5 Boilerplate',
        //     'AngularJS',
        //     'Karma'
        // ];
        $scope.user={ 'name':'', 'password':''};
        $scope.invalidData = false;

        $scope.onLoginCheck = function () {
            $scope.invalidData = false;
            $scope.dataLoading = true;
            var apiParams= {"username":$scope.user.name, "password": $scope.user.password}
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

        $('#signinButton').click(function () {
            auth2.grantOfflineAccess().then(signInCallback);
            console.log("GOOGLE");
        });

        function signInCallback(authResult) {
            console.log(authResult);
            if (authResult['code']) {
                var apiParams = {
                    "authcode": authResult['code']
                };

                console.log(authResult['code']);
                // Send the auth code to the server
                $.ajax({
                    url: "/passtokentoserver",
                    type: "POST",
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    processData: false,
                    data: JSON.stringify(apiParams),
                    success: function (response) {
                        if (response.STATUS == 'SUCCESS') {
                            //alert(response.MESSAGE);
                            console.log(response);
                            $scope.$apply(function () {
                                $scope.showLinkEmail = true;
                                console.log("APPLY")
                            });
                        }
                    }
                });
            }
        }

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

        $scope.onGoogleLogin = function (){
            auth2.grantOfflineAccess().then(signInCallback);
        }

        $scope.onGoogleLogin1 = function () {
            var params = {
                'clientid': '786033947350-qecnse6l4oc2c7chu4t730c9ifm9lvpk.apps.googleusercontent.com',
                'redirect_uri' : 'http://localhost:9000/#!/',
                'cookiepolicy': 'single_host_origin',
                'callback': function (result) {
                    console.log(result);
                    if (result['status']['signed_in']) {
                        //console.log(result);
                        var request = gapi.client.plus.people.get({
                            'userId': 'me'
                        });
                        request.execute(function (resp) {
                            console.log(resp);
                            $scope.$apply(function () {
                                $scope.gmail.userName = resp.displayName;
                                $scope.gmail.email = resp.emails[0].value;
                            });
                        });
                        $scope.showLinkEmail = true;
                    }
                },
                'approvalprompt': 'force',
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.profile.emails.read'
            };
            gapi.auth.signIn(params);
        }

        $scope.onFaceBookLogin = function(){
            FB.login(function(response){
                if(response.authResponse){
                    FB.api('/me', 'GET', {fields: 'email, first_name, name, id, picture '},function(response){
                        $scope.$apply(function () {
                            $scope.facebook.Name = response.name;
                            $scope.facebook.Id = response.id;
                            $scope.facebook.Picture = response.picture.data.url;
                            $scope.showLinkEmail = true;
                        });
                        console.log($scope.facebook);
                        setTimeout(function () {
                            //  loginService.facebookLogin($scope.dummy).success(function (data) {
                            //    console.log(data);
                            //  });
                            $.ajax({
                                url: "/addfbuser",
                                type: "POST",
                                headers: {
                                    'X-Requested-With': 'XMLHttpRequest'
                                },
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                processData: false,
                                data: JSON.stringify($scope.facebook),
                                success: function (response) {
                                    if (response.STATUS == 'SUCCESS') {
                                        //alert(response.MESSAGE);
                                        console.log(response);
                                    }
                                }
                            });
                        }, 1000);
                    });
                }
                else{
                    //error
                }
            }, {
                scope: 'email',
                return_scope: true
            });
        }

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

        $scope.filterCategories=['tax','expense','medical','coupons','insurance','car','work','membership','house','kids','others','all'];

        $scope.list = [
            {
                'fileType' : "email",
                'name': "20% off everything",
                'date': "20 Sep",
                'category': "coupons"
            },{
                'fileType' : "email",
                'name': "15% off clothes",
                'date': "20 Sep",
                'category': "coupons"
            },{
                'fileType' : "doc",
                'name': "meeting minutes",
                'date': "19 Sep",
                'category': "work"
            },{
                'fileType' : "img",
                'name': "kohls coupomn",
                'date': "19 Sep",
                'category': "coupon"
            },{
                'fileType' : "email",
                'name': "Report card for september",
                'date': "18 Sep",
                'category': "kids"
            },{
                'fileType' : "img",
                'name': "art work tuesday",
                'date': "17 Sep",
                'category': "kids"
            },{
                'fileType' : "doc",
                'name': "requirements",
                'date': "15 Sep",
                'category': "work"
            },{
                'fileType' : "email",
                'name': "Car service in 10 days",
                'date': "15 Sep",
                'category': "car"
            },
        ];

        //     $scope.signInCallback =function (authResult) {
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
        //                 }
        //             }
        //         });
        //     }
        // }


    }]);
