/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('CouponCtrl', function ($scope, $state,couponsLists, dataTableService, $timeout) {

        console.log('coupons controller.................',couponsLists);
        $scope.couponLists = couponsLists;
        var state = $state.current.name;
        $timeout(function () {
            $scope.coupons_table = dataTableService.createDataTable($scope.couponLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.coupons_table.search($(this).val()).draw();
            });
        });

    });