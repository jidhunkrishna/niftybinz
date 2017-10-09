/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('TodoCtrl', function ($scope, $state,todoLists, dataTableService, $timeout) {

        console.log('todo controller.................',todoLists);
        $scope.todoLists = todoLists;
        var state = $state.current.name;
        $timeout(function () {
            $scope.todo_table = dataTableService.createDataTable($scope.todoLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.todo_table.search($(this).val()).draw();
            });
        });

    });