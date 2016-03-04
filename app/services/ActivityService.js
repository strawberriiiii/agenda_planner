//Note about this: we can either choose to have color handling in here
//or elsewhere; since color is a more visual thing, I think it's better to handle it
//elsewhere, but it's something to keep in mind
angular.module('agendaPlanner.ActivityService', [])
.factory('Activity', function() {
	
	//Activity constructor
	//Currently I'm working under the assumption that the user can input
	//hours and minutes when creating the activity, but this is easily changed
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
		//May not need this function
		getStringLength: function() {
			return Math.floor(this._length / 60 + "hours and " + this._length % 60 + " minutes");
		},
		
		//Modify the type of activity
		//Do we want this to be an integer or a string?
		setTypeId: function(newType) {
			this._type = newType;
		},
		
		getTypeId: function() {
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