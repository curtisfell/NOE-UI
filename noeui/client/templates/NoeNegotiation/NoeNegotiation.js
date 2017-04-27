/**
 * Created by cfell on 4/24/17.
 */
Template.NoeNegotiation.events({

   'submit form': function(event) {
      console.log('noe negotiation form submitted');
      event.preventDefault();

      var newNoeData = {
         noeid: $(event.target).find('[id=inputNoeId]').val(),
         sagaid: $(event.target).find('[id=inputSagaId]').val(),
         flag: $(event.target).find('[id=inputFlag]').val()
      }
      console.log('noe data collected: ' + newNoeData);

      Meteor.call('setNoeNegotiated', newNoeData, function(error, result) {
         if (error) {
            $("#noeErrorsMsg").text(error.reason);
            $("#noeErrors").toggle(true);
            return;
         }
         if (result.noeNegotiatedComplete) {
            console.log('noe negotiation submitted');
            Router.go('WorkFlowsInProgress');
         } else {
            $("#noeErrorsMsg").text(result.error);
            $("#noeErrors").toggle(true);
         }
      });
   }

});