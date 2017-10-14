/**
 * Created by jidhun krishna on 9/10/17.
 */

angular.module('niftybinzApp').directive('commonSearch',function ($timeout,$state) {
    return{
        scope: {
            // 'searchlist': '=',
            // 'searchdata':'=',
            // 'placeholder':'@'
        },
        template:'<input type="text" id="common_search" class="form-control input-lg" ng-model="searchArchiveText" />',
        link:function link(scope, element, attrs,state) {
            console.log($state.current.name);
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
        template:'<table id="dataTable" class="table table-bordered table-striped ">' +
        '<thead>' +
        '<tr><td>Type</td><td>Name</td><td>Date</td><td>Category</td>' +
        '</table>',
        link:function link(scope, element, attrs,state) {
            console.log($state.current.name);
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
        },
        template:'<div class="col-lg-12 col-md-12 col-sm-4 text-center filters">' +
        '<div class="btn-group" role="group" aria-label="...">' +
        '<div class="btn-group" role="group" ng-repeat="filter in archiveFilters">' +
        '<button type="button" ng-click="archiveSelectFilter(filter)" class="btn btn-default"' +
        'ng-class="{selected: filter.isSelected, disabled: filter.isDisabled}">' +
        '{{filter.filterName | uppercase}}</button></div></div></div>',
        link:function link(scope, element, attrs,state) {
            console.log($state.current.name);
            state = $state.current.name;
            var el = element.find('#dataTable');
            el.removeAttr('id');
            el.attr('id', state+'Table');
        }
    }
})