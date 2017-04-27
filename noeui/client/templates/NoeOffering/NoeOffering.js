/**
 * Created by cfell on 4/24/17.
 */
Template.NoeOffering.events({

   'submit form': function(event) {
      console.log('noe offering form submitted');
      event.preventDefault();

      var newNoeData = {
         noeid: $(event.target).find('[id=inputNoeId]').val(),
         sagaid: $(event.target).find('[id=inputSagaId]').val(),
         flag: $(event.target).find('[id=inputFlag]').val()
      }
      console.log('noe data collected: ' + newNoeData);

      Meteor.call('setNoeOffered', newNoeData, function(error, result) {
         if (error) {
            $("#noeErrorsMsg").text(error.reason);
            $("#noeErrors").toggle(true);
            return;
         }
         if (result.noeOfferedComplete) {
            console.log('noe offering submitted');
            Router.go('WorkFlowsInProgress');
         } else {
            $("#noeErrorsMsg").text(result.error);
            $("#noeErrors").toggle(true);
         }
      });
   }

});