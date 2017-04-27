/**
 * Created by cfell on 4/24/17.
 */
Template.NoeApproval.events({

   'submit form': function(event) {
      console.log('noe approval form submitted');
      event.preventDefault();
      var data = {
         noeid: $(event.target).find('[id=inputAppNoeId]').val(),
         sagaid: $(event.target).find('[id=inputAppSagaId]').val(),
         flag: $(event.target).find('[id=inputAppFlag]').val()
      }

      Meteor.call('setNoeApproved', data, function(error, result) {
         if (error) {
            $("#noeAppErrorsMsg").text(error.reason);
            $("#noeAppErrors").toggle(true);
            return;
         }
         if (result.noeApprovedComplete) {
            console.log('noe approval submitted');
            Router.go('WorkFlowsInProgress');
         } else {
            $("#noeAppErrorsMsg").text(result.error);
            $("#noeAppErrors").toggle(true);
         }
      });
   }

});
