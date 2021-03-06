angular.module('agendaPlanner.AgendaService', ['agendaPlanner.DayService', 'agendaPlanner.ActivityService'])
.factory('Agenda', function(Day, Activity) {
	
	var o = {
		days: [],
		parkedActivities: [],
		labels: ["Presentation", "Discussion", "GroupWork", "Break"]
	};
	
	/**
	 * Add a new day. 
	 * If startH and startM (start hours and minutes) are not provided,
	 * it will set the default start of the day to 08:00
	 */
	o.addDay = function (startH, startM, dt) {
		var day = new Day(startH, startM, dt);
		o.days.push(day);
		return day;
	};
	
	/**
	 * Remove a specific day to avoid an overload of days in the agenda
	 */
	o.removeDay = function(index) {		
		o.days.splice(index, 1);
	};
	
	//Create the activity
	o.createActivity = function(minutes, name, type, description) {
		var activity = new Activity(minutes, name, type, description);
		o.addParkedActivity(activity, null);
		o.parkedActivitiesString();
		console.log(o.parkedActivities);
	};
	
	o.parkedActivitiesString = function() {
		return "{day : " + o.parkedActivities + "}";
	};
	
	// add an activity to model
	o.addActivity = function (activity, day, position) {
		if (day != null) {
			o.days[day]._addActivity(activity, position);
		} else {
			if (position != null) {
				o.parkedActivities.splice(position, 0, activity);
			}
			else o.parkedActivities.push(activity);
		}
	};
	
	// add an activity to parked activities
	o.addParkedActivity = function(activity, position){
		o.addActivity(activity, null, position);
	};
	
	// remove an activity on provided position from parked activites 
	o.removeParkedActivity = function(position) {
		act = o.parkedActivities.splice(position, 1)[0];
		return act;
	};
	
	/**
	 * Draw chart for the percentages of the activities per day
	 */
	o.drawGraphic = function(indexDay) {
		var whole = o.days[indexDay].getTotalLength();
		var allCanvases = document.getElementsByTagName('canvas');
		var canvas;
		for (var i = 0; i < allCanvases.length; i++) {
		    if (i === indexDay) {
		        canvas = allCanvases[i].getContext("2d");
		    }
		}

		
		//Presentation block
		var partPres = o.days[indexDay].getLengthByType(o.labels[0]);
		var perPartPres = round(partPres / whole, 2) * 100;
		
		canvas.beginPath();
		canvas.fillStyle = "#4c91cd";
		canvas.strokeStyle = "#2e6da4";
		canvas.rect(10, 0, 50, perPartPres);
		canvas.fill();
		
		//Disscussion block
		var partDis = o.days[indexDay].getLengthByType(o.labels[1]);
		var perPartDis = round(partDis / whole, 2) * 100;

		canvas.beginPath();
		canvas.fillStyle = "#0d7f43";
		canvas.strokeStyle = "#18e779";
		canvas.rect(10, perPartPres, 50, perPartDis);
		canvas.fill();
		
		//Group work block
		var partGroup = o.days[indexDay].getLengthByType(o.labels[2]);
		console.log(partGroup);
		var perPartGroup = round(partGroup / whole, 2) * 100;
		
		canvas.beginPath();
		canvas.fillStyle = "#b3003b";
		canvas.strokeStyle = "#d43f3a";
		canvas.rect(10, perPartPres + perPartDis, 50, perPartGroup);
		canvas.fill();
				
		//Break block
		var partBreak = o.days[indexDay].getLengthByType(o.labels[3]);
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
			canvas.lineWidth = 2;
			canvas.stroke();
		}
				
		console.log(whole, perPartPres, perPartDis, perPartGroup, perPartBreak);
	};
	
	function round(value, decimals) {
		var math = window.Math;
    	return Number(math.round(value+'e'+decimals)+'e-'+decimals);
	}

	o.clearCanvas = function(indexDay) {
		var allCanvases = document.getElementsByTagName('canvas');
		var canvas;
		for (var i = 0; i < allCanvases.length; i++) {
		    if (i === indexDay) {
		        canvas = allCanvases[i].getContext("2d");
		    }
		}
		
		canvas.clearRect(0, 0, 70, 100);
	};

	o.deleteActivityFromDay = function(indexDay, indexActivity) {
	    o.days[indexDay]._removeActivity(indexActivity);
	};

	return o;
});
