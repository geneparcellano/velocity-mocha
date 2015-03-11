Meteor.publish('items', function() {
    return Items.find();
});

Meteor.methods({
    'createItem': function ( itemName ) {
        // Authorize User
        if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
            throw new Meteor.Error(403, "Not authorized");
        }
        
        var exists = Items.find({'name':itemName}).fetch().length;

        if (exists) {
            throw new Meteor.Error( 'item-exists', 'Item already exists.' );
        }

        return Items.insert({'name': itemName});
    },
    'updateItem': function ( id , newItemName) {
        return Items.update({_id:id}, {$set:{name:newItemName}});
    },
    'deleteItem': function ( itemId ) {
        return Items.remove({ _id: itemId });
    }
});


