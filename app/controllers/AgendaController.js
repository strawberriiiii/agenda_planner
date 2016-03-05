angular.module('agendaPlanner.AgendaController', ['agendaPlanner.AgendaService'])
.controller('AgendaCtrl', function($scope, $log, Agenda) {
	
	//Variables
	$scope.addDayButton = "Add Day";
	$scope.startSlot = "Start Time: ";
	$scope.endSlot = "End Time: ",
	$scope.totalLengthSlot = "Total Length: ";
	$scope.minute = "min";
	$scope.labels = ["Presentation", "Discussion", "Group work", "Break"];
	$scope.days = Agenda.days;
	
	$scope.addDay = function(startH, startM) {
		$scope.update();
		return Agenda.addDay(startH, startM);
	};
	
	$scope.removeDay = function(indexDay) {
		return Agenda.removeDay(indexDay);
	};
	
	$scope.getData = function(indexDay) {
		var canvas = document.getElementById('myCanvas');
	      var context = canvas.getContext('2d');
	
	      // do cool things with the context
	      context.font = '40pt Calibri';
	      context.fillStyle = 'blue';
	      context.fillText('Hello World!', 150, 100);
	      console.log("here");
      
		var whole = 120;//$scope.days[indexDay].getTotalLength();
		var partPres = 10;//$scope.days[indexDay].getLengthByType("Presentation");
		var partDis = 50;//$scope.days[indexDay].getLengthByType("Discussion");
		var partGroup = 20;//$scope.days[indexDay].getLengthByType("Group work");
		var partBreak = 10;//$scope.days[indexDay].getLengthByType("Break");
		
		var perPartPres = round(partPres / whole, 2);
		var perPartDis = round(partDis / whole, 2);
		var perPartGroup = round(partGroup / whole, 2);
		var perPartBreak = round(partBreak /whole, 2);
		
		var data = [
			100, 200, 300
		];
		
		console.log(whole, partPres, partDis, partGroup, partBreak, perPartPres, perPartGroup, perPartBreak);
		return data;		
	};
	
	function round(value, decimals) {
		$scope.Math = window.Math;
    	return Number($scope.Math.round(value+'e'+decimals)+'e-'+decimals);
	}
	
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

});