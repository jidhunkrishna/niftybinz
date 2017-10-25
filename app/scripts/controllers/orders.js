/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('OrderCtrl', function ($scope,$rootScope,$state,$filter,ordersLists,dialogService,toastService,
                                       dataTableService, $timeout) {
        //redirect to home page if there is no email to show
        if (ordersLists == ''){
            $state.go('home');
            toastService.notification();
        }
        $scope.ordersLists = ordersLists;
        $scope.searchText='';
        $scope.completeOrderList=ordersLists;
        angular.element(document).find('#label').text('Filter By');

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
            if (sortValue.sortName =='company'){
                $scope.orderValue='fileType';
            }else{
                $scope.orderValue=sortValue.sortName;
            }
        };

        $scope.SelectFilter = function (filter) {
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

        //Enabling filter buttons if the category is present in the order list
        $scope.orderCategoriesList = $filter('unique')($scope.ordersLists, 'subcategory');
        $scope.FiltersList.forEach(function (item) {
            $scope.orderCategoriesList.forEach(function (cat) {
                if (item.filterName == $filter('lowercase')(cat.subcategory)) {
                    item.isDisabled = false;
                }
            });
        });

        $scope.mail_details = function (data,ev) {
            if(data){
                $rootScope.popup_loading = true;
            }
            dialogService.popup(data,ev);
        }

    });