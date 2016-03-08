angular.module('agendaPlanner.AgendaController', ['agendaPlanner.AgendaService'])
.controller('AgendaCtrl', function($scope, $log, Agenda) {
	
	//Variables
	$scope.addDayButton = "Add Day";
	$scope.startSlot = "Start Time: ";
	$scope.endSlot = "End Time: ",
	$scope.totalLengthSlot = "Total Length: ";
	$scope.minute = "min";
	$scope.deleteDay = "Delete Day";
	$scope.labels = ["Presentation", "Discussion", "Group work", "Break"];
	$scope.days = Agenda.days;
	
	// Add day
	$scope.addDay = function(startH, startM) {
		$scope.update();
		return Agenda.addDay(startH, startM);
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
	
	// Drag&Drop of the activities
	/*$scope.onDropCompleteActvitiy = function(index, ob, evt, location) {
		var otherIndex = $scope.days[location].length;
			Agenda.moveActivity(null, index, location, otherIndex);
		
			$scope.days.parkedActivities.splice(index, 1);
			//$scope.days[0]._addActivity(obj);
			console.log($scope.days.parkedActivites);
			console.log($scope.days[location].activities);
	};*/
	
	// Draw chart for the percentages of the activities per day
	$scope.drawGraphic = function(indexDay) {
		      
		var whole = $scope.days[indexDay].getTotalLength();	
		var canvas = document.getElementById('myCanvas').getContext("2d");
		
		//Presentation block
		var partPres = $scope.days[indexDay].getLengthByType($scope.labels[0]);
		var perPartPres = round(partPres / whole, 2) * 100;
		
		canvas.beginPath();
		canvas.fillStyle = "#337ab7";
		canvas.strokeStyle = "#2e6da4";
		canvas.rect(10, 1, 50, perPartPres);
		canvas.fill();
		
		//Disscussion block
		var partDis = $scope.days[indexDay].getLengthByType($scope.labels[1]);
		var perPartDis = round(partDis / whole, 2) * 100;

		canvas.beginPath();
		canvas.fillStyle = "#5cb85c";
		canvas.strokeStyle = "#4cae4c";
		canvas.rect(10, perPartPres, 50, perPartDis);
		canvas.fill();
		
		//Group work block
		var partGroup = $scope.days[indexDay].getLengthByType($scope.labels[2]);
		var perPartGroup = round(partGroup / whole, 2) * 100;
		
		canvas.beginPath();
		canvas.fillStyle = "#d9534f";
		canvas.strokeStyle = "#d43f3a";
		canvas.rect(10, perPartPres + perPartDis, 50, perPartGroup);
		canvas.fill();
				
		//Break block
		var partBreak = $scope.days[indexDay].getLengthByType($scope.labels[3]);
		var perPartBreak = round(partBreak / whole, 2) * 100;
		
		canvas.beginPath();
		canvas.fillStyle = "#f0ad4e";
		canvas.strokeStyle = "#eea236";
		canvas.rect(10, perPartPres + perPartDis + perPartGroup, 50, perPartBreak);
		canvas.fill();
		
		//Minimum break line 
		if (whole > 0) {
			canvas.beginPath();
			canvas.strokeStyle = "red";
			canvas.moveTo(1, 70);
			canvas.lineTo(70, 70);
			canvas.stroke();
		}
				
		console.log(whole, perPartPres, perPartDis, perPartGroup, perPartBreak);		
	};
	
	function round(value, decimals) {
		$scope.Math = window.Math;
    	return Number($scope.Math.round(value+'e'+decimals)+'e-'+decimals);
	}
	
	// Timepicker
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
	
});