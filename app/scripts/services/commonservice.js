/**
 * Created by tvpc00016 on 6/10/17.
 */

angular.module('niftybinzApp').service('dataFetchService', function ($q, $http,$rootScope){
    var statusVariable = this;

    statusVariable.getArchiveList = function( ){
        var deferred = $q.defer();
        var apiParams= {"useremail": "shanavaswn@gmail.com", "category": ""};
        var archiveLists=[];
        $.ajax({
            url: "http://chiteacake.com/readgooglemails",
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
                    console.log(totalList);
                    angular.forEach(totalList,function(value,index){
                        archiveLists.push({
                            'fileType': value.c_domain,
                            'name': value.subject,
                            'date': value.date,
                            'category': value.category
                        });
                    });
                    deferred.resolve(archiveLists)
                }
                else{
                    console.log(response);
                    console.log('status is not correct')
                }
            },
            error: function (error, textStatus, errorThrown) {
                console.log(response.MESSAGE);
                 deferred.reject(error);
            }
        });
        return deferred.promise;
    };
    console.log('qqqqqqqqqqqqq',statusVariable);
    return statusVariable;
});

// angular.module('app.expense').service('SelfExpenseService', function ($q, $http){
//     var getExp = this;
//     getExp.getData = function(url){
//         var deferred = $q.defer();
//
//         $http.get(url).success(function(response) {
//
//             deferred.resolve(response);
//         })
//             .error(function (error) {
//                 deferred.reject(error);
//             });
//         return deferred.promise;
//     };
//
//     return getExp;
//
//
// });
