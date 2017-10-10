/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('CouponCtrl', function ($scope, $state,couponsLists, dataTableService, $timeout) {

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
                'filterName': 'home & services',
                'filterCategory':'Home & Services',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'electronics',
                'filterCategory': 'Electronics',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'health & beauty',
                'filterCategory': 'Health & Beauty',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'hotel & travel',
                'filterCategory': 'Hotel & Travel',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'misc',
                'filterCategory': 'Other',
                'isDisabled': true,
                'isSelected': false
            }
        ];
        $timeout(function () {
            $scope.coupons_table = dataTableService.createDataTable($scope.couponLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.coupons_table.search($(this).val()).draw();
            });
        });


    });
