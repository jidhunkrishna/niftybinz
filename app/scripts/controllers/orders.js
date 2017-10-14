/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('OrderCtrl', function ($scope, $state,ordersLists, dataTableService, $timeout) {

        console.log('orders controller.................',ordersLists);
        $scope.ordersLists = ordersLists;
        var state = $state.current.name;
        $scope.orderFilters = [
            {
                'filterName': 'DELIVERY',
                // 'filterCategory':'Fashion',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'PICK UP',
                // 'filterCategory':'Dining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'RECEIVED',
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

        $timeout(function () {
            $scope.orders_table = dataTableService.createDataTable($scope.ordersLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.orders_table.search($(this).val()).draw();
            });
        });

    });