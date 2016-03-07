angular.module('agendaPlanner.ActivityController', ['agendaPlanner.AgendaService'])
.controller('ActivityCtrl', function($scope, $location, Agenda) {
	
	//Creates an activity and adds it to the model
	$scope.createActivity = function(minutes, name, type, description) {
		return Agenda.createActivity(minutes, name, type, description);
	};
	
	//Retrieves list of activities do not belong to a day
	$scope.parkedActivities = function() {
		return Agenda.parkedActivities;
	};
	
	//Add Activity Button
	$scope.createActivityButton = "Add Activity";
	
	//Available activity times
	$scope.availableTimes = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];

});