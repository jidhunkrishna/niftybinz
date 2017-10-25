/**
 * Created by jidhun krishna on 9/10/17.
 */

angular.module('niftybinzApp').directive('commonSearch',function ($timeout,$state) {
    return{
        scope: {
            'searchText': '='
        },
        template:'<div class="input-group col-md-12"><input type="text" id="common_search" ' +
        'class="form-control input-lg" ng-model="searchText" />' +
        '<span class="input-group-btn" ng-show="searchText.length==0">' +
        '<button class="btn btn-info btn-lg" type="button">' +
        '<i class="glyphicon glyphicon-search"></i>' +
        '</button></span>' +
        '<span class="input-group-btn" ng-hide="searchText.length==0" ng-click=cancelCouponSearch()> ' +
        '<button class="btn btn-info btn-lg" type="button">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button></span></div>',
        link:function link(scope, element, attrs,state) {
            state = $state.current.name;
            var el = element.find('#common_search');
            el.removeAttr('id');
            el.attr('id', state+'Search');
            el.attr('placeholder','Search '+state)
        }
    }
});

angular.module('niftybinzApp').directive('commonDataTable',function ($timeout,$state) {
    return{
        scope: {
        },
        template:'<table id="dataTable" style="cursor:pointer" class="table table-bordered table-striped ">' +
        '<thead>' +
        '<tr><td>COMPANY</td><td>NAME</td><td>DATE</td><td>Subcategory</td></tr>' +
        '</thead>' +
        '</table>',
        link:function link(scope, element, attrs,state) {
            state = $state.current.name;
            var el = element.find('#dataTable');
            el.removeAttr('id');
            el.attr('id', state+'Table');
        }
    }
});

angular.module('niftybinzApp').directive('commonFilter',function ($timeout,$state) {
    return{
        scope: {
            'filterList':'=',
            onSelect: "&"
        },
        template:'<div class="col-lg-12 col-md-12 col-sm-4 text-center filters"><span id="label"></span>' +
        '<div class="btn-group " role="group" aria-label="...">' +
        '<div class="btn-group" role="group" ng-repeat="filter in filterList">' +
        '<button type="button" ng-click="onSelect({filter:filter})" class="btn btn-default"' +
        'ng-class="{selected: filter.isSelected, disabled: filter.isDisabled}">' +
        '{{filter.filterName | uppercase}}</button></div></div></div>',
        link:function link(scope, element, attrs,state) {
            // state = $state.current.name;
        }
    }
});

