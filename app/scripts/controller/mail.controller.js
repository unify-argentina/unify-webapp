unifyApp.controller("MailController", function (MailService, AuthenticationService) {

	var mailCtlr = this;

	
	mailCtlr.getInbox = function(){
		MailService.getInbox(
			AuthenticationService.getUserId()
		).then(function(data) {
			mailCtlr.inbox=data.emails;
		});
	};
	mailCtlr.getDraft = function(){
		MailService.getDraft(
			AuthenticationService.getUserId()
		).then(function(data) {
			mailCtlr.draft=data.emails;
		});
	};
	mailCtlr.getSent = function(){
		MailService.getSent(
			AuthenticationService.getUserId()
		).then(function(data) {
			mailCtlr.sent=data.emails;
		});
	};
	mailCtlr.getTrash = function(){
		MailService.getTrash(
			AuthenticationService.getUserId()
		).then(function(data) {
			mailCtlr.trash=data.emails;
		});
	};
});