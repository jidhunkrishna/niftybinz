/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('ExpenseCtrl', function ($scope,$rootScope, $state,expenseLists, dataTableService,dialogService,
                                         $timeout,$filter,toastService) {

        //redirect to home page if there is no email to show
        if (expenseLists == ''){
            $state.go('home');
            toastService.notification();
        }
        $scope.expenseLists = expenseLists;
        $scope.searchText = "";
        $scope.FiltersList = [
            {
                'filterName': 'home',
                // 'filterCategory':'Fashion',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'kids',
                // 'filterCategory':'Dining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'car',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'amazon',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            },  {
                'filterName': 'grocery',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            },  {
                'filterName': 'travel',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            },  {
                'filterName': 'medical',
                // 'filterCategory':'Entertaining',
                'isDisabled': true,
                'isSelected': false
            },  {
                'filterName': 'other',
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


        $scope.SelectFilter=function (filter) {
            if (!filter.isDisabled){
                if (filter.filterName == 'all'){
                    $scope.expense_table.columns(3).search('').draw();
                }
                else
                    $scope.expense_table.columns(3).search(filter.filterName).draw();

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

        // Enabling filter buttons if the category is present in the archive list
        $scope.expenseCategoriesList = $filter('unique')($scope.expenseLists, 'subcategory');
        $scope.FiltersList.forEach(function (item) {
            $scope.expenseCategoriesList.forEach(function (cat) {
                if (item.filterName === $filter('lowercase')(cat.subcategory)) {
                    item.isDisabled = false;
                }
            });
        });

        $timeout(function () {
            $scope.expense_table = dataTableService.createDataTable($scope.expenseLists);
            $('#expenseSearch').keyup(function(){
                $scope.expense_table.search($(this).val()).draw();
            });

            // on row click of the table, display a popup contain the details of the mail
            $('#expenseTable tbody').on('click', 'tr', function (ev) {
                var data = $scope.expense_table.row( this ).data();
                if(data){
                    $rootScope.popup_loading = true;
                }
                dialogService.popup(data,ev);
            });
        });

        // expense table common serach cancel operation
        $scope.cancelSearch = function () {
            $scope.searchText = "";
            $scope.expense_table.search($scope.searchText).draw();
        };
    });