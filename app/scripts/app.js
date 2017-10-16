'use strict';

/**
 * @ngdoc overview
 * @name niftybinzApp
 * @description
 * # niftybinzApp
 *
 * Main module of the application.
 */

function onLoadFunction() {
    gapi.client.setApiKey('AIzaSyB3OzW6ibhZg8HJfkWDVFlFNVB4wJyyi7Q');
    gapi.client.load('plus', 'v1', function () {});

    window.fbAsyncInit = function () {
        FB.init({
            appId: '140101496606692',
            cookie: true,
            xfbml: true,
            version: 'v2.10',
            status: true
        });
        //FB.AppEvents.logPageView();  
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                console.log("FB connected");
            } else if (response.status === 'not_authorized') {
                console.log("FB not authorized");
            } else {

            }
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}


angular
    .module('niftybinzApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'ui.router'
    ])
    .config(function ($locationProvider, $routeProvider,$stateProvider,$urlRouterProvider) {
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/main');
        $urlRouterProvider.when('/dashboard', '/dashboard/home');
        /*$routeProvider
         .when('/', {
         templateUrl: 'views/main.html',
         controller: 'MainCtrl',
         controllerAs: 'main'
         })
         .when('/about', {
         templateUrl: 'views/about.html',
         controller: 'AboutCtrl',
         controllerAs: 'about'
         })
         .when('/dashboard', {
         templateUrl: 'views/dashboard.html',
         controller: 'DashboardCtrl',
         controllerAs: 'dashboard'
         })
         .when('/archives', {
         templateUrl: 'views/dashboard/archives.html',
         controller: 'ArchivesCtrl',
         controllerAs: 'archives'
         })
         .otherwise({
         redirectTo: '/'
         });*/

        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "views/main.html",
                controller: 'MainCtrl'
            })
            .state('about', {
                url: "/about",
                templateUrl: "views/about.html",
                controller: 'AboutCtrl'
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "views/dashboard.html",
                controller: 'DashboardCtrl'
            })
            .state('home', {
                url: '/home',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/home.html'
            })
            .state('archives', {
                url: '/archives',
                parent: 'dashboard',
                resolve:{
                    archiveLists:function(dataFetchService){
                        var category='';
                        return  dataFetchService.getList(category);
                    }
                },
                views: {
                    '@dashboard': {
                        templateUrl: 'views/dashboard/archives.html',
                        controller: 'ArchiveCtrl'
                    }
                }
            })
            .state('coupons', {
                url: '/coupons',
                parent: 'dashboard',
                resolve:{
                    couponsLists:function(dataFetchService){
                        var category="Coupon";
                        return  dataFetchService.getList(category);
                    }
                },
                views: {
                    '@dashboard': {
                        templateUrl: 'views/dashboard/coupons.html',
                        controller: 'CouponCtrl'
                    }
                }
            })
            .state('coupons details', {
                url: '/details/{param:json}',
                parent: 'coupons',
                views: {
                    '@dashboard': {
                        templateUrl: 'views/dashboard/coupon_detail.html',
                        controller: 'CouponDetailCtrl'
                    }
                }
            })
            .state('orders', {
                url: '/orders',
                parent: 'dashboard',
                resolve:{
                    ordersLists:function(dataFetchService){
                        var category="Order";
                        return  dataFetchService.getList(category);
                    }
                },
                views: {
                    '@dashboard': {
                        templateUrl: 'views/dashboard/orders.html',
                        controller: 'OrderCtrl'
                    }
                }
            })
            .state('expense', {
                url: '/expense',
                parent: 'dashboard',
                resolve:{
                    expenseLists:function(dataFetchService){
                        var category="Expense";
                        return  dataFetchService.getList(category);
                    }
                },
                views: {
                    '@dashboard': {
                        templateUrl: 'views/dashboard/common.html',
                        controller: 'ExpenseCtrl'
                    }
                }
            })
            .state('income', {
                url: '/income',
                parent: 'dashboard',
                resolve:{
                    incomeLists:function(dataFetchService){
                        var category="Income";
                        return  dataFetchService.getList(category);
                    }
                },
                views: {
                    '@dashboard': {
                        templateUrl: 'views/dashboard/common.html',
                        controller: 'IncomeCtrl'
                    }
                }
            })
            .state('todo', {
                url: '/todo',
                parent: 'dashboard',
                resolve:{
                    todoLists:function(dataFetchService){
                        var category="Todo";
                        return  dataFetchService.getList(category);
                    }
                },
                views: {
                    '@dashboard': {
                        templateUrl: 'views/dashboard/common.html',
                        controller: 'TodoCtrl'
                    }
                }
            })
            .state('reminder', {
                url: '/reminders',
                parent: 'dashboard',
                resolve:{
                        reminderLists:function(dataFetchService){
                        var category="Reminders";
                        return  dataFetchService.getList(category);
                    }
                },
                views: {
                    '@dashboard': {
                        templateUrl: 'views/dashboard/common.html',
                        controller: 'ReminderCtrl'
                    }
                }
            })
    });