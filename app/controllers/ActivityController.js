angular.module('agendaPlanner.ActivityController', ['agendaPlanner.AgendaService'])
.controller('ActivityCtrl', function($scope, $location, Agenda) {

    $scope.type = "";
    $scope.activity = {
        'name': '',
        'length': new Date(),
        'description': ''
    };
    $scope.hstep = 1;
 	$scope.mstep = 1;
 	$scope.parkedActivities = Agenda.parkedActivities;	
	$scope.days = Agenda.days;

    $scope.reset = function() {
        $scope.activity.name = "";
	    $scope.activity.length = new Date();
	    $scope.activity.length.setHours(0);
	    $scope.activity.length.setMinutes(0);
	    $scope.activity.description = "";    
    };
    
    //reset radioButtons
    $scope.resetTypes = function() {
    	if (document.getElementById("radio1") != null && document.getElementById("radio2") != null 
    		&& document.getElementById("radio3") != null && document.getElementById("radio4") != null) {
	    	document.getElementById("radio1").checked = false;
		    document.getElementById("radio2").checked = false;
		    document.getElementById("radio3").checked = false;
		    document.getElementById("radio4").checked = false;
		  }
    };

    $scope.reset();
	
	//Creates an activity and adds it to the model
	$scope.createActivity = function() {
	    this.newActivity = angular.copy($scope.activity);
	    $scope.reset();
	    $scope.resetTypes();
	    var minutes = this.newActivity.length.getHours() * 60 + this.newActivity.length.getMinutes();
		return Agenda.createActivity(minutes, this.newActivity.name, $scope.type, this.newActivity.description);
	};
	
	//Add Activity Button
	$scope.createActivityButton = "Add Activity";
	
	//Available activity times
	$scope.availableTimes = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];

	//Sets the activity type
	$scope.setType = function(id) {
        $scope.type = id;
	};

	$scope.getModifiedTypeId = function() {
	    if ($scope.type === 'GroupWork') {
	        return 'Group Work';
	    }
	    return $scope.type;
	};
	
	$scope.onDropCompleteActivity = function(index, fullObj, evt, location) {
		if ('_start' in fullObj) {
			alert("Please drag the day in the provided dropzone for days!");
		} else {
			var obj = fullObj[0];
			var originLocation = fullObj[1];
			console.log(originLocation);
			console.log(location);
			
			// if an activity is dragged and dropped within the sidebar
			if (location == originLocation && location == 'sidebar') {
				var otherObj = $scope.parkedActivities[index];
				var otherIndex = $scope.parkedActivities.indexOf(obj);
				$scope.parkedActivities[index] = obj;
				$scope.parkedActivities[otherIndex] = otherObj;
				console.log("Path 1: " + $scope.parkedActivities);	
			} 
			// if an activity from the sidebar is dragged and dropped to a day
			else if (originLocation == 'sidebar' && location != 'sidebar') {
				var otherIndex = $scope.parkedActivities.indexOf(obj);
				$scope.days[location]._activities.splice(index, 0, obj);
				$scope.parkedActivities.splice(otherIndex, 1);
				console.log("Path 2 " + $scope.days[location]._activities + ", " + $scope.parkedActivities);
				
				Agenda.drawGraphic(location);
			} 
			// if an activity from a day is dragged and dropped to the sidebar
			else if (originLocation != 'sidebar' && location == 'sidebar') {
				var otherIndex = $scope.days[originLocation]._activities.indexOf(obj);
				$scope.parkedActivities.splice(index, 0, obj);
				$scope.days[originLocation]._activities.splice(otherIndex, 1);
				console.log("Path 3: " + $scope.parkedActivities + ", " + $scope.days[originLocation]._activities);
				
				if ($scope.days[originLocation]._activities.length == 0) {
					Agenda.clearCanvas(originLocation);
				} else {
					Agenda.drawGraphic(originLocation);	
				}
			}
			// if an activity is dragged and dropped within a day
			else if (location == originLocation && location != 'sidebar') {
				var otherObj = $scope.days[location]._activities[index];
				var otherIndex = $scope.days[location]._activities.indexOf(obj);
				$scope.days[location]._activities[index] = obj;
				$scope.days[location]._activities[otherIndex] = otherObj;
				console.log("Path 4: " + $scope.days[location]._activities);	
			}
			// if an activity from one day is dragged and dropped to another day
			else {		
				var otherIndex = $scope.days[originLocation]._activities.indexOf(obj);
				$scope.days[location]._activities.splice(index, 0, obj);
				$scope.days[originLocation]._activities.splice(otherIndex, 1);
				console.log("Path 5: " + $scope.days[location]._activities + ", " + $scope.days[originLocation]._activities);	
			
				if ($scope.days[originLocation]._activities.length == 0) {
					Agenda.clearCanvas(originLocation);
				} else {
					Agenda.drawGraphic(originLocation);	
				}
				Agenda.drawGraphic(location);
			}
			$scope.originLocation = null;
			
		} 		
	};
	
	$scope.submitButtonDisabled = function() {
	    return $scope.activity.name === "" || $scope.activity.minutes === 0 || $scope.activity.description === "" || $scope.type === "";
	};

	$scope.deleteActivity = function(index) {
	    if (confirm("Are you sure you want to delete this activity?")) {
			Agenda.removeParkedActivity(index);
		}	    
	};

	$scope.editedActivity = {
	    'name': '',
	    'length': new Date(),
	    'description': ''
	};

	$scope.findActivity = function(index) {
	    $scope.editIndex = index;
	    var activityToBeEdited = $scope.parkedActivities[index];
	    $scope.editedActivity.name = activityToBeEdited.getName();
	    var length = activityToBeEdited.getLength();
	    var date = new Date();
	    date.setHours(length / 60);
	    date.setMinutes(length % 60);
	    $scope.editedActivity.length = date;
	    $scope.editType = activityToBeEdited.getTypeId();
	    //document.getElementById(type).checked = true;
	    $scope.editedActivity.description = activityToBeEdited.getDescription();
	};

	$scope.setEditType = function(type) {
	    $scope.editType = type;
	};

	$scope.editActivity = function() {
	    $scope.parkedActivities[$scope.editIndex].setName($scope.editedActivity.name);
	    $scope.parkedActivities[$scope.editIndex].setLength($scope.editedActivity.length.getHours() * 60 + $scope.editedActivity.length.getMinutes());
	    $scope.parkedActivities[$scope.editIndex].setTypeId($scope.editType);
	    $scope.parkedActivities[$scope.editIndex].setDescription($scope.editedActivity.description);
	    $scope.reset();
	};
	
	
	/**
	 * Sort of activities according to parameters
	 */
	$scope.sortByAlphabet = function() {
		$scope.parkedActivities.sort(alphabetical);
	};
	
	$scope.sortByAlphabetReverse = function() {
		$scope.parkedActivities.sort(alphabeticalReverse);
	};
	
	$scope.sortByType = function() {
		$scope.parkedActivities.sort(sortByType);
	};
	
	function alphabetical(a, b) {
	    var A = a.getName().toLowerCase();
	    var B = b.getName().toLowerCase();
	    if (A < B){
	    	return -1;
	    } else if (A > B){
	    	return  1;
	    } else{
	    	return 0;
	    }
	};
	
	function alphabeticalReverse(a, b) {
	    var A = a.getName().toLowerCase();
	    var B = b.getName().toLowerCase();
	    if (A < B){
	    	return 1;
	    } else if (A > B){
	    	return  -1;
	    } else{
	    	return 0;
	    }
	};
	
	function sortByType(a, b) {
		for (x in Agenda.labels) {
			if (Agenda.labels[x] == a.getTypeId()) {
				A = x;
			}
			if (Agenda.labels[x] == b.getTypeId()) {
				B = x;
			}
		}
		
		if (A < B){
	    	return -1;
	    } else if (A > B){
	    	return  1;
	    } else{
	    	return 0;
	    }
	}
	
});