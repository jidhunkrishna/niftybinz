/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('ReminderCtrl', function ($scope, $state,reminderLists, dataTableService, $timeout) {

        console.log('reminder controller.................',reminderLists);
        $scope.reminderLists = reminderLists;
        var state = $state.current.name;
        $scope.reminderFilters = [
            {
                'filterName': 'APPOINTMENTS',
                // 'filterCategory':'Fashion',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'KIDS',
                // 'filterCategory':'Dining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'BIRTHDAYS',
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
            $scope.reminder_table = dataTableService.createDataTable($scope.reminderLists);
            $('#'+state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.reminder_table.search($(this).val()).draw();
            });
        });

    });