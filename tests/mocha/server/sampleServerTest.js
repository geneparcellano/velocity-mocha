if (!(typeof MochaWeb === 'undefined')){
	MochaWeb.testOnly(function(){
		var id;

		describe("Create Item", function() {
			it("should return ID (String)", function(done) {
				Meteor.call('addItem', 'New Item Name', function(error, result) {
					if (error) throw error
					id = result;
				});

				chai.assert.typeOf(id, 'string');
				return done();
			});
		});

		describe("Retrieve Item", function() {
			it("should return 1", function(done) {
				var findItem = Items.find({_id:id}).count();

				chai.assert.equal(findItem, 1);
				return done();
			});
		});

		describe("Edit Item", function() {
			it("should return 'Edited Name'", function(done) {
				var newName = 'Edited Name';

				Meteor.call('updateItem', id, newName, function(error, result) {
					if (error) throw error
				});

				var getName = Items.findOne({_id:id}).name;

				chai.assert.equal(getName, newName);
				return done();
			});
		});

		describe("Delete Item", function() {
			it("should return 0", function(done) {
				Meteor.call('deleteItem', id, function(error) {
					if (error) throw error;
				});

				var findItem = Items.find({_id:id}).count();

				chai.assert.equal(findItem, 0);
				return done();
			});
		});
	});
}
