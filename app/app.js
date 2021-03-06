angular.module('agendaPlanner', ['agendaPlanner.MainController', 'agendaPlanner.AgendaController', 'agendaPlanner.ActivityController', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngDraggable'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		controller : 'MainCtrl',
		templateUrl : 'views/frontView.html'
	}).when('/agenda', {
		controller : 'AgendaCtrl',
		templateUrl : 'views/agendaView.html'
	}).when('/help', {
		controller : 'MainCtrl',
		templateUrl : 'views/help.html'	
	}).when('/about', {
		controller : 'MainCtrl',
		templateUrl : 'views/about.html'
	}).otherwise({
		redirectTo : '/'
	}); 
}]);