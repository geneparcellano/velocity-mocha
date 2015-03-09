Meteor.subscribe('items');
Template.test.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();

		var name = tmpl.$('.input-new-item').val();

		// Delete Error Message
		tmpl.$('p.error').fadeOut().remove();

		if (name) {
			Meteor.call('addItem', name, function(error, results) {
				if (error) {
					console.log(error);

					// Show Error
					tmpl.$('form').append('<p class="error" style="color:red">'+error.reason+'</p>');
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
	},
	'click button.delete': function (e, tmpl) {
		e.preventDefault();

		Meteor.call('deleteItem', this._id, function(error, results) {
			if (error) {
				console.log(error);
			} else {
				console.log(results);
			}
		});
	}
});

Template.test.helpers({
	items: function() {
		var getItems = Items.find();
		return getItems;
	}
});