import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor';

Meteor.methods({

   noeInsert: function(noeData) {

      console.log(noeData);
      var cb = null;
      var uuid = require('uuid');
      var noe_id = Number(noeData.noeid);
      var uuid4 = uuid();
      var url = 'http://192.168.1.171:9000/api/noe/putnoe?noeid='+noe_id+'&sagaid='+uuid4;
      var params = {
         data: {
            "noeid": noe_id,
            "sagaid": uuid4,
         }
      }

		try {

         console.log('Attempting to create workflow ' + params);
         // need to do insert first for NSB to find NOE
         Noe.insert({
            noeid: noe_id,
            sagaid: uuid4,
            description: noeData.description,
            timestamp: noeData.timestamp,
            needsapproval: noeData.needsapproval,
            approved: noeData.approved,
            needsnegotiation: noeData.needsnegotiation,
            negotiated: noeData.negotiated,
            needsoffering: noeData.needsoffering,
            offered: noeData.offered,
            status: noeData.status
         });

         HTTP.put(url, {}, function( error, response ) {
            if (response.statusCode === 200) {
               // happy
				} else {
               console.log("nsb workflow response: " + response);
               console.log("nsb workflow error: " + error);
				}
         });
         cb = { noeCreated: true, error:'' };

		} catch (e) {
         cb = { noeCreated: false, error: 'Unable to create workflow, error:   ' + e.message };
		}

      return cb;
   },

   setNoeApproved: function(noeData) {

      console.log('entered setNoeApproved');
      var cb = null;
      var url = 'http://192.168.1.171:9000/api/noe/approved?noeid='
         +noeData.noeid+'&sagaid='
         +noeData.sagaid+'&flag='
         +noeData.flag;

      try {
         console.log('Attempting to set noe approve flag ' + noeData);
         var doc = Noe.find({}).fetch();
         Noe.update(doc[0]._id, { $set : {'approved': noeData.flag}});
         HTTP.put(url, {}, function( error, response ) {
            if (response.statusCode === 200) {
               cb = { noeApprovedComplete: true, error:'' };
            } else {
               console.log("nsb set approved response: " + response);
               console.log("nsb set approved error: " + error);
               cb = { noeApprovedComplete: false, error: error };
            }
         });
      } catch (e) {
         cb = { noeApprovedComplete: false, error: 'Unable to set noe approve flag, error:   ' + e.message };
      }

      console.log(cb);
      return cb;
   },

   setNoeNegotiated: function(noeData) {

      console.log('entered setNoeNegotiated');
      var cb = null;
      var url = 'http://192.168.1.171:9000/api/noe/negotiated?noeid='
         +noeData.noeid+'&sagaid='
         +noeData.sagaid+'&flag='
         +noeData.flag;

      try {
         console.log('Attempting to set noe negotiated flag ' + noeData);
         var doc = Noe.find({}).fetch();
         Noe.update(doc[0]._id, { $set : {'negotiated': noeData.flag}});
         HTTP.put(url, {}, function( error, response ) {
            if (response.statusCode === 200) {
               cb = { noeApprovedComplete: true, error:'' };
            } else {
               console.log("nsb set negotiated response: " + response);
               console.log("nsb set negotiated error: " + error);
               cb = { noeApprovedComplete: false, error: error };
            }
         });
      } catch (e) {
         cb = { noeApprovedComplete: false, error: 'Unable to set noe negotiated flag, error:   ' + e.message };
      }

      console.log(cb);
      return cb;

   },

   setNoeOffered: function(noeData) {

      console.log('entered setNoeOffered');
      var cb = null;
      var url = 'http://192.168.1.171:9000/api/noe/offered?noeid='
         +noeData.noeid+'&sagaid='
         +noeData.sagaid+'&flag='
         +noeData.flag;

      try {
         console.log('Attempting to set noe offered flag ' + noeData);
         var doc = Noe.find({}).fetch();
         Noe.update(doc[0]._id, { $set : {'offered': noeData.flag}});
         HTTP.put(url, {}, function( error, response ) {
            if (response.statusCode === 200) {
               cb = { noeApprovedComplete: true, error:'' };
            } else {
               console.log("nsb set offered response: " + response);
               console.log("nsb set offered error: " + error);
               cb = { noeApprovedComplete: false, error: error };
            }
         });
      } catch (e) {
         cb = { noeApprovedComplete: false, error: 'Unable to set noe offered flag, error:   ' + e.message };
      }

      console.log(cb);
      return cb;

   },

});
