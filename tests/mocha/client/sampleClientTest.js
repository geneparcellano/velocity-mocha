if (!(typeof MochaWeb === 'undefined')){
	MochaWeb.testOnly(function(){

		describe("Login", function() {
			it("should return undefined", function(done) {
				Meteor.loginWithPassword('admin@user.com','Password1qaz', function(error) {
					chai.assert.equal(error, undefined);
					done();
				});
			});
		});

		describe("Create Item", function() {
			it("should return ID (String)", function(done) {
				var newName = 'New Item Name';

				Meteor.call('createItem', newName, function(error, result) {
					if (error) throw error;

					var findItem = Items.find({name:newName}).count();

					chai.assert.equal(findItem, 1);
					done();
				});
			});
		});

		describe("Retrieve Item", function() {
			it("should return 1", function(done) {
				var findItem = Items.find().count();

				chai.assert.equal(findItem, 1);
				done();
			});
		});

		describe("Edit Item", function() {
			it("should return 'Edited Name'", function(done) {
				var newName = 'Edited Name';
				var id = Items.findOne()._id;

				Meteor.call('updateItem', id, newName, function(error, result) {
					if (error) throw error;

					var getName = Items.findOne({ name:newName }).name;
					chai.assert.equal(getName, newName);
					done();
				});
			});
		});

		describe("Delete Item", function() {
			it("should return 0", function(done) {
				var id = Items.findOne()._id;

				Meteor.call('deleteItem', id, function(error) {
					if (error) throw error;

					var findItem = Items.find({_id:id}).count();

					chai.assert.equal(findItem, 0);
					done();
				});

			});
		});

		describe("Logout", function() {
			it("should return undefined", function(done) {
				Meteor.logout(function(error) {
					chai.assert.equal(error, undefined);
					done();
				});
			});
		});
	});
}