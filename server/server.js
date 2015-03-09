Meteor.publish('items', function() {
    return Items.find();
});

Meteor.methods({
    'addItem': function ( itemName ) {
        var exists = Items.find({'name':itemName}).fetch().length;

        if (!exists) {
            return Items.insert({'name': itemName});
        }

        throw new Meteor.Error( 'item-exists', 'Item already exists.' );
    },
    'updateItem': function ( id , newItemName) {
        return Items.update({_id:id}, {$set:{name:newItemName}});
    },
    'deleteItem': function ( itemId ) {
        return Items.remove({ _id: itemId });
    }
});