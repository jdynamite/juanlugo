var juanApp = angular.module("juanApp", ['ngRoute']);

juanApp.directive('toggleClass', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('click', function() {
				$('.row-offcanvas').toggleClass(attrs.toggleClass)
			});
		}
	};
});

juanApp.directive('parseStyle', function($interpolate) {
    return function(scope, elem) {
        var exp = $interpolate(elem.html()),
            watchFunc = function () { return exp(scope); };
        
        scope.$watch(watchFunc, function (html) {
            elem.html(html);
        });
    };
});

juanApp.directive('toggleActive', function() {
    return {
        link : function(scope, element, attrs) {
            element.bind('click', function() {
            	$('.navLink').removeClass('active');
                $(element).parent().addClass('active');
            });
        }
    };
});

juanApp.controller('detailController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {

	$scope.activeMenu = "gallery";

	$http.get('js/projects/projects.json').success(function(data) {
		$scope.projects = data;
		$scope.projectId = $routeParams.projectId;
	});

	$scope.slide = function(dir) {
        $('#detailCarousel').carousel(dir);
    }


	$scope.getProgramImg = function getProgramImg(program) {
		var imgPath = '';
		switch(program) {
			case('Autodesk Maya'):
				imgPath = 'img/icons/autodesk-maya.png';
				break;
			case('ZBrush'):
				imgPath = 'img/icons/zbrush.png';
				break;
			case('UE4'):
				imgPath ='img/icons/ue4.png';
				break;
			case('Keyshot'):
				imgPath = 'img/icons/keyshot.png';
				break;
			case('Unity'):
				imgPath = 'img/icons/unity.png'
				break;
		}
		return imgPath;
	}

}]);

juanApp.controller('galleryController', ['$scope', '$http', function($scope, $http) {
	$scope.activeMenu = "gallery";
	$scope.categories = ["All"];
	$http.get('js/projects/projects.json').success(function( data ) {
		$scope.projects = data;
		for (var i = 0; i < $scope.projects.length; i++) {
			var category = $scope.projects[i].category;
			if ( jQuery.inArray(category, $scope.categories) == -1 ) {
				$scope.categories.push(category);
			}
		}
	});

	$scope.setCategory = function setCategory(cat) {
		console.log(cat);
		return cat;
	}

}]);

juanApp.controller('resumeController', ["$scope", function($scope) {
	$scope.activeMenu = "resume";
}]);

juanApp.controller('demoController', ["$scope", function($scope) {
	$scope.activeMenu = "demo";
	$scope.demolink = "https://player.vimeo.com/video/143742564"
}]);

juanApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

juanApp.config( function($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: "partials/gallery.html",
		controller: 'galleryController'
    })
    .when('/projects/:projectId', {
    	templateUrl: "partials/detail.html",
    	controller: 'detailController'
    })
    .when('/resume', {
    	templateUrl:"partials/resume.html",
    	controller: 'resumeController'
    })
    .when('/demo', {
    	templateUrl: "partials/demo.html",
    	controller: 'demoController'
    })
    .otherwise ({
    	redirectTo: 'partials/gallery.html'
    })

    $locationProvider.html5Mode(false).hashPrefix('!');

});