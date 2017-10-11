/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('CouponCtrl', function ($scope, $state,couponsLists, dataTableService, $timeout,$filter) {

        console.log('coupons controller.................',couponsLists);
        $scope.couponLists = couponsLists;
        var state = $state.current.name;
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
        // $timeout(function () {
        //     $scope.coupons_table = dataTableService.createDataTable($scope.couponLists);
        //     $('#'+state+'Search').keyup(function(){
        //         console.log('keyuppp....');
        //         $scope.coupons_table.search($(this).val()).draw();
        //     });
        // });

        //Enabling filter buttons if the category is present in the coupon list
        $scope.couponCategoriesList = $filter('unique')($scope.couponLists, 'subcategory');
        console.log($scope.archiveCategoriesList);
        $scope.couponFilters.forEach(function (item) {
            $scope.couponCategoriesList.forEach(function (cat) {
                if (item.filterCategory == cat.subcategory) {
                    item.isDisabled = false;
                }
            });
        });

        $('#couponSearch').keyup(function(){
            console.log('common search...............');
            if($(this).val()){
                $scope.filterExpression={fileType:$(this).val()};
                console.log('valueee......',$(this).val())
            }
            else
                {
                    console.log('empty...........',$(this).val());

                $scope.filterExpression='';
                $scope.$digest()
                }

        });

        $scope.cancelCouponSearch = function () {
            $scope.filterExpression='';
            $('#couponSearch').val('');
        };

        $scope.couponSelectFilter = function (filter) {
            console.log('coupon filter.......',filter);
            if (!filter.isDisabled) {
                if(filter.filterName=='all'){
                    $scope.filterExpression='';
                }
                else
                    $scope.filterExpression ={subcategory:filter.filterCategory};
            } else {
                return false;
            }

            filter.isSelected = !filter.isSelected;

            if (filter.isSelected) {
                angular.forEach($scope.couponFilters, function (value, key) {
                    if (filter.filterName !== value.filterName) {
                        value.isSelected = false;
                    }
                });
            }
            // else {
            //     $scope.couponFilterBy = '';
            // }
        }

    });
