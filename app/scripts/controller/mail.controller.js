unifyApp.controller("MailController", function (base64, $sce, MailService, AuthenticationService) {

	var mailCtlr = this;
	mailCtlr.viewMail=null;
	
	mailCtlr.getInbox = function(){
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
	};

	mailCtlr.getDraft = function(){
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
	};
	mailCtlr.getSent = function(){
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
	};
	mailCtlr.getTrash = function(){
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

	mailCtlr.sendMail = function(mail){
		mailCtlr.writeMail.user_id = AuthenticationService.getUserId();
		mailCtlr.writeMail.to = mailCtlr.writeMail.to.split(",");
		if(mailCtlr.writeMail.cc){
			mailCtlr.writeMail.cc = mailCtlr.writeMail.cc.split(",");
		}else{
			mailCtlr.writeMail.cc =[];
		}
		if(mailCtlr.writeMail.cco){
			mailCtlr.writeMail.cco = mailCtlr.writeMail.cco.split(",");
		}else{
			mailCtlr.writeMail.cco =[];
		}
		MailService.sendMail(
			mailCtlr.writeMail
		).then(function(data) {
			mailCtlr.writeMail="";
		});
	}

	mailCtlr.answerMail = function(mail){
		var from = mail.from.match(/<(.*?)>/g).map(function(val){
			console.log("VAL:"+val);
		   return val.replace(/</g,'').replace(/>/g,'');
		});
		mailCtlr.viewMail=null;
		mailCtlr.writeMail={};
		mailCtlr.writeMail.to=from.toString();
		mailCtlr.writeMail.subject="RE: "+mail.subject;
	}

	mailCtlr.answerAllMail = function(mail, myAddress){
		mailCtlr.viewMail=null;
		mailCtlr.writeMail={};
		
		var from = mail.from.match(/<(.*?)>/g).map(function(val){
			console.log("VAL:"+val);
		   return val.replace(/</g,'').replace(/>/g,'');
		});
		mailCtlr.writeMail.to=from.toString();
		
		if(mail.cc!=[""]){
			var cc = mail.cc.toString().match(/<(.*?)>/g).map(function(val){
				console.log("VAL:"+val);
			   return val.replace(/</g,'').replace(/>/g,'');
			});
			var to = mail.to.toString().match(/<(.*?)>/g).map(function(val){
				console.log("VAL:"+val);
			   return val.replace(/</g,'').replace(/>/g,'');
			});
			cc=to.concat(cc);
			_.remove(cc, function(mail) {
				return mail == myAddress;
			});
			mailCtlr.writeMail.cc=cc.toString();
		}
		mailCtlr.writeMail.subject="RE: "+mail.subject;
	}
	mailCtlr.getInbox();
});