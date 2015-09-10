unifyApp.controller("MailController", function (base64, $sce, MailService, AuthenticationService) {

	var mailCtlr = this;
	mailCtlr.viewMail=null;
	
	mailCtlr.getInbox = function(){
		if(mailCtlr.inbox==null){
			MailService.getInbox(
				AuthenticationService.getUserId()
			).then(function(data) {
				mailCtlr.inbox=data.emails;
				mailCtlr.viewList="inbox";
			});
		}else{
			mailCtlr.viewList="inbox";
		}
	};

	mailCtlr.getMail = function(mail){
		var html=mail.html;
	    html = html.replace(/_/g,"/");
		html = html.replace(/-/g,"+");
		mailCtlr.decodedHtml = base64.decode(html);
		mailCtlr.mailHtml= $sce.trustAsHtml(mailCtlr.decodedHtml);
		mailCtlr.viewMail= mail;
		console.log(html);
	}

	mailCtlr.getDraft = function(){
		if(mailCtlr.draft==null){
			MailService.getDraft(
				AuthenticationService.getUserId()
			).then(function(data) {
				mailCtlr.draft=data.emails;
				mailCtlr.viewList="draft";
			});
		}else{
			mailCtlr.viewList="draft";
		}
	};
	mailCtlr.getSent = function(){
		if(mailCtlr.sent==null){
			MailService.getSent(
				AuthenticationService.getUserId()
			).then(function(data) {
				mailCtlr.sent=data.emails;
				mailCtlr.viewList="sent";
			});
		}else{
			mailCtlr.viewList="sent";
		}
	};
	mailCtlr.getTrash = function(){
		if(mailCtlr.trash==null){
			MailService.getTrash(
				AuthenticationService.getUserId()
			).then(function(data) {
				mailCtlr.trash=data.emails;
				mailCtlr.viewList="trash";
			});
		}else{
			mailCtlr.viewList="trash";
		}
	};
});