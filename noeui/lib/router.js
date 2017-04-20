Router.configure({
        layoutTemplate: 'AppLayout',
        loadingTemplate: 'loading',
});

Router.route('/', {
		name: 'Home',
		action:function() {
			this.render('Home');
		}
});


Router.route('/submit-workflow', {
   name: 'SubmitWorkFlow',
   action: function() {
      this.render('SubmitWorkFlow');
   }
});

Router.route('/workflows-in-progress', {
   name: 'WorkFlowsInProgress',
   waitOn: function() {
   	return [ Meteor.subscribe("NoeInProgress") ];
	},
	data: function() {
   	if (this.ready()) {
   		return { NoeInProgress: Noe.find({},{sort:{'timestamp':1}})}
		}
	},
   action: function() {
      this.render('WorkFlowsInProgress');
   }
});
