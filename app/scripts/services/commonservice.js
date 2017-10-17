/**
 * Created by tvpc00016 on 6/10/17.
 */

angular.module('niftybinzApp').service('dataFetchService', function ($q, $http,$rootScope,$window){
    var statusVariable = this;

    statusVariable.getList = function(selectCategory){
        $rootScope.icon_loading = true;
        var deferred = $q.defer();
        var niftyUser = $window.localStorage.getItem('niftyUserName');
        // var niftyUser = 'shanavaswn@gmail.com';
        var apiParams= {"niftyusername":niftyUser , "category": selectCategory};
        var archiveLists=[];
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
                    // console.log(totalList);
                    angular.forEach(totalList,function(value,index){
                        archiveLists.push({
                            'id':value.messageid,
                            'fileType': value.c_domain,
                            'name': value.subject,
                            'date': value.emailtimestamp,
                            'category': value.category,
                            'subcategory':value.subcategory,
                            'discount_price':value.discount_price,
                            'display_date':value.display_date
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
    };
    return statusVariable;
});

angular.module('niftybinzApp').service('dataTableService', function ($state,$timeout){
    console.log('datatable service................');
    var dataTable = this;
    dataTable.createDataTable = function(Lists){
        var state = $state.current.name;
        console.log(state);
        console.log('keri...',Lists);
        // var custom_table = $timeout(function () {
        // console.log('list........',Lists);
        var custom_table = $('#'+state+'Table').DataTable( {
            data: Lists,
            columns: [
                { "data": "fileType","width": "20%",
                    "orderable":false,
                    "render":function (data) {
                        var url ='http://logo.clearbit.com/'+data
                        return '<img src='+url +' style="width: 30%; height:30%;object-fit: contain" alt ='+data+'>'
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

        // });
        return custom_table;
    };
    return dataTable;
});

angular.module('niftybinzApp').service('postDataService',['$http','$q',function($http,$q) {
    var postDataService = this;
    var deferred = $q.defer();

    postDataService.postData = function (requestURL,dataParam) {
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

// angular.module('niftybinzApp').service('Authorization',['$state',function($state) {
//     console.log('state change');
//     var auth = this;
//     auth.is_authenticated = false;
//     auth.is_authenticate = function () {
//       auth.is_authenticated = true;
//       return auth.is_authenticated
//     };
//     return auth;
// }]);