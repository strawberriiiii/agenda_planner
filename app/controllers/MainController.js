angular.module('agendaPlanner.MainController', [])
.controller('MainCtrl', function($scope, $location) {
	
	// Variables
	$scope.appName = "Agenda Planner";
	$scope.enterButton = "Enter the Agenda Planner";
	$scope.footerText = "Copyright by Astrid Rauscha & Jessica Spratley - 2016";
	
	$scope.showSidebar = function() {
	    return $location.path() === '/agenda';
	};
	
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});