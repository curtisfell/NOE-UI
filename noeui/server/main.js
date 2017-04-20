// Server entry point, imports all server code
import { Meteor } from 'meteor/meteor';
import '/imports/startup/server';
import '/imports/startup/both';


Meteor.startup(() => {
   // code to run on server at startup
   Meteor.publish("NoeInProgress", function() {
      return Noe.find({status:{$gt:-1}});
   });
});
