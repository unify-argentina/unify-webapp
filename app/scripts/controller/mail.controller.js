unifyApp.controller("MailController", function (base64, $sce, MailService, AuthenticationService) {

	var mailCtlr = this;
	mailCtlr.viewMail=null;
	
	mailCtlr.getInbox = function(){
		if(mailCtlr.inbox==null){
			MailService.getInbox(
				AuthenticationService.getUserId()
			).then(function(data) {
				if(data.errors!={}){
					mailCtlr.inbox=data.emails;
				}else{
					mailCtlr.errors=data.errors;
				}
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
				if(data.errors!={}){
					mailCtlr.draft=data.emails;
				}else{
					mailCtlr.errors=data.errors;
				}
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
				if(data.errors!={}){
					mailCtlr.sent=data.emails;
				}else{
					mailCtlr.errors=data.errors;
				}
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
				if(data.errors!={}){
					mailCtlr.trash=data.emails;
				}else{
					mailCtlr.errors=data.errors;
				}
				mailCtlr.viewList="trash";
			});
		}else{
			mailCtlr.viewList="trash";
		}
	};
});