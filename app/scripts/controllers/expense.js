/**
 * Created by jidhun krishna on 9/10/17.
 */
angular.module('niftybinzApp')
    .controller('ExpenseCtrl', function ($scope, $state,expenseLists, dataTableService, $timeout,$filter) {

        console.log('expenseLists controller.................',expenseLists);
        $scope.expenseLists = expenseLists;
        $scope.searchText = "";
        // var state = $state.current.name;
        $scope.expense1Lists = [
            {
                'fileType': "email",
                'name': "20% off everything",
                'date': "20 Sep",
                'category': "expense",
                'subcategory':"home"
          }, {
                'fileType': "email",
                'name': "15% off clothes",
                'date': "20 Sep",
                'category': "expense",
                'subcategory':"kids"
          }, {
                'fileType': "doc",
                'name': "meeting minutes",
                'date': "19 Sep",
                'category': "expense",
                'subcategory':"kids"
          }, {
                'fileType': "img",
                'name': "kohls coupomn",
                'date': "19 Sep",
                'category': "expense",
                'subcategory':"medical"
          }, {
                'fileType': "email",
                'name': "Report card for september",
                'date': "18 Sep",
                'category': "expense",
                'subcategory':"travel"
          }, {
                'fileType': "img",
                'name': "art work tuesday",
                'date': "17 Sep",
                'category': "expense",
                'subcategory':"home"
          }, {
                'fileType': "doc",
                'name': "requirements",
                'date': "15 Sep",
                'category': "expense",
                'subcategory':"amazon"
          }, {
                'fileType': "email",
                'name': "Car service in 10 days",
                'date': "15 Sep",
                'category': "expense",
                'subcategory':"car"
          }
        ];
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
            console.log('expense .filtering................',filter);
            if (!filter.isDisabled){
                if (filter.filterName == 'all'){
                    console.log('alll......');
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
        console.log($scope.expenseCategoriesList,"exp.....................");
        $scope.FiltersList.forEach(function (item) {
            $scope.expenseCategoriesList.forEach(function (cat) {
                // console.log($filter('lowercase')(cat.category));
                if (item.filterName === $filter('lowercase')(cat.subcategory)) {
                    item.isDisabled = false;
                }
            });
        });

        $timeout(function () {
            $scope.expense_table = dataTableService.createDataTable($scope.expenseLists);
            $('#'+$scope.state+'Search').keyup(function(){
                console.log('keyuppp....');
                $scope.expense_table.search($(this).val()).draw();
            });
        });

        // expense table common serach cancel operation
        $scope.cancelSearch = function () {
            console.log('cancel.........');
            $scope.searchText = "";
            $scope.expense_table.search($scope.searchText).draw();
        };

    });