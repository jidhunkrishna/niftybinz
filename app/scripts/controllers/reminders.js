/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('ReminderCtrl', function ($scope,$rootScope, $state,reminderLists, dataTableService,dialogService,
                                          $timeout,toastService){
        //redirect to home page if there is no email to show
        if (reminderLists == ''){
            $state.go('home');
            toastService.notification();
        }
        $scope.reminderLists = reminderLists;
        $scope.FiltersList = [
            {
                'filterName': 'appointments',
                // 'filterCategory':'Fashion',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'kids',
                // 'filterCategory':'Dining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'birthdays',
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
            if (!filter.isDisabled){
                if (filter.filterName == 'all'){
                    $scope.reminder_table.columns(3).search('').draw();
                }
                else
                    $scope.reminder_table.columns(3).search(filter.filterName).draw();

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

        $timeout(function () {
            $scope.reminder_table = dataTableService.createDataTable($scope.reminderLists);
            $('#reminderSearch').keyup(function(){
                $scope.reminder_table.search($(this).val()).draw();
            });

            // on row click of the table, display a popup contain the details of the mail
            $('#reminderTable tbody').on('click', 'tr', function (ev) {
                var data = $scope.reminder_table.row( this ).data();
                $(this).prop('disabled', true);
                if(data){
                    $rootScope.popup_loading = true;
                }
                dialogService.popup(data,ev,this);
            });
        });

    });