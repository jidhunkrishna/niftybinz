'use strict';
/**
 * Created by jidhun krishna on 6/10/17.
 */
/**
 * @ngdoc overview
 * @name niftybinzApp
 * @description
 * # niftybinzApp
 *
 * Main module of the application.
 */

angular
    .module('niftybinzApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function ($locationProvider, $routeProvider,$stateProvider,$urlRouterProvider) {
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/main');
        $urlRouterProvider.when('/dashboard', '/dashboard/home');
        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "views/main.html",
                controller: 'MainCtrl',
                authenticate:false
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "views/dashboard.html",
                controller: 'DashboardCtrl',
                authenticate: true
            })
            .state('home', {
                url: '/home',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/home.html',
                authenticate: true
            })
            .state('archives', {
                url: '/archives',
                parent: 'dashboard',
                authenticate: true,
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
                authenticate: true,
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
                authenticate: true,
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
                authenticate: true,
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
                authenticate: true,
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
                authenticate: true,
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
                authenticate: true,
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
                authenticate: true,
                resolve:{
                        reminderLists:function(dataFetchService){
                        var category="Reminder";
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
angular.module("niftybinzApp")
    .run(function($transitions,$state) {
        $transitions.onStart({ }, function(trans) {
            var auth = trans.injector().get('Authorization');
            trans.promise.then(function (value) {
                var authenticate = value.authenticate;
                if (authenticate && !auth.isAuthenticated()) {
                    // User isn't authenticated. Redirect to a login page
                    return $state.go('main');
                }
            });

        });
    });
