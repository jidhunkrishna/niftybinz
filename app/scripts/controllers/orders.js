/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('OrderCtrl', function ($scope, $state,ordersLists, dataTableService, $timeout) {

        console.log('orders controller.................',ordersLists);
        $scope.ordersLists = ordersLists;
        var state = $state.current.name;
        $timeout(function () {
            $scope.orders_table = dataTableService.createDataTable($scope.ordersLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.orders_table.search($(this).val()).draw();
            });
        });

    });