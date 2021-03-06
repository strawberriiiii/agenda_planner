angular.module('agendaPlanner.ActivityService', [])
.factory('Activity', function() {
	
	//Activity constructor
	function Activity(minutes, name, type, description) {
		this._length = minutes;
		this._name = name;
		this._type = type;
		this._description = description;
	}
	
	Activity.prototype = {
		
		constructor: Activity,
		
		//Modify the length of an activity
		setLength: function(newMinutes) {
			this._length = newMinutes;
		},
		
		//Retrieve info about length of an activity
		getLength: function() {
			return this._length;
		},
		
		//Retrieve info about the length of an activity (in string format)
		getStringLength: function() {
			var lengthString = "";
			
			lengthString += Math.floor(this._length/60) + " h ";
			
			if (this._length % 60 < 10) {
				lengthString += 0;
			}
			
			lengthString += this._length % 60 + " min";
			
			return lengthString;
		},
		
		//Modify the type of activity
		setTypeId: function(newType) {
			this._type = newType;
		},
		
		getTypeId: function() {
			return this._type;
		},

		getModifiedTypeId: function() {
		    if (this._type === 'GroupWork') {
		        return "Group Work";
		    }
		    return this._type;
		},
		
		//Modifies the name of the activity
		setName: function(newName) {
			this._name = newName;
		},
		
		//Retrieves the name of the activity
		getName: function() {
			return this._name;
		},
		
		//Edits description of activity
		setDescription: function(newDescription) {
			this._description = newDescription;
		},
		
		//Retrieves the description of the activity
		getDescription: function() {
			return this._description;
		}
		
	};
	
	return Activity;
	
});