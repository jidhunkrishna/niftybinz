'use strict';

/**
 * @ngdoc function
 * @name niftybinzApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the niftybinzApp
 */
angular.module('niftybinzApp')
    .controller('DashboardCtrl', function ($scope, $filter, $location, $state,$rootScope) {
        $scope.goTo = function () {
            console.log("goto");
            $location.path('#/archives');
        };
        $scope.$state = $state;
        $rootScope.icon_loading = false;

        $scope.searchArchiveText = "";

        // console.log($scope.$state);

        //$scope.archiveFilters=['tax','expense','medical','coupons','insurance','car','work','membership','house','kids','others','all'];

        // $scope.tempCategories = $filter('unique')($scope.archiveLists, 'category');

        // $scope.archiveFilters.forEach(function (item) {
        //     $scope.tempCategories.forEach(function (cat) {
        //         //console.log(item.filterName + " = ? " + cat.category);
        //         if (item.filterName === cat.category) {
        //             //console.log(item.filterName + " = = " + cat.category);
        //             item.isDisabled = false;
        //         } else {
        //             //item.isDisabled = true;
        //         }
        //     });
        // });

        $scope.checkCategories = function (categoryLists, categories) {
            var tempCategories = $filter('unique')(categoryLists, 'category');
            categories.forEach(function (item) {
                tempCategories.forEach(function (cat) {
                    //console.log(item.filterName + " = ? " + cat.category);
                    if (item.filterName === cat.category) {
                        //console.log(item.filterName + " = = " + cat.category);
                        item.isDisabled = false;
                    } else {
                        //item.isDisabled = true;
                    }
                });
            });
        };

        $scope.archiveSortType = 'date'; // set the default sort type
        $scope.sortReverse = false;
        $scope.archiveFilterBy = '';

        // $scope.archiveSelectFilter = function (filter) {
        //     if (!filter.isDisabled) {
        //         if (filter.filterName === 'all') {
        //             $scope.archiveFilterBy = '';
        //         } else {
        //             $scope.archiveFilterBy = filter.filterName;
        //         }
        //     } else {
        //         return false;
        //     }
        //
        //     filter.isSelected = !filter.isSelected;
        //     if (filter.isSelected) {
        //         angular.forEach($scope.archiveFilters, function (value, key) {
        //             if (filter.filterName !== value.filterName) {
        //                 value.isSelected = false;
        //             }
        //         });
        //     } else {
        //         $scope.archiveFilters[11].isSelected = true;
        //         $scope.archiveFilterBy = '';
        //         /*if(filter.filterName == 'all'){
        //          filter.isSelected= true;
        //          }*/
        //     }
        // }

        // Coupons
        $scope.couponFilters = [
            {
                'filterName': 'fashion',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'dining',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'groceries',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'home & services',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'electronics',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'health & beauty',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'hotel & travel',
                'isDisabled': true,
                'isSelected': false
            }, {
                'filterName': 'misc',
                'isDisabled': true,
                'isSelected': false
            }
        ];
        $scope.couponLists = [
            {
                'company': "A&F",
                'name': "25% off whatever you want",
                'date': "20 Sep",
                'category': "fashion"
            }, {
                'company': "My Protien",
                'name': "EVERYTHING DISCOUNTED- 60% Off ",
                'date': "20 Sep",
                'category': "health & beauty"
            }, {
                'company': "Hello Fresh",
                'name': "Claim your $35 Meal Voucher!",
                'date': "19 Sep",
                'category': "groceries"
            }, {
                'company': "Tango",
                'name': "Your 10% Off Coupon Code is Inside",
                'date': "19 Sep",
                'category': "misc"
            }, {
                'company': "Hotels.com",
                'name': "Deals Expire Soon: Up to 50% off",
                'date': "18 Sep",
                'category': "hotel & travel"
            }, {
                'company': "Zappos",
                'name': "No strings attached… $25 just for you",
                'date': "17 Sep",
                'category': "fashion"
            }, {
                'company': "AMC Stubs",
                'name': "requirements",
                'date': "15 Sep",
                'category': "home & services"
            }
        ];

        $scope.couponSortType = 'date'; // set the default sort type
        $scope.couponFilterBy = '';

        $scope.checkCategories($scope.couponLists, $scope.couponFilters);

        // $scope.couponSelectFilter = function (filter) {
        //     console.log('coupon filter.......');
        //     if (!filter.isDisabled) {
        //         $scope.couponFilterBy = filter.filterName;
        //     } else {
        //         return false;
        //     }
        //
        //     filter.isSelected = !filter.isSelected;
        //
        //     if (filter.isSelected) {
        //         angular.forEach($scope.couponFilters, function (value, key) {
        //             if (filter.filterName !== value.filterName) {
        //                 value.isSelected = false;
        //             }
        //         });
        //     } else {
        //         $scope.couponFilterBy = '';
        //     }
        // }
    });
