/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('IncomeCtrl', function ($scope,$rootScope, $state,incomeLists, dataTableService,dialogService,
                                        $timeout,toastService) {
        //redirect to home page if there is no email to show
        if (incomeLists == ''){
            $state.go('home');
            toastService.notification();
        }
        $scope.incomeLists = incomeLists;
        $timeout(function () {
            $scope.income_table = dataTableService.createDataTable($scope.incomeLists);
            $('#incomeSearch').keyup(function(){
                $scope.income_table.search($(this).val()).draw();
            });
            // on row click of the table, display a popup contain the details of the mail
            $('#incomeTable tbody').on('click', 'tr', function (ev) {
                var data = $scope.income_table.row( this ).data();
                $(this).prop('disabled', true);
                if(data){
                    $rootScope.popup_loading = true;
                }
                dialogService.popup(data,ev,this);
            });
        });
    });