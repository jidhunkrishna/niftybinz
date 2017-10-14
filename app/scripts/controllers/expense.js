/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('ExpenseCtrl', function ($scope, $state,expenseLists, dataTableService, $timeout) {

        console.log('expenseLists controller.................',expenseLists);
        $scope.expenseLists = expenseLists;
        var state = $state.current.name;
        $scope.orderFilters = [
            {
                'filterName': 'HOME',
                // 'filterCategory':'Fashion',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'KIDS',
                // 'filterCategory':'Dining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'CAR',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'AMAZON',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            },  {
                'filterName': 'GROCERY',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            },  {
                'filterName': 'TRAVEL',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            },  {
                'filterName': 'MEDICAL',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            },  {
                'filterName': 'OTHER',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'all',
                // 'filterCategory': 'all',
                'isDisabled': false,
                'isSelected': true
            }
        ];
        $timeout(function () {
            $scope.expense_table = dataTableService.createDataTable($scope.expenseLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.expense_table.search($(this).val()).draw();
            });
        });

    });