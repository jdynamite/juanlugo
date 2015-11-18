'use strict';

juanApp.controller('detailController', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.projectId = $routeParams.projectId;
}]);