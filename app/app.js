angular.module('agendaPlanner', ['agendaPlanner.MainController', 'agendaPlanner.AgendaController', 'ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		controller : 'MainCtrl',
		templateUrl : 'views/frontView.html'
	}).when('/agenda', {
		controller : 'AgendaCtrl',
		templateUrl : 'views/agendaView.html'	
	}).otherwise({
		redirectTo : '/'
	}); 
}]);