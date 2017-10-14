/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('CouponCtrl', function ($scope, $state,couponsLists, dataTableService, $timeout,$filter) {

        $scope.couponLists = couponsLists;
        console.log($scope.couponLists);
        $scope.unique_coupons = $filter('unique')($scope.couponLists, 'fileType');
        $scope.all_couponsList = $scope.unique_coupons;
        $scope.subcategory_couponsList= $filter('unique_multiple')($scope.couponLists, ['fileType','subcategory']);
        var state = $state.current.name;
        $scope.category_all=true;
        $scope.couponFilters = [
            {
                'filterName': 'fashion',
                'filterCategory':'Fashion',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'dining',
                'filterCategory':'Dining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'groceries',
                'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'home&services',
                'filterCategory':'Home & Services',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'electronics',
                'filterCategory': 'Electronics',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'health&beauty',
                'filterCategory': 'Health & Beauty',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'hotel&travel',
                'filterCategory': 'Hotel & Travel',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'misc',
                'filterCategory': 'Other',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'all',
                'filterCategory': 'all',
                'isDisabled': false,
                'isSelected': true
            }
        ];

        //Enabling filter buttons if the category is present in the coupon list
        $scope.couponCategoriesList = $filter('unique')($scope.couponLists, 'subcategory');
        $scope.couponFilters.forEach(function (item) {
            $scope.couponCategoriesList.forEach(function (cat) {
                if (item.filterCategory == cat.subcategory) {
                    item.isDisabled = false;
                }
            });
        });

        $scope.cancelCouponSearch = function () {
            $scope.searchText='';
            $('#couponSearch').val('');
        };

        $scope.couponSelectFilter = function (filter) {

            console.log('coupon filter.......',filter);
            if (!filter.isDisabled) {
                if(filter.filterName=='all'){
                    $scope.all_couponsList = $scope.unique_coupons;
                    $scope.category_all=true;
                }
                else{
                    $scope.category_all=false;
                    $scope.all_couponsList = $filter('filter')($scope.subcategory_couponsList, {subcategory:filter.filterCategory});
                    console.log('length..',$scope.all_couponsList.length);
                }

                if(!filter.isSelected){
                    filter.isSelected = !filter.isSelected;
                }

                if (filter.isSelected) {
                    angular.forEach($scope.couponFilters, function (value, key) {
                        if (filter.filterName !== value.filterName) {
                            value.isSelected = false;
                        }
                    });
                }

            } else {
                return false;
            }
        };

    });
