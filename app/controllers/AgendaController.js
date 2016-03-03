angular.module('agendaPlanner.AgendaController', ['agendaPlanner.AgendaService'])
.controller('AgendaCtrl', function($scope, Agenda) {
	
	//Variables
	$scope.addDayButton = "Add Day";
	
	$scope.addDay = function(startH, startM) {
		return Agenda.addDay(startH, startM);
	};
	
	$scope.createActivityButton = "Add Activity";
	
	$scope.createActivity = function(hours, minutes, name, type) {
		return Agenda.createActivity(hours, minutes, name, type);
	}
	
	$scope.parkedActivities = function() {
		return Agenda.parkedActivities;
	}
});