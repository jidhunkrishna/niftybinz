/**
 * Created by jidhun krishna on 6/10/17.
 */

angular.module('niftybinzApp').service('dataFetchService', function ($q, $http,$rootScope,$window){
    var statusVariable = this;
    statusVariable.getList = function(selectCategory){
        $rootScope.icon_loading = true;
        var deferred = $q.defer();
        var niftyUser = $window.localStorage.getItem('niftyUserName');
        var apiParams= {"niftyusername":niftyUser , "category": selectCategory};
        var archiveLists=[];
        if(niftyUser!= null){
            $.ajax({
                url: "http://chiteacake.com/readmails",
                type: "POST",
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                processData: false,
                data: JSON.stringify(apiParams),
                success: function (response) {
                    if (response.STATUS == "SUCCESS"){
                        var totalList = response.DETAILS.DATA.Items;
                        angular.forEach(totalList,function(value,index){
                            archiveLists.push({
                                'id':value.messageid,
                                'fileType': value.c_domain,
                                'name': value.subject,
                                'date': value.emailtimestamp,
                                'category': value.category,
                                'subcategory':value.subcategory,
                                'discount_price':value.discount_price,
                                'display_date':value.display_date,
                                'username':value.username,
                                'attachment':value.attachment,
                                'upload':value.upload
                            });
                        });
                        deferred.resolve(archiveLists)
                    }
                    else{
                        console.log(response);
                        console.log('status is not correct')
                    }
                    $rootScope.icon_loading = false;
                },
                error: function (error, textStatus, errorThrown) {
                    $rootScope.icon_loading = false;
                    console.log(textStatus);
                    deferred.reject(error);
                }
            });
            return deferred.promise;
        }else {
            return null;
        }
    };
    return statusVariable;
});

angular.module('niftybinzApp').service('dataTableService', function ($state,$timeout){
    var dataTable = this;
    dataTable.createDataTable = function(Lists){
        var state = $state.current.name;
        var custom_table = $('#'+state+'Table').DataTable( {
            data: Lists,
            columns: [
                { "data": "fileType","width": "20%",
                    "type": 'alt-string',
                    "render":function (data) {
                        var url ='http://logo.clearbit.com/'+data
                        return '<img src='+url +' style="width: 30%; height:30%;object-fit: contain" ' +
                            ' alt='+'"'+data+'"'+'>'
                    }
                },
                { "data": "name" ,"width": "60%"},
                { "data": "date" ,
                    "render":function (data) {
                        return moment(data, "x").format("DD MMM ");
                    },
                    "width": "20%"
                },
                {"data":'subcategory',"visible": false}
            ],
            "info":false,
            "lengthChange":false,
            "paging":false,
            "order": [[ 2, 'dec' ]]
            // "searching":false
        } );

        return custom_table;
    };
    return dataTable;
});

angular.module('niftybinzApp').service('postDataService',['$http','$q',function($http,$q) {
    var postDataService = this;
    postDataService.postData = function (requestURL,dataParam) {
        var deferred = $q.defer();
        var data = JSON.stringify(dataParam);
        var config = {
            headers: {
                'Content-Type': 'application/json'
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
    return postDataService;
}]);

angular.module('niftybinzApp').service('dialogService',['postDataService','$mdDialog','$rootScope',
    function (postDataService,$mdDialog,$rootScope) {
        var dialogService =this;
        dialogService.popup = function (rowData,ev) {
            var data = rowData;
            var url ='http://chiteacake.com/getemailbodycontent';
            var param = {
                'messageid':data.id,
                'useremail':data.username
            };
            postDataService.postData(url,param).then(function (response) {
                if (response.data.STATUS = "SUCCESS"){
                    var template_html = response.data.DETAILS.html;
                }
                $rootScope.popup_loading = false;
                showAdvanced(ev,template_html);
            });
            var showAdvanced = function(ev,template_html) {
                $mdDialog.show({
                    targetEvent: ev,
                    template:'<md-dialog>' +
                    // '<md-toolbar><div class="md-toolbar-tools">' +
                    // '<h2>Details</h2>' +
                    // '<span flex></span>' +
                    // '<md-button class="md-icon-button" ng-click="cancel()">' +
                    // '<span class="glyphicon glyphicon-remove" aria-label="Close dialog"></span>' +
                    // '</md-button></div></md-toolbar>' +
                    '<md-dialog-content>'+template_html+'</md-dialog-content>' +
                    '<md-dialog-actions>' +
                    '<md-button ng-click="closeDialog()" class="md-raised md-warn">Close</md-button>'+
                    '</md-dialog-actions>' +
                    '</md-dialog>',
                    controller: DialogController,
                    // templateUrl:'dialog1.tmpl.html',
                    // parent: angular.element(document.body),
                    // clickOutsideToClose:true,
                    // scope: $scope,
                    // preserveScope: true,
                    // locals:{test_temp: $scope.template_html}
                    // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
            };
            function DialogController($scope, $mdDialog) {
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.closeDialog = function() {
                    // Easily hides most recent dialog shown...
                    // no specific instance reference is needed.
                    $mdDialog.hide();
                };
            }
        };
        return dialogService;
    }]);

angular.module('niftybinzApp').service('toastService',['$mdToast', function ($mdToast) {
    var toastService =this;
    toastService.notification = function () {
        $mdToast.show({
            template:'<md-toast class="md-error-toast-theme">' +
            '<div class="md-toast-content" style="background-color: #00838f" >' +
            '<span class="md-toast-text"><b>No Email found on this category...!!!</b>' +
            '</span>' +
            '<md-button ng-click="closeToast()">' +
            '<span class="glyphicon glyphicon-remove" aria-label="Close dialog"></span>' +
            '</md-button>' +
            '</div>' +
            '</md-toast>',
            controller: NotificationController,
            position:'top right',
            // hideDelay: 60000,
        });
        function NotificationController($scope, $mdToast) {
            $scope.closeToast = function() {
                $mdToast.hide();
            };
        }
        return toastService;
    };
}]);

angular.module('niftybinzApp').service('Authorization',['$state',function($state, $window) {
    var auth = this;
    auth.isAuthenticated = function () {
        return window.localStorage.getItem('niftyUserName')!= null;
    };
    return auth;
}]);