angular.module('agendaPlanner.ActivityController', ['agendaPlanner.AgendaService'])
.controller('ActivityCtrl', function($scope, $location, Agenda) {

    $scope.type = "";
    $scope.activity = {
        'name': '',
        'length': new Date(),
        'description': ''
    }

    $scope.reset = function() {
        $scope.activity.name = "";
	    $scope.activity.length = {
	        'hours': 0,
	        'minutes': 0
	    },
	    $scope.activity.description = "";
    };
	
	//Creates an activity and adds it to the model
	$scope.createActivity = function() {
	    this.newActivity = angular.copy($scope.activity);
	    $scope.reset();
	    var minutes = this.newActivity.length.hours * 60 + this.newActivity.length.minutes;
		return Agenda.createActivity(minutes, this.newActivity.name, $scope.type, this.newActivity.description);
	};
	
	//Retrieves list of activities do not belong to a day
	$scope.parkedActivities = Agenda.parkedActivities;
	$scope.days = Agenda.days;
	
	//Add Activity Button
	$scope.createActivityButton = "Add Activity";
	
	//Available activity times
	$scope.availableTimes = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];

	//Sets the activity type
	$scope.setType = function(id) {
        $scope.type = id;
	};
	
	// Drag&Drop of the activities
	$scope.onDropCompleteActivity = function(index, obj, evt, location) {
		
		if (location == "sidebar") {
			var otherObj = $scope.parkedActivities[index];
			var otherIndex = $scope.parkedActivities.indexOf(obj);
			$scope.parkedActivities[index] = obj;
			$scope.parkedActivities[otherIndex] = otherObj;
			
		} else {
			var otherIndex = $scope.parkedActivities.indexOf(obj);
			$scope.parkedActivities.splice(otherIndex, 1);
			$scope.days[0]._addActivity(obj);
		}
	};

	$scope.submitButtonDisabled = function() {
	    return $scope.activity.name === "" || $scope.activity.minutes === 0 || $scope.activity.description === "" || $scope.type === "";
	};


});