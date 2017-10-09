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
                controller: 'DashboardCtrl',
                resolve:{
                    archiveLists:function(dataFetchService){
                        return  dataFetchService.getArchiveList();
                    }
                }
            })
            .state('home', {
                url: '/home',
                parent: 'dashboard',
                // views: {
                //     'home': {
                //         templateUrl: 'views/dashboard/home.html'
                //         // controller: 'ArchiveCtrl'
                //     }
                // }
                templateUrl: 'views/dashboard/home.html'
            })
            .state('archives', {
                url: '/archives',
                parent: 'dashboard',
                views: {
                    'archive': {
                        templateUrl: 'views/dashboard/archives.html',
                        controller: 'ArchiveCtrl'
                    }
                }
                // templateUrl: 'views/dashboard/archives.html',
                // controller: 'ArchiveCtrl'
            })
            .state('coupons', {
                url: '/coupons',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/coupons.html'
            })
    });