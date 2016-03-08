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
    }
	
	//Creates an activity and adds it to the model
	$scope.createActivity = function() {
	    this.newActivity = angular.copy($scope.activity);
	    $scope.reset();
	    var minutes = this.newActivity.length.hours * 60 + this.newActivity.length.minutes;
		return Agenda.createActivity(minutes, this.newActivity.name, $scope.type, this.newActivity.description);
	};
	
	//Retrieves list of activities do not belong to a day
	$scope.parkedActivities = function() {
		return Agenda.parkedActivities;
	};
	
	//Add Activity Button
	$scope.createActivityButton = "Add Activity";
	
	//Available activity times
	$scope.availableTimes = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];

	//Sets the activity type
	$scope.setType = function(id) {
        $scope.type = id;
	};

	$scope.submitButtonDisabled = function() {
	    return $scope.activity.name === "" || $scope.activity.minutes === 0 || $scope.activity.description === "" || $scope.type === "";
	}

});