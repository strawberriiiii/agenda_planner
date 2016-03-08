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
	
	//Creates an activity and adds it to the model
	$scope.createActivity = function() {
	    this.newActivity = angular.copy($scope.activity);
	    $scope.reset();
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
	
	// Drag&Drop of the activities
	$scope.onDropCompleteActivity = function(index, obj, evt, location) {
		
		// if an activity from the sidebar is drag&droped in the sidebar
		if (location == "sidebar") {
			var otherObj = $scope.parkedActivities[index];
			var otherIndex = $scope.parkedActivities.indexOf(obj);
			$scope.parkedActivities[index] = obj;
			$scope.parkedActivities[otherIndex] = otherObj;
			
		} else {
			var otherIndex = $scope.days[location].length;
			Agenda.moveActivity(null, index, location, otherIndex);
		
			$scope.parkedActivities.splice(index, 1);
			//$scope.days[0]._addActivity(obj);
			console.log($scope.parkedActivites);
			console.log($scope.days[location].activities);
		}
	};

	$scope.submitButtonDisabled = function() {
	    return $scope.activity.name === "" || $scope.activity.minutes === 0 || $scope.activity.description === "" || $scope.type === "";
	};

	$scope.reset();

});