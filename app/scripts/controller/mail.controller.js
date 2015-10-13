unifyApp.controller("MailController", function (base64, $sce, MailService, AuthenticationService) {

	var mailCtlr = this;
	mailCtlr.viewMail=null;

	mailCtlr.currentPage = 1;
	mailCtlr.pageSize = 25;


	mailCtlr.getInbox = function(){
		mailCtlr.viewMail=null;
		mailCtlr.viewList="inbox";
		mailCtlr.currentPage = 1;
		MailService.getInbox(
			AuthenticationService.getUserId()
		).then(function(data) {
			mailCtlr.inbox=data.emails;
			_(mailCtlr.inbox.list).forEach(function(mail) {
				if(moment.unix(mail.date) > moment().subtract(1, 'days')){
					mail.dateFormated=moment.unix(mail.date).format("hh:mm a");
				}else{
					mail.dateFormated=moment.unix(mail.date).format("MMM DD YY");
				}
			}).value();	
			mailCtlr.email_ids=[];
		});
	};

	mailCtlr.getDraft = function(){	
		mailCtlr.viewMail=null;
		mailCtlr.viewList="draft";
		mailCtlr.currentPage = 1;
		MailService.getDraft(
			AuthenticationService.getUserId()
		).then(function(data) {
			mailCtlr.draft=data.emails;
			_(mailCtlr.draft.list).forEach(function(mail) {
				if(moment.unix(mail.date) > moment().subtract(1, 'days')){
					mail.dateFormated=moment.unix(mail.date).format("hh:mm a");
				}else{
					mail.dateFormated=moment.unix(mail.date).format("MMM DD YY");
				}
			}).value();	
			mailCtlr.email_ids=[];
		});
	};

	mailCtlr.getSent = function(){
		mailCtlr.viewMail=null;
		mailCtlr.viewList="sent";
		mailCtlr.currentPage = 1;
		MailService.getSent(
			AuthenticationService.getUserId()
		).then(function(data) {
			mailCtlr.sent=data.emails;
			_(mailCtlr.sent.list).forEach(function(mail) {
				if(moment.unix(mail.date) > moment().subtract(1, 'days')){
					mail.dateFormated=moment.unix(mail.date).format("hh:mm a");
				}else{
					mail.dateFormated=moment.unix(mail.date).format("MMM DD YY");
				}
			}).value();	
			mailCtlr.email_ids=[];
		});
	};

	mailCtlr.getTrash = function(){
		mailCtlr.viewMail=null;
		mailCtlr.viewList="trash";
		mailCtlr.currentPage = 1;
		MailService.getTrash(
			AuthenticationService.getUserId()
		).then(function(data) {
			mailCtlr.trash=data.emails;
			_(mailCtlr.trash.list).forEach(function(mail) {
				if(moment.unix(mail.date) > moment().subtract(1, 'days')){
					mail.dateFormated=moment.unix(mail.date).format("hh:mm a");
				}else{
					mail.dateFormated=moment.unix(mail.date).format("MMM DD YY");
				}
			}).value();	
			mailCtlr.email_ids=[];
		});
	};

	mailCtlr.markAsSeen = function(){
		MailService.markAsSeen(
			AuthenticationService.getUserId(), mailCtlr.email_ids
		).then(function(data) {
			_(mailCtlr.inbox.list).forEach(function(mail) {
				if(_.includes(mailCtlr.email_ids,mail.id)){
					mail.unread=false;
				}
				mail.checked=false;
			}).value();	
			mailCtlr.email_ids=[];
		});
	};

	mailCtlr.markAsUnseen = function(){
		MailService.markAsUnseen(
			AuthenticationService.getUserId(), mailCtlr.email_ids
		).then(function() {
			_(mailCtlr.inbox.list).forEach(function(mail) {
				if(_.includes(mailCtlr.email_ids,mail.id)){
					mail.unread=true;
				}
				mail.checked=false;
			}).value();	
			mailCtlr.email_ids=[];
		});
	};
	
	mailCtlr.moveToTrashMail = function(mail){
		mailCtlr.email_ids=[];
		mailCtlr.email_ids.push(mail.id);
		mailCtlr.moveToTrash();
	};

	mailCtlr.moveToTrash = function(){
		MailService.moveToTrash(
			AuthenticationService.getUserId(), mailCtlr.email_ids
		).then(function(data) {
			_.remove(mailCtlr.inbox.list, function(mail) {
				return _.includes(mailCtlr.email_ids,mail.id);
			});
			mailCtlr.email_ids=[];
		});
	};

	mailCtlr.deleteMail = function(mail_id){
		MailService.deleteMail(
			AuthenticationService.getUserId(), mail_id
		).then(function(data) {
			_.pull(mailCtlr.email_ids,mail_id);
			_.remove(mailCtlr.trash.list, function(mail) {
				return mail_id==mail.id;
			});
		});
	};

	mailCtlr.moveToInbox = function(){
		MailService.moveToInbox(
			AuthenticationService.getUserId(), mailCtlr.email_ids
		).then(function(data) {
			_.remove(mailCtlr.trash.list, function(mail) {
				return _.includes(mailCtlr.email_ids,mail.id);
			});
			mailCtlr.email_ids=[];
		});
	};

	mailCtlr.check = function(mail){
		if(mail.checked){
			mailCtlr.email_ids.push(mail.id);
		}else{
			_.pull(mailCtlr.email_ids,mail.id);
		}
	};

	mailCtlr.getMail = function(mail){
		mailCtlr.currentPage = 1;
		var html=mail.html;
	    html = html.replace(/_/g,"/");
		html = html.replace(/-/g,"+");
		mailCtlr.decodedHtml = base64.decode(html);
		console.log(mailCtlr.decodedHtml);
		//mailCtlr.decodedHtml=mailCtlr.decodedHtml.replace(/(^|\s)(<style [a-zA-Z\-\"\”\/=]*>(^|\s|.)*<\/style>)/img, '/* $1 */');
		
		console.log(mailCtlr.decodedHtml);
		mailCtlr.mailHtml= $sce.trustAsHtml(mailCtlr.decodedHtml);
		mailCtlr.viewMail= mail;
		_(mailCtlr.inbox.list).forEach(function(mail) {
			mail.checked=false;
		}).value();	
		mailCtlr.email_ids=[];
		if(mail.unread){
			mailCtlr.email_ids.push(mail.id);
			mailCtlr.markAsSeen();
		}
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
		if(!mailCtlr.writeMail.subject){
			mailCtlr.writeMail.subject="Sin Asunto";
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
		   return val.replace(/</g,'').replace(/>/g,'');
		});
		mailCtlr.writeMail.to=from.toString();
		
		if(mail.cc!=[""]){
			var cc = mail.cc.toString().match(/<(.*?)>/g).map(function(val){
			   return val.replace(/</g,'').replace(/>/g,'');
			});
			var to = mail.to.toString().match(/<(.*?)>/g).map(function(val){
			   return val.replace(/</g,'').replace(/>/g,'');
			});
			cc=to.concat(cc);
			_.remove(cc, function(mail) {
				return mail == myAddress;
			});
			mailCtlr.writeMail.cc=cc.toString();
			mailCtlr.writeMail.hasCC=true;
		}
		mailCtlr.writeMail.subject="RE: "+mail.subject;
	}
	mailCtlr.getInbox();
});