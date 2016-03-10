angular.module('agendaPlanner.DayService', [])
.factory('Day', function() {
	// This is a day constructor. You can use it to create days, 
	// but there is also a specific function in the Model that adds
	// days to the model, so you don't need call this yourself.
	function Day(startH,startM) {
		this._start = startH * 60 + startM;
		this._activities = [];
	}
	
	Day.prototype = {
		constructor: Day,
		
		// sets the start time to new value
		setStart: function(startH,startM) {
			this._start = startH * 60 + startM;
		},
		
		// returns the total length of the activities in 
		// a day in minutes
		getTotalLength: function () {
			var totalLength = 0;
			$.each(this._activities,function(index,activity){
				totalLength += activity.getLength();
			});
			return totalLength;
		},
			
		// returns the string representation Hours:Minutes of 
		// the end time of the day
		getEnd: function() {
			var end = this._start + this.getTotalLength();
			var endString = "";
			
			if (Math.floor(end/60) < 10) {
				endString += 0;
			} 
			
			endString += Math.floor(end/60) + ":";
			
			if (end % 60 < 10) {
				endString += 0;
			}
			
			endString += end % 60;
			
			return endString;
		},
			
		// returns the string representation Hours:Minutes of 
		// the start time of the day
		getStart: function() {
			var start = "";
			
			if (Math.floor(this._start/60) < 10) {
				start += 0;
			} 
			
			start += Math.floor(this._start/60) + ":";
			
			if (this._start % 60 < 10) {
				start += 0;
			}
			
			start += this._start % 60;
			
			return start; 
		},
			
		// returns the length (in minutes) of activities of certain type
		getLengthByType: function (typeid) {
			var length = 0;
			$.each(this._activities,function(index,activity){
				if(activity.getTypeId() == typeid){
					length += activity.getLength();
				}
			});
			return length;
		},
			
		// adds an activity to specific position
		// if the position is not provided then it will add it to the 
		// end of the list
		_addActivity: function(activity,position){
			if(position != null){
				this._activities.splice(position,0,activity);
			} else {
				this._activities.push(activity);
			}
		},
			
		// removes an activity from specific position
		// this method will be called when needed from the model
		// don't call it directly
		_removeActivity: function(position) {
			return this._activities.splice(position,1)[0];
		},
	};
	
	return Day;	
});