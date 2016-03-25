angular.module('agendaPlanner.AgendaService', ['agendaPlanner.DayService', 'agendaPlanner.ActivityService'])
.factory('Agenda', function(Day, Activity) {
	
	var o = {
		days: [],
		parkedActivities: [],
		labels: ["Presentation", "Discussion", "GroupWork", "Break"]
	};
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	o.addDay = function (startH, startM, dt) {
		var day = new Day(startH, startM, dt);
		// TODO remove this line
		day._addActivity(new Activity(20, "Final Presentation", "Presentation", "final"));
		day._addActivity(new Activity(30, "Break", "Break", "break"));
		o.days.push(day);
		return day;
	};
	
	// remove a specific day to avoid an overload of days in the agenda
	o.removeDay = function(index) {
		// move the activities from the day to the parked activities
		/*if (o.days[index]._activities.length != 0) {
			for (x in o.days[index]._activities) {
				o.parkedActivities.push(o.days[index]._activities[x]);
			} 
		}*/
		
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
	
	// draw chart for the percentages of the activities per day
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
		canvas.fillStyle = "#337ab7";
		canvas.strokeStyle = "#2e6da4";
		canvas.rect(10, 0, 50, perPartPres);
		canvas.fill();
		
		//Disscussion block
		var partDis = o.days[indexDay].getLengthByType(o.labels[1]);
		var perPartDis = round(partDis / whole, 2) * 100;

		canvas.beginPath();
		canvas.fillStyle = "#5cb85c";
		canvas.strokeStyle = "#4cae4c";
		canvas.rect(10, perPartPres, 50, perPartDis);
		canvas.fill();
		
		//Group work block
		var partGroup = o.days[indexDay].getLengthByType(o.labels[2]);
		console.log(partGroup);
		var perPartGroup = round(partGroup / whole, 2) * 100;
		
		canvas.beginPath();
		canvas.fillStyle = "#d9534f";
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
