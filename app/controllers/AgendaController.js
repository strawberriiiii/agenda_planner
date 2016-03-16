angular.module('agendaPlanner.AgendaController', ['agendaPlanner.AgendaService'])
.controller('AgendaCtrl', function($scope, $log, Agenda) {
	
	//Variables
	$scope.addDayButton = "Add Day";
	$scope.startSlot = "Start Time: ";
	$scope.endSlot = "End Time: ",
	$scope.totalLengthSlot = "Total Length: ";
	$scope.minute = "min";
	$scope.deleteDay = "Delete Day";
	$scope.labels = Agenda.labels;
	$scope.days = Agenda.days;
	
	// Create activity array for days
	function dayActivities() {
		var activities = "{";
		for (d in $scope.days) {
			activities += "day : " + $scope.days[d]._activities;
			if (d < $scope.days.length) {
				activities += ",";
			}
		}
		return activities + "}";
	}
	
	// Create parked activitiy array
	function parkedActivities() {
		return Agenda.parkedActivitiesString();
	} 
	
	$scope.activities = {
        selected: null,
        dropzones: {
            "parked": $scope.days.parkedActivities,
            "day": $scope.days
        }
    };
	
	function updateActivities() {
		$scope.activities = {
			selected: null, 
			dropzones: {
            "parked": $scope.days.parkedActivities,
            "day": $scope.days
			}
		};
	};
	
	
	// Add day
	$scope.addDay = function(startH, startM) {
		$scope.updateTimePicker();
		Agenda.addDay(startH, startM);
		updateActivities();
	};
	
	// Remove day
	$scope.removeDay = function(indexDay) {
		return Agenda.removeDay(indexDay);
	};
	
	// Drag&Drop of the days
	$scope.onDropCompleteDay = function(index, obj, evt) {
		var otherObj = $scope.days[index];
		var otherIndex = $scope.days.indexOf(obj);
		$scope.days[index] = obj;
		$scope.days[otherIndex] = otherObj;
	};
	
	// Draw chart for the percentages of the activities per day
	$scope.drawGraphic = function(indexDay) {
		Agenda.drawGraphic(indexDay);				
	};
	
	// Timepicker
	$scope.selectText = "Select the start time!";
	$scope.mytime = new Date();
  	$scope.hstep = 1;
 	$scope.mstep = 1;
 	
	$scope.updateTimePicker = function() {
		var d = new Date();
	    d.setHours( 8 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	};
	
	$scope.clear = function() {
	    $scope.mytime = null;
	};
	
	$scope.updateTimePicker();
	
});