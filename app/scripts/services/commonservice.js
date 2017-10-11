/**
 * Created by tvpc00016 on 6/10/17.
 */

angular.module('niftybinzApp').service('dataFetchService', function ($q, $http,$rootScope){
    var statusVariable = this;

    statusVariable.getList = function(selectCategory){
        $rootScope.icon_loading = true;
        var deferred = $q.defer();
        var apiParams= {"useremail": "niftybinznew@gmail.com", "category": selectCategory};
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
                    // console.log(totalList);
                    angular.forEach(totalList,function(value,index){
                        archiveLists.push({
                            'fileType': value.c_domain,
                            'name': value.subject,
                            'date': value.emailtimestamp,
                            'category': value.category,
                            'subcategory':value.subcategory
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
    console.log('qqqqqqqqqqqqq',statusVariable);
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
                    { "data": "fileType","width": "20%"},
                    { "data": "name" ,"width": "60%"},
                    { "data": "date" ,
                         "render":function (data) {
                        return moment(data, "x").format("DD MMM ");
                    },
                        "width": "20%"
                    },
                    {"data":'category',"visible": false}
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
