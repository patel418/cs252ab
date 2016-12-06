angular.module('mainApp')
	.config(['$stateProvider', 'urlRouterProvider', function($stateProvider, $urlRouterProvider)
	{
		$urlRouterProvider.otherwise('home');

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'index.html',
			controller: 'homeController',
		})//.state('login', {
	/*		url: '/login',
			templateUrl: 'login.htm',
			controller: 'loginController'
			
		}).state('/myposts', {
			url: '/',
			templateUrl: 'myposts.htm',
			controller: 'mypostsController'
		
		})*/;
	}
	
