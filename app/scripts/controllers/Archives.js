/**
 * Created by tvpc00016 on 6/10/17.
 */
angular.module('niftybinzApp')
    .controller('ArchiveCtrl', function ($scope, $filter, $location, $state, archiveLists) {

        $scope.archiveLists=archiveLists;
        $('#archiveTable').DataTable( {
            data: $scope.archiveLists,
            columns: [
                { "data": "fileType" },
                { "data": "name" },
                { "data": "date" }
            ],
            "info":false,
            "lengthChange":false,
            "paging":false,
            "searching":false
        } );

    });