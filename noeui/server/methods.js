import { HTTP } from 'meteor/http'
Meteor.methods({

   noeInsert: function(noeData) {
      console.log('noeInsert called');
      console.log(noeData);

      var cb = null;

      console.log(Noe);
		try {
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

         console.log('Attempting to create workflow ' + params);
         //HTTP.put(url, params, function( error, response ) {
         HTTP.put(url, {}, function( error, response ) {
				// don't insert before getting response back from NSB
            if (response.statusCode === 200) {
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

});
