/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('IncomeCtrl', function ($scope, $state,incomeLists, dataTableService, $timeout) {

        console.log('income controller.................',incomeLists);
        $scope.incomeLists = incomeLists;
        var state = $state.current.name;
        $timeout(function () {
            $scope.income_table = dataTableService.createDataTable($scope.incomeLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.income_table.search($(this).val()).draw();
            });
        });

    });