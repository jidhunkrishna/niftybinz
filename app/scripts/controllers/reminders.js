/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('ReminderCtrl', function ($scope, $state,reminderLists, dataTableService, $timeout) {

        console.log('reminder controller.................',reminderLists);
        $scope.reminderLists = reminderLists;
        console.log($scope.state);
        $scope.FiltersList = [
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

        $scope.SelectFilter=function (filter) {
            console.log('filtering................',filter);
            if (!filter.isDisabled){
                if (filter.filterName == 'all'){
                    console.log('alll......');
                    archive_table.columns(3).search('').draw();
                }
                else
                    archive_table.columns(3).search(filter.filterName).draw();

                if(!filter.isSelected){
                filter.isSelected = !filter.isSelected;
                    }
                if (filter.isSelected) {
                    angular.forEach($scope.archiveFilters, function (value, key) {
                        if (filter.filterName !== value.filterName) {
                            value.isSelected = false;
                        }
                    });
                }
            }
        };

        $timeout(function () {
            $scope.reminder_table = dataTableService.createDataTable($scope.reminderLists);
            $('#'+$scope.state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.reminder_table.search($(this).val()).draw();
            });
        });

    });