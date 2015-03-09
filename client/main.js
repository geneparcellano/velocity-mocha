Meteor.subscribe('items');
Template.test.events({
	'click button.add': function (e, tmpl) {
		e.preventDefault();

		var name = tmpl.$('.input-new-item').val();

		if (name) {
			Meteor.call('addItem', name, function(error, results) {
				if (error) {
					console.log(error);
				} else {
					console.log(results);
					tmpl.$('.input-new-item').val('');
					tmpl.$('.input-new-item').focus();
				}
			});
		}
	},
	'click button.update': function (e, tmpl) {
		e.preventDefault();

		var newName = tmpl.$('.list-item[data-id="'+this._id+'"]').children('input').val();

		if (newName) {
			Meteor.call('updateItem', this._id, newName, function(error, results) {
				if (error) {
					console.log(error);
				} else {
					console.log(results);
				}
			});
		}
	}
});

Template.test.helpers({
	items: function() {
		var getItems = Items.find();
		return getItems;
	}
});