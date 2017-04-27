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
         needsapproval: -1,
         approved: -1,
         needsnegotiation: -1,
         negotiated: -1,
         needsoffering: -1,
         offered: -1,
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
            Router.go('WorkFlowsInProgress');
         } else {
            $("#noeErrorsMsg").text(result.error);
            $("#noeErrors").toggle(true);
         }
      });
   }

});
