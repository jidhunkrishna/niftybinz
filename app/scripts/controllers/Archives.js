/**
 * Created by jidhun krishna on 6/10/17.
 */
angular.module('niftybinzApp')
    .controller('ArchiveCtrl', function ($scope, $filter,$rootScope,archiveLists, $location, $state) {

        console.log('icon_loading....',$rootScope.icon_loading);

        $scope.searchArchiveText = "";
        $scope.archiveLists=archiveLists;
        // $scope.archiveLists = [
        //     {
        //         'fileType': "email",
        //         'name': "20% off everything",
        //         'date': "20 Sep",
        //         'category': "coupons"
        //   }, {
        //         'fileType': "email",
        //         'name': "15% off clothes",
        //         'date': "20 Sep",
        //         'category': "coupons"
        //   }, {
        //         'fileType': "doc",
        //         'name': "meeting minutes",
        //         'date': "19 Sep",
        //         'category': "work"
        //   }, {
        //         'fileType': "img",
        //         'name': "kohls coupomn",
        //         'date': "19 Sep",
        //         'category': "coupon"
        //   }, {
        //         'fileType': "email",
        //         'name': "Report card for september",
        //         'date': "18 Sep",
        //         'category': "kids"
        //   }, {
        //         'fileType': "img",
        //         'name': "art work tuesday",
        //         'date': "17 Sep",
        //         'category': "kids"
        //   }, {
        //         'fileType': "doc",
        //         'name': "requirements",
        //         'date': "15 Sep",
        //         'category': "work"
        //   }, {
        //         'fileType': "email",
        //         'name': "Car service in 10 days",
        //         'date': "15 Sep",
        //         'category': "car"
        //   }
        // ];
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
        console.log( $scope.archiveLists);
        var archive_table= $('#archiveTable').DataTable( {
            data: $scope.archiveLists,
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

        //  Archive table common search
        $('#archiveSearch').keyup(function(){
            console.log(archive_table);
            archive_table.search($(this).val()).draw() ;
        });

        // Archive table common serach cancel operation
        $scope.cancelSearch = function () {
            console.log('cancel.........');
            $scope.searchArchiveText = "";
            archive_table.search($scope.searchArchiveText).draw();
        };
        
        //Enabling filter buttons if the category is present in the archive list
        $scope.archiveCategoriesList = $filter('unique')($scope.archiveLists, 'category');
        console.log($scope.archiveCategoriesList);
        $scope.archiveFilters.forEach(function (item) {
            $scope.archiveCategoriesList.forEach(function (cat) {
                // console.log($filter('lowercase')(cat.category));
                if (item.filterName === $filter('lowercase')(cat.category)) {
                    item.isDisabled = false;
                }
            });
        });
        
        // Archive table category wise botton type filters 
        $scope.archiveSelectFilter=function (filter) {
            console.log('filtering................',filter);
            if (!filter.isDisabled){
                if (filter.filterName == 'all'){
                    console.log('alll......');
                    archive_table.columns(3).search('').draw();
                }
                else
                    archive_table.columns(3).search(filter.filterName).draw();
                filter.isSelected = !filter.isSelected;
                if (filter.isSelected) {
                    angular.forEach($scope.archiveFilters, function (value, key) {
                        if (filter.filterName !== value.filterName) {
                            value.isSelected = false;
                        }
                    });
                }
            }
        }
    });