angular.module('agendaPlanner.AgendaController', ['agendaPlanner.AgendaService'])
.controller('AgendaCtrl', function($scope, Agenda) {
	
	//Variables
	$scope.addDayButton = "Add Day";
	
	$scope.addDay = function(startH, startM) {
		return Agenda.addDay(startH, startM);
	};
});