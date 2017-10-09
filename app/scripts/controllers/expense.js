/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('ExpenseCtrl', function ($scope, $state,expenseLists, dataTableService, $timeout) {

        console.log('expenseLists controller.................',expenseLists);
        $scope.expenseLists = expenseLists;
        var state = $state.current.name;
        $timeout(function () {
            $scope.expense_table = dataTableService.createDataTable($scope.expenseLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.expense_table.search($(this).val()).draw();
            });
        });

    });