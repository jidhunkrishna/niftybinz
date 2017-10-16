/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('OrderCtrl', function ($scope, $state,$filter,ordersLists, dataTableService, $timeout) {

        console.log('orders controller.................',ordersLists);
        $scope.ordersLists = ordersLists;
        $scope.searchText='';
        $scope.completeOrderList=ordersLists;
        angular.element(document).find('#label').text('Filter By');

        // $scope.unique_orders = $filter('unique')($scope.ordersLists, 'fileType');
        // $scope.all_ordersList = $scope.unique_orders;
        // $scope.all_ordersList = ordersLists;
        // var state = $state.current.name;
        // $scope.ordersLists = [
        //     {category: "Other",
        //         date: "1479620559000",
        //         discount_price: "NULL",
        //         display_date: "NULL",
        //         fileType: "fccashback.in",
        //         id: "15880420511347e6",
        //         name: "Exciting rewards on Bookmyshow, Foodpanda & more with Freecharge!",
        //         subcategory: "Received"
        //     },{
        //         category: "Other",
        //         date: "1479495280000",
        //         discount_price: "NULL",
        //         display_date: "NULL",
        //         fileType: "codeschool.com",
        //         id: "15878cb2a6483c20",
        //         name: "Free Weekend starts now! ",
        //         subcategory: "Received"},
        //     {
        //         category: "Other",
        //         date: "1479358333000",
        //         discount_price: "NULL",
        //         display_date: "NULL",
        //         fileType: "way2sms.in",
        //         id: "158709f33b835dea",
        //         name: "Open your free account today",
        //         subcategory: "Delivered"}
        // ];
        $scope.FiltersList = [
            {
                'filterName': 'delivery',
                // 'filterCategory':'Fashion',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'pick up',
                // 'filterCategory':'Dining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'received',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'all',
                'filterCategory': 'all',
                'isDisabled': false,
                'isSelected': true
            }
        ];
        $scope.SortList = [
            {
                'sortName': 'company',
                // 'isDisabled': true,
                'isSelected': false
            }, {
                'sortName': 'name',
                // 'isDisabled': true,
                'isSelected': false
            }, {
                'sortName': 'date',
                // 'isDisabled': true,
                'isSelected': false
            }
        ];

        $scope.orderSort = function(sortValue){
            if(!sortValue.isSelected){
                    sortValue.isSelected = !sortValue.isSelected;
                }

                if (sortValue.isSelected) {
                    angular.forEach($scope.SortList, function (value, key) {
                        if (sortValue.sortName !== value.sortName) {
                            value.isSelected = false;
                        }
                    });
                }
            $scope.orderValue=sortValue.sortName;
        };

        $scope.SelectFilter = function (filter) {
            console.log('order filter.......',filter);
            if (!filter.isDisabled) {
                if(filter.filterName=='all'){
                    $scope.ordersLists = $scope.completeOrderList;
                }
                else{
                    $scope.ordersLists = $filter('filter')($scope.completeOrderList, {subcategory:filter.filterName});
                }

                if(!filter.isSelected){
                    filter.isSelected = !filter.isSelected;
                }

                if (filter.isSelected) {
                    angular.forEach($scope.FiltersList, function (value, key) {
                        if (filter.filterName !== value.filterName) {
                            value.isSelected = false;
                        }
                    });
                }
            }
        };

        // $timeout(function () {
        //     $scope.orders_table = dataTableService.createDataTable($scope.ordersLists);
        //     $('#'+$scope.state+'Search').keyup(function(){
        //         console.log('keyuppp....');
        //         $scope.orders_table.search($(this).val()).draw();
        //     });
        // });

        //Enabling filter buttons if the category is present in the order list
        $scope.orderCategoriesList = $filter('unique')($scope.ordersLists, 'subcategory');
        $scope.FiltersList.forEach(function (item) {
            $scope.orderCategoriesList.forEach(function (cat) {
                if (item.filterName == $filter('lowercase')(cat.subcategory)) {
                    item.isDisabled = false;
                }
            });
        });

    });