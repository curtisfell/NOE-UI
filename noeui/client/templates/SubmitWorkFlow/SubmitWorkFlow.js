/**
 * Created by cfell on 4/19/17.
 */
Template.SubmitWorkFlow.events({

   'submit form': function(event) {
      console.log('form submitted');
      event.preventDefault();


      var newNoeData = {
         noeid: $(event.target).find('[id=inputNoeId]').val(),
         description: $(event.target).find('[id=inputDescription]').val(),
         timestamp: Date.now(),
         needsapproval: 1,
         approved: 0,
         needsnegotiation: 1,
         negotiated: 0,
         needsoffering: 1,
         offered: 0,
         status: 0
      }
      console.log('noe data collected');
      //console.log(newNoeData);

      Meteor.call('noeInsert', newNoeData, function(error, result) {
         // display the error to the user and abort

         if (error) {
            $("#noeErrorsMsg").text(error.reason);
            $("#noeErrors").toggle(true);
            return;
         }
         if (result.noeCreated) {
            console.log('noe created');
            /*
            Session.set("id", result.userId);
            Session.set("user", acct.username);
            Session.set("email", acct.profile.email);
            */
            Router.go('WorkFlowsInProgress');
         } else {
            $("#noeErrorsMsg").text(result.error);
            $("#noeErrors").toggle(true);
         }
      });
   }

});
