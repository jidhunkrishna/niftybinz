/**
 * Created by jidhun krishna on 6/10/17.
 */
angular.module('niftybinzApp')
    .controller('ArchiveCtrl', function ($scope,$state, $filter,$rootScope,archiveLists,$http,
                                         dataFetchService,dialogService,toastService) {
        //redirect to home page if there is no email to show
        if (archiveLists == ''){
            $state.go('home');
            toastService.notification();
        }
        $scope.searchArchiveText = "";
        $scope.archiveLists=archiveLists;
        $scope.archiveFilters = [
            {
                'filterName': 'tax',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'expense',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'medical',
                'isDisabled': true,
                'isSelected': false
            },
            {
                'filterName': 'coupon',
                'isDisabled': true,
                'isSelected': false
            },
            {
                'filterName': 'insurance',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'car',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'work',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'membership',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'house',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'kids',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'other',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'all',
                'isDisabled': false,
                'isSelected': true
            }
        ];
        var archive_table= $('#archivesTable').DataTable( {
            data: $scope.archiveLists,
            columns: [
                { "data": "fileType","width": "20%",
                    "type": 'alt-string',
                    "render":function (data) {
                        var url ='http://logo.clearbit.com/'+data ;
                        return '<img src='+url +' style="width: 30%; height:30% ;object-fit: contain"' +
                            ' alt='+'"'+data+'"'+'>'
                    }
                },
                { "data": "name" ,"width": "60%"},
                { "data": "date" ,
                    "render":function (data,type) {
                        if ( type === 'display'){
                            return moment(+data).format("DD MMM YYYY");
                        }
                        return data;
                    },
                    "width": "20%"
                },
                {"data":'category',"visible": false}
            ],
            "info":false,
            "lengthChange":false,
            "paging":false,
            "order": [[ 2, 'dec' ]],
            // "searching":false
        } );


        //  Archive table common search
        $('#archiveSearch').keyup(function(){
            archive_table.search($(this).val()).draw() ;
        });

        // Archive table common serach cancel operation
        $scope.cancelSearch = function () {
            $scope.searchArchiveText = "";
            archive_table.search($scope.searchArchiveText).draw();
        };

        //Enabling filter buttons if the category is present in the archive list
        $scope.archiveCategoriesList = $filter('unique')($scope.archiveLists, 'category');
        $scope.archiveFilters.forEach(function (item) {
            $scope.archiveCategoriesList.forEach(function (cat) {
                if (item.filterName === $filter('lowercase')(cat.category)) {
                    item.isDisabled = false;
                }
            });
        });

        // Archive table category wise button type filters
        $scope.archiveSelectFilter=function (filter) {
            if (!filter.isDisabled && !filter.isSelected){
                $scope.filter_loading= true;
                if (filter.filterName == 'all'){
                    archive_table.clear().rows.add($scope.archiveLists).draw();
                    $scope.filter_loading= false;
                    // archive_table.columns(3).search('').draw();
                }
                else{
                    function titleCase(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }
                    var category = titleCase(filter.filterName);
                    dataFetchService.getList(category).then(function (response) {
                        archive_table.clear().rows.add(response).draw();
                        $scope.filter_loading= false;
                    });
                    // archive_table.columns(3).search(filter.filterName).draw();
                }
                if(!filter.isSelected){
                    filter.isSelected = !filter.isSelected;
                }
                if (filter.isSelected) {
                    angular.forEach($scope.archiveFilters, function (value, key) {
                        if (filter.filterName !== value.filterName) {
                            value.isSelected = false;
                        }
                    });
                }
            }
        };

        // on row click of the table, display a popup contain the details of the mail
        $('#archivesTable tbody').on('click', 'tr', function (ev) {
            var data = archive_table.row( this ).data();
            $(this).prop('disabled', true);
            if(data){
                $rootScope.popup_loading = true;
            }
            dialogService.popup(data,ev,this);
        } );
    });
