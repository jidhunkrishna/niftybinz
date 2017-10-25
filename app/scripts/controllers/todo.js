/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('TodoCtrl', function ($scope,$rootScope, $state,todoLists, dataTableService, $timeout,toastService) {

        //redirect to home page if there is no email to show
        if (todoLists == ''){
            $state.go('home');
            toastService.notification();
        }
        $scope.todoLists = todoLists;
        $timeout(function () {
            $scope.todo_table = dataTableService.createDataTable($scope.todoLists);
            $('#todoSearch').keyup(function(){
                $scope.todo_table.search($(this).val()).draw();
            });

            // on row click of the table, display a popup contain the details of the mail
            $('#todoTable tbody').on('click', 'tr', function (ev) {
                var data = $scope.todo_table.row( this ).data();
                if(data){
                    $rootScope.popup_loading = true;
                }
                dialogService.popup(data,ev);
            });
        });
    });