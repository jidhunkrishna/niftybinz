/**
 * Created by jidhun krishna on 11/10/17.
 */

angular.module('niftybinzApp')
    .controller('CouponDetailCtrl', function ($scope, $state,couponsLists, dataTableService, $timeout,$filter,$stateParams) {
        console.log('detail....................');
        console.log(couponsLists);
        console.log($stateParams.Coupon);
        $scope.selected_coupon=$stateParams.Coupon;
        var state = $state.current.name;
        $scope.selected_couponList=$filter('filter')(couponsLists,
            {'fileType':$scope.selected_coupon.fileType,'subcategory':$scope.selected_coupon.subcategory});

        $scope.coupon_details_table= $('#couponDetailsTable').DataTable( {
            data: $scope.selected_couponList,
            columns: [
                { "data": "discount_price","width": "20%"},
                { "data": "name" ,"width": "60%"},
                { "data": "display_date" ,
                    "render":function (data) {
                        console.log(data);
                        if (data!='NULL'){
                            return moment(data).format("DD MM");
                        }
                        else
                            return 'N/A'
                    },
                    "width": "20%"
                }
            ],
            "info":false,
            "lengthChange":false,
            "paging":false,
            "order": [[ 2, 'dec' ]]
            // "searching":false
        } );

        $('#couponDetailSearch').keyup(function(){
            $scope.coupon_details_table.search($(this).val()).draw();
        });

        $scope.cancelCouponDetail= function () {
            $scope.couponDetailText = "";
            $scope.coupon_details_table.search($scope.couponDetailText).draw();
        }

    });