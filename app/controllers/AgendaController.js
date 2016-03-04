angular.module('agendaPlanner.AgendaController', ['agendaPlanner.AgendaService'])
.controller('AgendaCtrl', function($scope, $log, Agenda) {
	
	//Variables
	$scope.addDayButton = "Add Day";
	$scope.startSlot = "Start Time: ";
	$scope.endSlot = "End Time: ",
	$scope.totalLengthSlot = "Total Length: ";
	$scope.minute = "min";
	$scope.days = Agenda.days;
	
	$scope.addDay = function(startH, startM) {
		$scope.update();
		return Agenda.addDay(startH, startM);
	};
	
	//Timepicker
	$scope.selectText = "Select the start time!";
	$scope.mytime = new Date();
  	$scope.hstep = 1;
 	$scope.mstep = 1;
 	
	$scope.update = function() {
		var d = new Date();
	    d.setHours( 8 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	};
	
	$scope.clear = function() {
	    $scope.mytime = null;
	};
	
	$scope.update();

	//Add Activity
	$scope.createActivityButton = "Add Activity";
	
	$scope.createActivity = function(minutes, name, type, description) {
		return Agenda.createActivity(minutes, name, type, description);
	};
	
	$scope.parkedActivities = function() {
		return Agenda.parkedActivities;
	};
	
	//Available activity times
	$scope.availableTimes = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];
	
	//Types of activities (might not want to have this here?)
	$scope.types = ["Presentation", "Discussion", "Group work", "Break"];

});