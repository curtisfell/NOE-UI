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

Router.route('/noe-approval', {
   name: 'NoeApproval',
   data: function() {
      return { 'noeid' : this.params.query.noeid, 'sagaid' : this.params.query.sagaid, 'flag' : this.params.query.flag }
   },
   action: function() {
      this.render('NoeApproval');
   }
});

Router.route('/noe-negotiation', {
   name: 'NoeNegotiation',
   data: function() {
      return { 'noeid' : this.params.query.noeid, 'sagaid' : this.params.query.sagaid, 'flag' : this.params.query.flag }
   },
   action: function() {
      this.render('NoeNegotiation');
   }
});

Router.route('/noe-offering', {
   name: 'NoeOffering',
   data: function() {
      return { 'noeid' : this.params.query.noeid, 'sagaid' : this.params.query.sagaid, 'flag' : this.params.query.flag }
   },
   action: function() {
      this.render('NoeOffering');
   }
});


