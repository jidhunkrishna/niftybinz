/**
 * Created by jidhun krishna on 11/10/17.
 */

angular.module('niftybinzApp')
    .controller('CouponDetailCtrl', function ($scope, $state,couponsLists, dataTableService, $timeout,$filter,$stateParams) {
        console.log('detail....................');
        var state = $state.current.name;
        var selected_coupon_details = $stateParams.param;
        $scope.selected_coupon=$filter('filter')(couponsLists, {'id':selected_coupon_details.Coupon});
        // console.log(selected_coupon_details);
        // console.log('select',$scope.selected_coupon[0].fileType);

        if (selected_coupon_details.flag){
            $scope.selected_couponList=$filter('filter')(couponsLists,
            {'fileType':$scope.selected_coupon[0].fileType});
        }
        else{
            $scope.selected_couponList=$filter('filter')(couponsLists,
            {'fileType':$scope.selected_coupon[0].fileType,'subcategory':$scope.selected_coupon[0].subcategory});
        }

        $scope.coupon_details_table= $('#couponDetailsTable').DataTable( {
            data: $scope.selected_couponList,
            columns: [
                { "data": "discount_price","width": "20%"},
                { "data": "name" ,"width": "60%"},
                { "data": "display_date" ,
                    "render":function (data) {
                        // console.log(data);
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