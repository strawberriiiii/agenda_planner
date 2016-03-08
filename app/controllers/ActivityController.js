angular.module('agendaPlanner.ActivityController', ['agendaPlanner.AgendaService'])
.controller('ActivityCtrl', function($scope, $location, Agenda) {

    $scope.type = "";
    $scope.activity = {
        'name': '',
        'minutes': 0,
        'description': ''
    }
	
	//Creates an activity and adds it to the model
	$scope.createActivity = function() {
		return Agenda.createActivity($scope.activity.minutes, $scope.activity.name, $scope.type, $scope.activity.description);
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