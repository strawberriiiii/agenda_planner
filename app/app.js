angular.module('agendaPlanner', ['agendaPlanner.MainController', 'agendaPlanner.AgendaController', 'agendaPlanner.ActivityController', 'ngRoute', 'ui.bootstrap', 'ngDraggable'])
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
	}).otherwise({
		redirectTo : '/'
	}); 
}]);