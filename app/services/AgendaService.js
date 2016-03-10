angular.module('agendaPlanner.AgendaService', ['agendaPlanner.DayService', 'agendaPlanner.ActivityService'])
.factory('Agenda', function(Day, Activity) {
	
	var o = {
		days: [],
		parkedActivities: []
	};
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	o.addDay = function (startH, startM) {
		var day;
		if (startH) {
			day = new Day(startH, startM);
		} else {
			day = new Day(8,0);
		}
		// TODO remove this line
		day._addActivity(new Activity(20, "Final Presentation", "Presentation", "final"));
		day._addActivity(new Activity(30, "Break", "Break", "break"));
		o.days.push(day);
		return day;
	};
	
	// remove a specific day to avoid an overload of days in the agenda
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

	return o;
});
