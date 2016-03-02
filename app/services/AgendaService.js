angular.module('agendaPlanner.AgendaService', ['agendaPlanner.DayService'])
.factory('Agenda', function(Day) {
	
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
		o.days.push(day);
		return day;
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
	
	// moves activity between the days, or day and parked activities.
	// to park activity you need to set the new day to null
	// to move a parked activity to let's say day 0 you set oldday to null
	// and new day to 0
	o.moveActivity = function(oldday, oldposition, newday, newposition) {
		if (oldday !== null && oldday == newday) {
			o.days[oldday]._moveActivity(oldposition, newposition);
			
		} else if (oldday == null && newday == null) {
			var activity = o.removeParkedActivity(oldposition);
			o.addParkedActivity(activity, newposition);
			
		} else if (oldday == null) {
			var activity = o.removeParkedActivity(oldposition);
			o.days[newday]._addActivity(activity, newposition);
			
		} else if (newday == null) {
			var activity = o.days[oldday]._removeActivity(oldposition);
			o.addParkedActivity(activity, newposition);
			
		} else {
			var activity = o.days[oldday]._removeActivity(oldposition);
			o.days[newday]._addActivity(activity, newposition);
		}
	};

	return o;
});
