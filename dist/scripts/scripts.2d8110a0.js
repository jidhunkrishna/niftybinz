"use strict";function onLoadFunction(){gapi.client.setApiKey("AIzaSyB3OzW6ibhZg8HJfkWDVFlFNVB4wJyyi7Q"),gapi.client.load("plus","v1",function(){}),window.fbAsyncInit=function(){FB.init({appId:"140101496606692",cookie:!0,xfbml:!0,version:"v2.10",status:!0}),FB.getLoginStatus(function(a){"connected"===a.status?console.log("FB connected"):"not_authorized"===a.status&&console.log("FB not authorized")})},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_US/sdk.js",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk")}angular.module("niftybinzApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","ui.router"]).config(["$locationProvider","$routeProvider","$stateProvider","$urlRouterProvider",function(a,b,c,d){a.hashPrefix(""),d.otherwise("/main"),d.when("/dashboard","/dashboard/home"),c.state("main",{url:"/main",templateUrl:"views/main.html",controller:"MainCtrl"}).state("about",{url:"/about",templateUrl:"views/about.html",controller:"AboutCtrl"}).state("dashboard",{url:"/dashboard",templateUrl:"views/dashboard.html",controller:"DashboardCtrl",resolve:{archiveLists:["dataFetchService",function(a){return a.getArchiveList()}]}}).state("home",{url:"/home",parent:"dashboard",templateUrl:"views/dashboard/home.html"}).state("archives",{url:"/archives",parent:"dashboard",templateUrl:"views/dashboard/archives.html",controller:"ArchiveCtrl"}).state("coupons",{url:"/coupons",parent:"dashboard",templateUrl:"views/dashboard/coupons.html"})}]),angular.module("niftybinzApp").controller("MainCtrl",["$scope","$state","$http","loginService",function(a,b,c,d){function e(b){if(console.log(b),b.code){var c={authcode:b.code};console.log(b.code),$.ajax({url:"/passtokentoserver",type:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},contentType:"application/json;charset=utf-8",dataType:"json",processData:!1,data:JSON.stringify(c),success:function(b){"SUCCESS"==b.STATUS&&(console.log(b),a.$apply(function(){a.showLinkEmail=!0,console.log("APPLY")}))}})}}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user={name:"",password:""},a.invalidData=!1,a.onLoginCheck=function(){a.invalidData=!1,a.dataLoading=!0;var c={username:a.user.name,password:a.user.password};$.ajax({url:"http://chiteacake.com/niftybinzlogin",type:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},contentType:"application/json;charset=utf-8",dataType:"json",processData:!1,data:JSON.stringify(c),success:function(c){console.log("Successfully logged in."),console.log(c),"EXIST"==c.STATUS?(a.dataLoading=!1,b.go("dashboard")):(a.dataLoading=!1,a.invalidData=!0,a.$digest(),console.log("status is not correct"))},error:function(b,c,d){a.dataLoading=!1,a.invalidData=!0,a.$digest(),console.log(b.MESSAGE)}})},$("#signinButton").click(function(){auth2.grantOfflineAccess().then(e),console.log("GOOGLE")}),a.showLinkEmail=!1,a.gmail={userName:"",email:""},a.facebook={Id:"",Name:"",Picture:""},a.dummy={id:"10155609754188886",name:"Hari Ŋair",picture:"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/18951231_10155251382328886_3616901027800973859_n.jpg?oh=cbecc733c42463bb2e5f07d03f71acee&oe=5A4B5B36"},a.onGoogleLogin=function(){auth2.grantOfflineAccess().then(e)},a.onGoogleLogin1=function(){var b={clientid:"786033947350-qecnse6l4oc2c7chu4t730c9ifm9lvpk.apps.googleusercontent.com",redirect_uri:"http://localhost:9000/#!/",cookiepolicy:"single_host_origin",callback:function(b){if(console.log(b),b.status.signed_in){var c=gapi.client.plus.people.get({userId:"me"});c.execute(function(b){console.log(b),a.$apply(function(){a.gmail.userName=b.displayName,a.gmail.email=b.emails[0].value})}),a.showLinkEmail=!0}},approvalprompt:"force",scope:"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.profile.emails.read"};gapi.auth.signIn(b)},a.onFaceBookLogin=function(){FB.login(function(b){b.authResponse&&FB.api("/me","GET",{fields:"email, first_name, name, id, picture "},function(b){a.$apply(function(){a.facebook.Name=b.name,a.facebook.Id=b.id,a.facebook.Picture=b.picture.data.url,a.showLinkEmail=!0}),console.log(a.facebook),setTimeout(function(){$.ajax({url:"/addfbuser",type:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},contentType:"application/json;charset=utf-8",dataType:"json",processData:!1,data:JSON.stringify(a.facebook),success:function(a){"SUCCESS"==a.STATUS&&console.log(a)}})},1e3)})},{scope:"email",return_scope:!0})},a.showSignIn=!0,a.showSignUp=!1,a.emailAccounts=[{emailProvider:"gmail",isSelected:!1},{emailProvider:"yahoo",isSelected:!1},{emailProvider:"exchange",isSelected:!1},{emailProvider:"outlook",isSelected:!1},{emailProvider:"aol",isSelected:!1},{emailProvider:"icloud",isSelected:!1}],a.selectEmailAccount=function(b){b.isSelected=!b.isSelected,a.emailSelected=!1,b.isSelected&&(a.emailSelected=!0,angular.forEach(a.emailAccounts,function(a,c){b.emailProvider!==a.emailProvider&&(a.isSelected=!1)}))},a.filterCategories=["tax","expense","medical","coupons","insurance","car","work","membership","house","kids","others","all"],a.list=[{fileType:"email",name:"20% off everything",date:"20 Sep",category:"coupons"},{fileType:"email",name:"15% off clothes",date:"20 Sep",category:"coupons"},{fileType:"doc",name:"meeting minutes",date:"19 Sep",category:"work"},{fileType:"img",name:"kohls coupomn",date:"19 Sep",category:"coupon"},{fileType:"email",name:"Report card for september",date:"18 Sep",category:"kids"},{fileType:"img",name:"art work tuesday",date:"17 Sep",category:"kids"},{fileType:"doc",name:"requirements",date:"15 Sep",category:"work"},{fileType:"email",name:"Car service in 10 days",date:"15 Sep",category:"car"}]}]),angular.module("niftybinzApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("niftybinzApp").service("loginService",["$http","$rootScope",function(a,b){var c={};c.googleLogin=function(){var c=JSON.stringify({authcode:""}),d="http://chiteacake.com/passtokentoserver";return a({url:d,method:"POST",headers:{"Content-Type":"application/json",Authorization:b.authorizationToken},data:c})},c.facebookLogin=function(){var c=JSON.stringify({authcode:""}),d="http://chiteacake.com/addfbuser";return a({url:d,method:"POST",headers:{"Content-Type":"application/json",Authorization:b.authorizationToken},data:c})},c.gmailLogin=function(){var c=JSON.stringify({authcode:""}),d="http://chiteacake.com/readgooglemails";return a({url:d,method:"POST",headers:{"Content-Type":"application/json",Authorization:b.authorizationToken},data:c})}}]),angular.module("niftybinzApp").service("dataFetchService",["$q","$http","$rootScope",function(a,b,c){var d=this;return d.getArchiveList=function(){var b=a.defer(),c={useremail:"shanavaswn@gmail.com",category:""},d=[];return $.ajax({url:"http://chiteacake.com/readgooglemails",type:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},contentType:"application/json;charset=utf-8",dataType:"json",processData:!1,data:JSON.stringify(c),success:function(a){if("SUCCESS"==a.STATUS){var c=a.DETAILS.DATA.Items;console.log(c),angular.forEach(c,function(a,b){d.push({fileType:a.c_domain,name:a.subject,date:a.date,category:a.category})}),b.resolve(d)}else console.log(a),console.log("status is not correct")},error:function(a,c,d){console.log(response.MESSAGE),b.reject(a)}}),b.promise},console.log("qqqqqqqqqqqqq",d),d}]),angular.module("niftybinzApp").controller("DashboardCtrl",["$scope","$filter","$location","$state","archiveLists",function(a,b,c,d,e){console.log("archivelist11111111",e),a.goTo=function(){console.log("goto"),c.path("#/archives")},a.totalList=[],a.archiveLists=e,$(document).ready(function(){}),a.$state=d,a.searchArchiveText="",console.log(a.$state),a.archiveFilters=[{filterName:"tax",isDisabled:!0,isSelected:!1},{filterName:"expense",isDisabled:!0,isSelected:!1},{filterName:"medical",isDisabled:!0,isSelected:!1},{filterName:"coupons",isDisabled:!0,isSelected:!1},{filterName:"insurance",isDisabled:!0,isSelected:!1},{filterName:"car",isDisabled:!0,isSelected:!1},{filterName:"work",isDisabled:!0,isSelected:!1},{filterName:"membership",isDisabled:!0,isSelected:!1},{filterName:"house",isDisabled:!0,isSelected:!1},{filterName:"kids",isDisabled:!0,isSelected:!1},{filterName:"others",isDisabled:!0,isSelected:!1},{filterName:"all",isDisabled:!1,isSelected:!0}],a.tempCategories=b("unique")(a.archiveLists,"category"),a.archiveFilters.forEach(function(b){a.tempCategories.forEach(function(a){b.filterName===a.category&&(b.isDisabled=!1)})}),a.checkCategories=function(a,c){var d=b("unique")(a,"category");c.forEach(function(a){d.forEach(function(b){a.filterName===b.category&&(a.isDisabled=!1)})})},a.archiveSortType="date",a.sortReverse=!1,a.archiveFilterBy="",a.archiveSelectFilter=function(b){return b.isDisabled?!1:("all"===b.filterName?a.archiveFilterBy="":a.archiveFilterBy=b.filterName,b.isSelected=!b.isSelected,void(b.isSelected?angular.forEach(a.archiveFilters,function(a,c){b.filterName!==a.filterName&&(a.isSelected=!1)}):(a.archiveFilters[11].isSelected=!0,a.archiveFilterBy="")))},a.couponFilters=[{filterName:"fashion",isDisabled:!0,isSelected:!1},{filterName:"dining",isDisabled:!0,isSelected:!1},{filterName:"groceries",isDisabled:!0,isSelected:!1},{filterName:"home & services",isDisabled:!0,isSelected:!1},{filterName:"electronics",isDisabled:!0,isSelected:!1},{filterName:"health & beauty",isDisabled:!0,isSelected:!1},{filterName:"hotel & travel",isDisabled:!0,isSelected:!1},{filterName:"misc",isDisabled:!0,isSelected:!1}],a.couponLists=[{company:"A&F",name:"25% off whatever you want",date:"20 Sep",category:"fashion"},{company:"My Protien",name:"EVERYTHING DISCOUNTED- 60% Off ",date:"20 Sep",category:"health & beauty"},{company:"Hello Fresh",name:"Claim your $35 Meal Voucher!",date:"19 Sep",category:"groceries"},{company:"Tango",name:"Your 10% Off Coupon Code is Inside",date:"19 Sep",category:"misc"},{company:"Hotels.com",name:"Deals Expire Soon: Up to 50% off",date:"18 Sep",category:"hotel & travel"},{company:"Zappos",name:"No strings attached… $25 just for you",date:"17 Sep",category:"fashion"},{company:"AMC Stubs",name:"requirements",date:"15 Sep",category:"home & services"}],a.couponSortType="date",a.couponFilterBy="",a.checkCategories(a.couponLists,a.couponFilters),a.couponSelectFilter=function(b){return b.isDisabled?!1:(a.couponFilterBy=b.filterName,b.isSelected=!b.isSelected,void(b.isSelected?angular.forEach(a.couponFilters,function(a,c){b.filterName!==a.filterName&&(a.isSelected=!1)}):a.couponFilterBy=""))}}]),angular.module("niftybinzApp").controller("ArchiveCtrl",["$scope","$filter","$location","$state","archiveLists",function(a,b,c,d,e){a.archiveLists=e,$("#archiveTable").DataTable({data:a.archiveLists,columns:[{data:"fileType"},{data:"name"},{data:"date"}],info:!1,lengthChange:!1,paging:!1,searching:!1})}]),angular.module("niftybinzApp").filter("unique",function(){return function(a,b){if(b===!1)return a;if((b||angular.isUndefined(b))&&angular.isArray(a)){var c=[],d=function(a){return angular.isObject(a)&&angular.isString(b)?a[b]:a};angular.forEach(a,function(a){for(var b=!1,e=0;e<c.length;e++)if(angular.equals(d(c[e]),d(a))){b=!0;break}b||c.push(a)}),a=c}return a}}),angular.module("niftybinzApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/dashboard.html",'<!--<div ng-cloak="" class="gridListdemoBasicUsage">\n\n    <md-grid-list md-cols-xs="2" md-cols-sm="2" md-cols-md="3" md-cols-gt-md="3" md-row-height-gt-md="1:1" md-row-height="4:2"  md-gutter="12px" md-gutter-gt-sm="8px">\n\n        <md-grid-tile class="light-blue">\n            <md-grid-tile-footer>\n                <h3>REMINDERS</h3>\n            </md-grid-tile-footer>\n        </md-grid-tile>\n\n        <md-grid-tile class="light-blue">\n            <md-grid-tile-footer>\n                <h3>TO DO</h3>\n            </md-grid-tile-footer>\n        </md-grid-tile>\n\n        <md-grid-tile class="light-blue">\n            <md-grid-tile-footer>\n                <h3>ORDERS</h3>\n            </md-grid-tile-footer>\n        </md-grid-tile>\n        \n        <md-grid-tile class="color">\n            <md-grid-tile-footer>\n                <h3>#3: (1r x 1c)</h3>\n            </md-grid-tile-footer>\n        </md-grid-tile>\n\n        <md-grid-tile class="dark-blue" md-rowspan="1" md-colspan="3" md-colspan-sm="1" md-colspan-xs="2" ng-href="#/archives">\n            <md-grid-tile-footer ng-href="#/archives">\n                <h3 ng-href="#/archives">ARCHIVES</h3>\n            </md-grid-tile-footer>\n        </md-grid-tile>\n        \n        <md-grid-tile class="light-blue">\n            <md-grid-tile-footer>\n                <h3>COUPONS</h3>\n            </md-grid-tile-footer>\n        </md-grid-tile>\n\n        <md-grid-tile class="light-blue">\n            <md-grid-tile-footer>\n                <h3>EXPENSE</h3>\n            </md-grid-tile-footer>\n        </md-grid-tile>\n\n        <md-grid-tile class="light-blue">\n            <md-grid-tile-footer>\n                <h3>INCOME</h3>\n            </md-grid-tile-footer>\n        </md-grid-tile>\n\n    </md-grid-list>\n</div>--> <div class="dashboard-page"> <div class="container-fluid"> <!--<nav class="navbar navbar-default">\n            <div class="container">\n                <div class="navbar-header">\n                    <a class="navbar-brand" href="#/dashboard">\n                        <img alt="Brand" src="/images/logo.png">\n                    </a>\n                    <a ui-sref="home" class="btn btn-primary btn-outline btn-rounded">HOME</a>\n                    <p class="navbar-text">{{$state.current.name | uppercase}}</p>\n                </div>\n            </div>\n        </nav>--> <!--<div class="row">\n            <div class="col-sm-3 col-md-2 sidebar">\n                <div class="text-center">\n                    <h2 class="brand">NIFTYBINZ</h2>\n                    <img src="images/flat-avatar.png" class="user-avatar" /><br />\n                    <a ui-sref="login" class="btn btn-white btn-outline btn-rounded btn-sm">Logout</a>\n                </div>\n\n                <ul class="nav nav-sidebar">\n                    <li ng-class="{active: $state.includes(\'home\')}"><a ui-sref="home">DASHBOARD</a></li>\n                    <li><a ui-sref="main">Logout</a></li>\n                </ul>\n\n            </div>--> <!--            <div class="col-sm-3 col-md-2 sidebar">\n\n                <div class="text-center">\n                    <h2 class="brand">NIFTYBINZ</h2>\n                    <img src="images/flat-avatar.png" class="user-avatar" /><br />\n                    <a ui-sref="login" class="btn btn-white btn-outline btn-rounded btn-sm">Logout</a>\n                </div>\n\n                <ul class="nav nav-sidebar">\n                    <li ng-class="{active: $state.includes(\'archives\')}"><a ui-sref="archives">ARCHIVES</a></li>\n                    <li ng-class="{active: $state.includes(\'reminders\')}"><a ui-sref="reminders">REMINDERS</a></li>\n                    <li ng-class="{active: $state.includes(\'coupons\')}"><a ui-sref="coupons">COUPONS</a></li>\n                    <li ng-class="{active: $state.includes(\'todo\')}"><a ui-sref="todo">TO DO</a></li>\n                </ul>\n\n            </div>--> <div class="row"> <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-1 header"> <div class="col-xs-1 col-md-2 home-button"> <a ui-sref="home" class="btn btn-primary btn-outline btn-rounded" ng-hide="$state.current.name === \'home\' "><span class="glyphicon glyphicon-home" aria-hidden="true"></span> HOME</a> </div> <div class="col-xs-8 col-md-8 text-center"> <h2>{{$state.current.name | uppercase}}</h2> </div> <div class="col-xs-1 col-md-2 logout-button text-right"> <a ui-sref="main" class="btn btn-primary btn-rounded">Logout</a> </div> </div> </div> <div class="row"> <div class="col-sm-9 col-sm-offset-3 col-md-12 col-md-offset-0 main" ui-view> </div> </div> </div> </div> '),a.put("views/dashboard/archives.html",'<div class="archives-page"> <!--<div class="col-md-12 header">\n        <div class="col-md-2 home-button">\n            <a ui-sref="home" class="btn btn-primary btn-outline btn-rounded">HOME</a>\n        </div>\n        <div class="col-md-8 text-center">\n            <h2>ARCHIVES</h2>\n        </div>\n    </div>--> <div class="container"> <div class="input-group col-md-12"> <input type="text" class="form-control input-lg" ng-model="searchArchiveText" placeholder="Search archives"> <span class="input-group-btn" ng-show="searchArchiveText.length==0"> <button class="btn btn-info btn-lg" type="button"> <i class="glyphicon glyphicon-search"></i> </button> </span> <span class="input-group-btn" ng-hide="searchArchiveText.length==0" ng-click="searchArchiveText=\'\'"> <button class="btn btn-info btn-lg" type="button"> <i class="glyphicon glyphicon-remove"></i> </button> </span> </div> <div class="row"> <div class="col-lg-12 col-md-12 col-sm-4 text-center filters"> <!--<span class="filter-button" ng-repeat="filter in archiveFilters">{{filter}}</span>--> <div class="btn-group" role="group" aria-label="..."> <div class="btn-group" role="group" ng-repeat="filter in archiveFilters"> <button type="button" ng-click="archiveSelectFilter(filter)" class="btn btn-default" ng-class="{selected: filter.isSelected, disabled: filter.isDisabled}"> {{filter.filterName | uppercase}} </button> </div> </div> </div> </div> <div class="row"> <table id="archiveTable" class="table table-bordered table-striped"> <thead> <tr> <td> <span ng-click="sortType = \'fileType\' ; sortReverse = !sortReverse"> TYPE <span ng-show="sortType == \'fileType\'" class="fa fa-caret-down"></span> </span> </td> <td> <span ng-click="sortType = \'name\' ; sortReverse = !sortReverse"> <span ng-show="sortType == \'name\'" class="fa fa-caret-down"></span> NAME </span> </td> <td> <span ng-click="sortType = \'date\' ; sortReverse = !sortReverse"> <span ng-show="sortType == \'date\'" class="fa fa-caret-down"></span> DATE </span> </td> </tr> </thead> <!--<tbody>--> <!--<tr ng-repeat="list in archiveLists | orderBy:archiveSortType:sortReverse | filter:archiveFilterBy | filter:searchArchiveText">--> <!--<td>{{ list.fileType }}</td>--> <!--<td>{{ list.name }}</td>--> <!--<td>{{ list.date }}</td>--> <!--</tr>--> <!--</tbody>--> </table> <!--<table id="archiveTable" class="display" width="100%"></table>--> <!-- <md-list>\n                    <md-list-item ng-repeat="list in lists">\n                        <md-icon mdListIcon>mail</md-icon>\n                        <h3 mdLine> {{list.name}} </h3>\n                        <p mdLine> {{list.date}} </p>\n                    </md-list-item>\n                </md-list>--> </div> </div> </div>'),a.put("views/dashboard/coupons.html",'<div class="archives-page"> <!--<div class="col-md-12 header">\n        <div class="col-md-2 home-button">\n            <a ui-sref="home" class="btn btn-primary btn-outline btn-rounded">HOME</a>\n        </div>\n        <div class="col-md-8 text-center">\n            <h2>ARCHIVES</h2>\n        </div>\n    </div>--> <h2>COUPONS Page</h2> </div>'),a.put("views/dashboard/home.html",'<div class="container home-page"> <div class="col-md-12 col-md-offset-1 icon-grid"> <div class="col-md-3 icon-block" ui-sref="archives"> <img src="images/dashboardIcons/archives.png" alt=""> <a class="btn btn-block btn-lg"> <span>ARCHIVES</span></a> </div> <div class="col-md-3 icon-block" ui-sref="reminders"> <img src="images/dashboardIcons/reminders.png" alt=""> <a class="btn btn-block btn-lg"> <span class="texto_grande"><i class="fa fa-plus-circle"></i>REMINDERS</span></a> </div> <div class="col-md-3 icon-block" ui-sref="coupons"> <img src="images/dashboardIcons/coupons.png" alt=""> <a class="btn btn-block btn-lg" data-toggle="modal" data-target="#mymodal"> <span class="texto_grande"><i class="fa fa-times-circle-o"></i>COUPONS</span></a> </div> <div class="col-md-3 icon-block"> <img src="images/dashboardIcons/orders.png" alt=""> <a class="btn btn-block btn-lg" data-toggle="modal" data-target="#mymodal"> <span class="texto_grande"><i class="fa fa-edit"></i>ORDERS</span></a> </div> <div class="col-md-3 icon-block"> <img src="images/dashboardIcons/expense.png" alt=""> <a class="btn btn-block btn-lg" data-toggle="modal" data-target="#mymodal"> <span class="texto_grande"><i class="fa fa-list-ul"></i>EXPENSE</span></a> </div> <div class="col-md-3 icon-block"> <img src="images/dashboardIcons/income.png" alt=""> <a class="btn btn-block btn-lg" data-toggle="modal" data-target="#mymodal"> <span class="texto_grande"><i class="fa fa-list-ul"></i>INCOME</span></a> </div> <div class="col-md-3 icon-block"> <img src="images/dashboardIcons/todo.png" alt=""> <a class="btn btn-block btn-lg" data-toggle="modal" data-target="#mymodal"> <span class="texto_grande"><i class="fa fa-list-ul"></i>TODO</span></a> </div> </div> </div>'),a.put("views/main.html",'<div class="container"> <!--Sign in/ Sign Up Page--> <div class="row login-background" ng-if="true"> <div class="col-lg-6 col-md-6 col-sm-3 app-desc"> <img src="/images/logo.png"> <p class="app-title">NIFTYBINZ</p> <p class="app-sub-title">Smart Archiving App</p> <p class="app-details">One stop solution for all your archiving needs</p> </div> <div class="col-lg-6 col-md-6 col-sm-3"> <div class="wrap" ng-hide="showSignUp"> <form class="login" name="login"> <input type="text" name="username" placeholder="Username" ng-model="user.name" required> <span class="validation" ng-show="login.username.$dirty &&  login.username.$error.required">* Username is required</span> <input type="password" name="password" placeholder="Password" ng-model="user.password" required> <span class="validation" ng-show="login.password.$dirty &&  login.password.$error.required">* Password is required</span> <!--<img ng-if="dataLoading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>--> <div class="validation" style="padding-top: 10px"> <img ng-if="dataLoading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="> <span ng-if="invalidData">Invalid Username/Password</span> </div> <input type="submit" value="CONTINUE" class="primary-btn btn btn-sm" ng-disabled="login.$invalid" ng-click="onLoginCheck()"> <div class="remember-forgot"> <div class="row"> <div class="col-md-6 col-xs-6"> <div class="checkbox"> <label> <input type="checkbox"> Remember Me </label> </div> </div> <div class="col-md-6 col-xs-6 forgot-pass-content"> <a href="javascription:void(0)" class="forgot-pass">Forgot Password</a> </div> </div> </div> </form> <!--<div class="row">--> <!--<div class="col-md-6 col-xs-6">--> <!--<button class="loginBtn loginBtn&#45;&#45;facebook" ng-click="onFaceBookLogin()">--> <!--Login with Facebook--> <!--</button>--> <!--</div>--> <!--<div class="col-md-6 col-xs-6">--> <!--<button class="loginBtn loginBtn&#45;&#45;google" ng-click="onGoogleLogin()">--> <!--Login with Google--> <!--</button>--> <!--</div>--> <!--</div>--> </div> <div class="row"> <div class="col-md-6 col-xs-6"> <button class="loginBtn loginBtn--facebook" ng-click="onFaceBookLogin()"> Login with Facebook </button> </div> <div class="col-md-6 col-xs-6"> <button class="loginBtn loginBtn--google" ng-click="onGoogleLogin()"> Login with Google </button> </div> </div> <!--<div class="wrap" ng-show=showSignUp>--> <!--<form class="login">--> <!--<input class="name-input" type="text" placeholder="First Name" />--> <!--<input class="name-input" type="text" placeholder="Last Name" />--> <!--<input type="text" placeholder="Username" />--> <!--<input type="text" placeholder="Birthday" />--> <!--<input type="password" placeholder="Password" />--> <!--<input type="password" placeholder="Confirm Password" />--> <!--<input type="submit" value="CREATE ACCOUNT" class=" primary-btn btn btn-sm" />--> <!--</form>--> <!--</div>--> <!--<div class="btn-group btn-group-justified" role="group" aria-label="...">--> <!--<div class="btn-group" role="group">--> <!--<button type="button" class="btn btn-default sign-button" ng-class="{\'sign-button-active\':showSignIn}" ng-click="(showSignIn=true) && (showSignUp=false)">Sign In</button>--> <!--</div>--> <!--<div class="btn-group" role="group">--> <!--<button type="button" class="btn btn-default sign-button" ng-class="{\'sign-button-active\':showSignUp}" ng-click="(showSignUp=true) && (showSignIn=false)">Sign Up</button>--> <!--</div>--> <!--</div>--> </div> </div> <!--Link email Page--> <div class="row login-background" ng-if="showLinkEmail"> <div class="col-lg-6 col-md-6 col-sm-3 link-email-text"> <div class="row text-center"> <img src="/images/linkIcon.png"> </div> <p class="text">Hi {{gmail.userName}}, link one of your existing emails to Nifty Binz for SMART ARCHIVING experience</p> </div> <div class="col-lg-6 col-md-6 col-sm-3"> <div class="row email-grid"> <div class="col-lg-4 col-sm-4" ng-repeat="email in emailAccounts"> <div class="tile" ng-class="{\'tile-selected\':email.isSelected}" ng-click="selectEmailAccount(email)"> <!--<h3 class="title">{{email.isSelected}}</h3>--> <img src="/images/emailAccounts/{{email.emailProvider}}.png"> </div> </div> <div class="row" ng-show="emailSelected"> <div class="col-md-12 text-center"> <input type="submit" value="CONTINUE" class="primary-btn btn btn-sm"> </div> </div> </div> </div> </div> <!--Email linked page--> <div class="row login-background" ng-if="false"> <div class="col-lg-6 col-md-6 col-sm-3 email-linked"> <div class="row"> <img src="/images/binlogo.png"> </div> <div class="row"> <p class="text">GMAIL account linked</p> </div> </div> <div class="col-lg-6 col-md-6 col-sm-3 vertical-align"> <div class="col-md-12 text-center email-linked-buttons vcenter"> <div class="row"> <input type="submit" value="LINK ANOTHER EMAIL" class="primary-btn btn btn-sm"> <input type="submit" value="CONTINUE" class="primary-btn btn btn-sm"> </div> </div> </div> </div> <!--Summary Page--> <div class="row login-background" ng-if="false"> <div class="col-lg-6 col-md-6 col-sm-3 summary"> <div class="progress"> <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"> <span class="sr-only">60% Complete</span> </div> </div> <p class="text">Smart Archiving in progress this shouldn’t take too long</p> </div> <div class="col-lg-6 col-md-6 col-sm-3 vertical-align"> </div> </div> <div class="row login-background" ng-if="false"> <div class="row"> <div class="col-lg-12 col-md-12 col-sm-4 filters"> <!--<span class="filter-button" ng-repeat="filter in filterCategories">{{filter}}</span>--> <div class="btn-group" role="group" aria-label="..."> <div class="btn-group" role="group" ng-repeat="filter in filterCategories"> <button type="button" class="btn btn-default">{{filter}}</button> </div> </div> </div> </div> <div class="row"> </div> </div> <!--<div class="row features">\n        <div class="col-lg-4 col-md-4 col-sm-2">\n            <h4>Feature 1</h4>\n            <img>\n            <p>\n                Lorem Ipsum is simply dummy text\n            </p>\n        </div>\n        <div class="col-lg-4 col-md-4 col-sm-2">\n            <h4>Feature 2</h4>\n            <img>\n            <p>\n                Lorem Ipsum is simply dummy text\n            </p>\n        </div>\n        <div class="col-lg-4 col-md-4 col-sm-2">\n            <h4>Feature 3</h4>\n            <img>\n            <p>\n                Lorem Ipsum is simply dummy text\n            </p>\n        </div>\n    </div>--> </div> <!--<div class="login-background jumbotron">\n  <div class="wrap">\n                <p class="form-title">\n                    Sign In</p>\n                <form class="login">\n                <input type="text" placeholder="Username" />\n                <input type="password" placeholder="Password" />\n                <input type="submit" value="CONTINUE" class=" primary-btn btn btn-sm" />\n                <div class="remember-forgot">\n                    <div class="row">\n                        <div class="col-md-6">\n                            <div class="checkbox">\n                                <label>\n                                    <input type="checkbox" />\n                                    Remember Me\n                                </label>\n                            </div>\n                        </div>\n                        <div class="col-md-6 forgot-pass-content">\n                            <a href="javascription:void(0)" class="forgot-pass">Forgot Password</a>\n                        </div>\n                    </div>\n                </div>\n                </form>\n            </div>\n</div>-->')}]);