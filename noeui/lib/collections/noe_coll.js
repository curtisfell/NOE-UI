Noe = new Meteor.Collection('noe');

NoeSchema = new SimpleSchema({
	_id : {
		type: String,
		label: 'id',
      optional: true
	},
	noeid : {
		type: Number,
		label: 'NoeId'
	},
	sagaid : {
		type: String,
		label: 'SagaId',
      optional: true
	},
	description : {
		type: String,
		label: 'Description',
		optional: true
	},
	timestamp : {
		type: Date,
        label: 'Timestamp',
		optional: true
	},
	needsapproval : {
		type: Number,
        label: 'NeedsApproval'
	},
    approved : {
		type: Number,
        label: 'Approved'
	},
    needsnegotiation : {
		type: Number,
        label: 'NeedsNegotiation'
	},
    negotiated : {
		type: Number,
        label: 'Negotiated'
	},
    needsoffering : {
		type: Number,
        label: 'Needsoffering'
	},
    offered : {
		type: Number,
        label: 'Offered'
	},
    status : {
		type: Number,
        label: 'Status'
	},


});
Noe.attachSchema(NoeSchema);

/*
if (Meteor.isServer) {
	Meteor.publish("NoeInProgress", function() {
		return Noe.find({status:{$gt:-1}});
	});	
}
*/