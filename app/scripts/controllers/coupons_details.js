/**
 * Created by jidhun krishna on 11/10/17.
 */

angular.module('niftybinzApp')
    .controller('CouponDetailCtrl', function ($scope,$rootScope,$state,couponsLists, dataTableService, $timeout,$filter,
                                              $stateParams,dialogService) {

        var selected_coupon_details = $stateParams.param;
        $scope.selected_coupon=$filter('filter')(couponsLists, {'id':selected_coupon_details.Coupon});

        if (selected_coupon_details.flag){
            $scope.selected_couponList=$filter('filter')(couponsLists,
                {'fileType':$scope.selected_coupon[0].fileType});
        }
        else{
            $scope.selected_couponList=$filter('filter')(couponsLists,
                {'fileType':$scope.selected_coupon[0].fileType,'subcategory':$scope.selected_coupon[0].subcategory});
        }

        //adding image on column head of the detail table
        var image='<img src="http://logo.clearbit.com/'+$scope.selected_coupon[0].fileType+'" ' +
            'style="width:20%;height:20%;object-fit:contain" alt="'+$scope.selected_coupon[0].fileType+'">';
        angular.element(document).find('.image_title').html(image);

        $scope.coupon_details_table= $('#couponDetailsTable').DataTable( {
            data: $scope.selected_couponList,
            columns: [
                { "data": "discount_price","width": "20%",
                    "render":function (data) {
                        if (data!='NULL'){
                            return '<b>'+data+'</b> OFF';
                        }
                        else
                            return 'N/A'
                    }
                },
                { "data": "name" ,"width": "60%"},
                { "data": "display_date" ,
                    "render":function (data,type) {
                        if(type == 'display'){
                            if (data!='1980-01-01' && moment(data,'YYYY-MM-DD',true).isValid()){
                                return moment(data,'YYYY-MM-DD').format("DD MMM YYYY");
                            }
                            else
                                return 'N/A'
                        }
                        return data;

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
        };
        // on row click of the table, display a popup contain the details of the mail
        $('#couponDetailsTable tbody').on('click', 'tr', function (ev) {
            $rootScope.popup_loading = true;
            var data = $scope.coupon_details_table.row( this ).data();
            $(this).prop('disabled', true);
            dialogService.popup(data,ev,this);
        });

    });