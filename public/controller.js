        var mainApp = angular.module("mainApp", ['ngRoute']);
        mainApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            
            when('/home', {
               templateUrl: 'home.htm',
               controller: 'homeController'
            }).
            
            when('/write', {
               templateUrl: 'write.htm',
               controller: 'writeController'
            }).
            

            otherwise({
               redirectTo: '/home'
            });
        }]);
         
        mainApp.controller('homeController', function($scope, $http) {
        	$scope.message = "This is an adventure blog";
	$http.get("/#/home")
	.success (function (response) {
			console.log("successsss");
    			//var data =  JSON.parse(response);
			console.log(response);
  		})
  		.error (function() {
    			alert("SERVER GET TEST FAILED THO");
  		});
	/*	$http({
			method: 'GET',
			url: '/#/home'
		}).then(function success(response)
		{
			console.log("WORKS!");
			console.log(response);
		}) */
	/*	$http.jsonp("/#/home").success(function(data)
		{
			console.log("WORKS!");
			console.log(response);
		}); */
	
	});
        mainApp.controller('writeController', function($scope, $http) {
         	$scope.blog = {};   
		
		$scope.submit = function() {
        	$scope.message2 = "test message: title is " + $scope.blog.title + " category is " + $scope.blog.category;
      		//console.log($scope.blog.title);
		$http.post('/#/write', ({"title": $scope.blog.title, "category": $scope.blog.category, "body": $scope.blog.body, "post": true}))
            	.success(function(data) {
                	$scope.blog.title = data;
                	console.log("SUCCESSSSS");
			//console.log(data);
            	})
            .error(function(data) {
                console.log('Errorrrrr: ' + data);
            });
	}
        }); 
