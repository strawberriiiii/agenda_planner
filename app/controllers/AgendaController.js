angular.module('agendaPlanner.AgendaController', ['agendaPlanner.AgendaService'])
.controller('AgendaCtrl', function($scope, $log, Agenda) {
	
	//Variables
	$scope.addDayButton = "Add Day";
	$scope.startSlot = "Start Time: ";
	$scope.endSlot = "End Time: ",
	$scope.totalLengthSlot = "Total Length: ";
	$scope.minute = "min";
	$scope.date = "Date: ";
	$scope.deleteDay = "Delete Day";
	$scope.labels = Agenda.labels;
	$scope.days = Agenda.days;
	$scope.popupArray = [];
	
	
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
	
	// Create parked activity array
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
	
	// Delete activity from day
	$scope.deleteActivityFromDay = function(dayIndex, activityIndex) {
		if (confirm("Are you sure you want to delete this activity?")) {
				Agenda.deleteActivityFromDay(dayIndex, activityIndex);
	        if ($scope.days[dayIndex]._activities.length == 0) {
	            Agenda.clearCanvas(dayIndex);
	        } else {
	            Agenda.drawGraphic(dayIndex);
	        }
	        Agenda.drawGraphic(dayIndex);
		}        
	};
		
	// Add day
	$scope.addDay = function(startH, startM, date) {
		$scope.updateTimeDatePicker();
		Agenda.addDay(startH, startM, date);
		updateActivities();
		$scope.popupArray.push({opened: false});
		
		for (x in $scope.days) {
			console.log($scope.days[x].getDate());
		};
	};
	
	// Remove day
	$scope.removeDay = function(indexDay) {
		if (confirm("Are you sure you want to delete this day?")) {
			$scope.popupArray.splice(indexDay, 1);
			return Agenda.removeDay(indexDay);
		}
	};
	
	// Drag&Drop of the days
	$scope.onDropCompleteDay = function(index, obj, evt) {
		if ('_start' in obj) {
		   	var otherObj = $scope.days[index];
			var otherIndex = $scope.days.indexOf(obj);
			$scope.days[index] = obj;
			$scope.days[otherIndex] = otherObj;
		} else {
			alert("Please move the activity in the provided dropzone for activities!");
		}
	};
	
	// Draw chart for the percentages of the activities per day
	$scope.drawGraphic = function(indexDay) {
		Agenda.drawGraphic(indexDay);				
	};
	
	// Timepicker
	$scope.selectText = "Select the start time and date!";
	$scope.mytime = new Date();
  	$scope.hstep = 1;
 	$scope.mstep = 1;
 	
 	$scope.updateTimeDatePicker = function() {
		var d = new Date();
	    d.setHours( 8 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	    
	    $scope.dt = new Date();
	};
	
 	$scope.updateTimeDatePicker();
 	
 	// Datepicker
 	$scope.dt = new Date();
 	
 	$scope.inlineOptions = {
    	minDate: new Date(),
    	showWeeks: true
  	};
  	
 	$scope.dateOptions = {
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
  	};
  	
  	$scope.popupDay = {
    	opened: false
  	};

	$scope.open = function(nr) {
		if (nr == null) {
    		$scope.popupDay.opened = true;
    	} else {
    		$scope.popupArray[nr].opened = true;
    	}
  	};

});