"use strict";var unifyApp=angular.module("unifyApp",["angular-loading-bar","ngVideo","ngResource","ngAnimate","ui.router","ui.bootstrap","config","pascalprecht.translate","satellizer","duScroll","ab-base64","angularMoment"]).config(["cfpLoadingBarProvider",function(cfpLoadingBarProvider){cfpLoadingBarProvider.includeSpinner=!1}]);unifyApp.constant("angularMomentConfig",{preprocess:"unix"}),unifyApp.run(function(amMoment){amMoment.changeLocale("es")}),angular.module("unifyApp").config(function($authProvider,ENV){$authProvider.baseUrl=ENV.apiEndPoint,$authProvider.unlinkUrl=ENV.unlinkUrl,$authProvider.unlinkMethod=ENV.unlinkMethod,$authProvider.facebook({clientId:"805638479520745",url:"/auth/facebook",scope:["email","user_about_me","user_friends","user_likes","user_photos","user_posts","user_status","user_videos"]}),$authProvider.google({clientId:"79996335280-gc0hh1efoo859u1lqaqct2v3u1larsrj.apps.googleusercontent.com",url:"/auth/google",optionalUrlParams:["access_type","approval_prompt"],accessType:"offline",approvalPromt:"force",scope:["profile","email","https://www.googleapis.com/auth/contacts.readonly","https://mail.google.com/","https://www.googleapis.com/auth/gmail.labels","https://www.googleapis.com/auth/gmail.compose"]}),$authProvider.twitter({url:"/auth/twitter"}),$authProvider.oauth2({name:"instagram",url:"/auth/instagram",redirectUri:window.location.origin,clientId:"ad148c3db70f4b7188a0e30c1b74ea06",requiredUrlParams:["scope"],scope:["likes"],scopeDelimiter:"+",authorizationEndpoint:"https://api.instagram.com/oauth/authorize"})}),angular.module("config",[]).constant("ENV",{apiEndPoint:"http://api-test-unify.herokuapp.com",name:"production",storageUserId:"unifyUserId",storageMainCircleId:"unifyMainCircleId",unlinkMethod:"delete",unlinkUrl:"/auth/"}),unifyApp.controller("CircleController",function($scope,video,CircleService,AuthenticationService){var circleCtrl=this;circleCtrl.circle_id=AuthenticationService.getMainCircleId(),circleCtrl.mainCircle_id=AuthenticationService.getMainCircleId(),circleCtrl.getCircle=function(){circleCtrl.circle=null,CircleService.circle.get({user_id:AuthenticationService.getUserId(),circle_id:circleCtrl.circle_id},function(response){if(circleCtrl.circle=response.circle,!circleCtrl.circle.picture)if(circleCtrl.circle.contacts){if(circleCtrl.contactSize=_.size(circleCtrl.circle.contacts),circleCtrl.imagesCircle={},circleCtrl.contactSize>0){circleCtrl.contactSize<4?circleCtrl.contactSize:4;circleCtrl.imagesCircle=_.sample(circleCtrl.circle.contacts,4)}}else circleCtrl.contactSize=0})},circleCtrl.deleteCircle=function(){var parent=circleCtrl.circle.parent;CircleService.circle["delete"]({user_id:AuthenticationService.getUserId(),circle_id:circleCtrl.circle_id},function(response){circleCtrl.goToCircle(parent)})},circleCtrl.create=function(){circleCtrl.createCircle=!0,circleCtrl.newCircle={}},circleCtrl.edit=function(){circleCtrl.editingCircle=!0,circleCtrl.editCircle=angular.copy(circleCtrl.circle)},circleCtrl.updateCircle=function(){circleCtrl.editCircle.user_id=AuthenticationService.getUserId(),CircleService.updateCircle(circleCtrl.editCircle).then(function(data){circleCtrl.circle=circleCtrl.editCircle,circleCtrl.editingCircle=!1})},circleCtrl.saveCircle=function(){circleCtrl.newCircle.user_id=AuthenticationService.getUserId(),circleCtrl.newCircle.parent=circleCtrl.circle_id,CircleService.saveCircle(circleCtrl.newCircle).then(function(data){circleCtrl.getCircleTree(),circleCtrl.createCircle=!1})},circleCtrl.cancelCircle=function(){circleCtrl.createCircle=!1,circleCtrl.newCircle={},circleCtrl.editingCircle=!1,circleCtrl.editCircle=circleCtrl.circle},circleCtrl.getCircleTree=function(){CircleService.getCircleTree(AuthenticationService.getUserId(),circleCtrl.circle_id).then(function(data){circleCtrl.tree=data.tree[0]})},circleCtrl.getCircleFeed=function(){circleCtrl.feed=null,CircleService.getCircleFeed(AuthenticationService.getUserId(),circleCtrl.circle_id).then(function(data){data.circle_id==circleCtrl.circle_id&&(circleCtrl.feed=data.media)})},circleCtrl.goToCircle=function(circle_id){circleCtrl.circle_id=circle_id,circleCtrl.cancelContact(),circleCtrl.cancelCircle(),circleCtrl.getCircle(),circleCtrl.getCircleTree(),circleCtrl.getCircleFeed()},circleCtrl.goToParent=function(){circleCtrl.circle_id=circleCtrl.circle.parent,circleCtrl.cancelContact(),circleCtrl.cancelCircle(),circleCtrl.getCircle(),circleCtrl.getCircleTree(),circleCtrl.getCircleFeed()},circleCtrl.createContact=function(){circleCtrl.editContact=!0,circleCtrl.contact_id=null},circleCtrl.closeContact=function(){circleCtrl.editContact=!1,circleCtrl.getCircle(),circleCtrl.getCircleTree(),circleCtrl.getCircleFeed()},circleCtrl.cancelContact=function(){circleCtrl.editContact=!1},circleCtrl.getCircleTree(),circleCtrl.getCircle(),circleCtrl.getCircleFeed()}),unifyApp.controller("ComingSoonController",function($scope,$interval,$document){function bubbles(){for(var min_bubble_count=40,max_bubble_count=80,min_bubble_size=3,max_bubble_size=12,bubbleCount=min_bubble_count+Math.floor(Math.random()*(max_bubble_count+1)),i=0;bubbleCount>i;i++)$bubbles.append('<div class="bubble-container"><div class="bubble"></div></div>');$bubbles.find(".bubble-container").each(function(){var pos_rand=Math.floor(101*Math.random()),size_rand=min_bubble_size+Math.floor(Math.random()*(max_bubble_size+1)),delay_rand=Math.floor(11*Math.random()),speed_rand=6+Math.floor(26*Math.random()),blur_rand=Math.floor(3*Math.random()),$this=$(this);$this.css({left:pos_rand+"%","-webkit-animation-duration":speed_rand+"s","-moz-animation-duration":speed_rand+"s","-ms-animation-duration":speed_rand+"s","animation-duration":speed_rand+"s","-webkit-animation-delay":delay_rand+"s","-moz-animation-delay":delay_rand+"s","-ms-animation-delay":delay_rand+"s","animation-delay":delay_rand+"s","-webkit-filter":"blur("+blur_rand+"px)","-moz-filter":"blur("+blur_rand+"px)","-ms-filter":"blur("+blur_rand+"px)",filter:"blur("+blur_rand+"px)"}),$this.children(".bubble").css({width:size_rand+"px",height:size_rand+"px"})})}function drawLight(ctx,side,cx,cy){var h=side*(Math.sqrt(3)/2);ctx.strokeStyle="#fff",ctx.save(),ctx.translate(cx,cy),ctx.beginPath(),ctx.moveTo(side,-h),ctx.lineTo(-side,h/2),ctx.lineTo(side/2,h/2),ctx.lineTo(side,-h),ctx.fillStyle="white",ctx.fill(),ctx.stroke(),ctx.closePath(),ctx.save()}var csctrl=this;csctrl.toTheTop=function(){$document.scrollTopAnimated(0,1e3).then(function(){})};for(var ocean=angular.element("#ocean"),waveWidth=10,waveCount=Math.floor(window.innerWidth/waveWidth),docFrag=document.createDocumentFragment(),i=0;waveCount>i;i++){var wave=document.createElement("div");wave.className+=" wave",docFrag.appendChild(wave),wave.style.left=i*waveWidth+"px",wave.style.webkitAnimationDelay=i/100+"s"}ocean.append(docFrag);var $bubbles=angular.element(".bubbles");$(".bubble-toggle").click(function(){return $bubbles.is(":empty")?(bubbles(),$bubbles.show(),$(this).text("Bubbles Off")):($bubbles.fadeOut(function(){$(this).empty()}),$(this).text("Bubbles On")),!1}),bubbles(),$interval(function(){csctrl.oneDay=864e5,csctrl.date1=new Date,csctrl.date2=new Date("11/01/2015"),csctrl.difference=Math.abs((csctrl.date1.getTime()-csctrl.date2.getTime())/csctrl.oneDay),csctrl.days=Math.trunc(csctrl.difference),csctrl.diffHours=24*(csctrl.difference-csctrl.days),csctrl.hours=Math.trunc(csctrl.diffHours),csctrl.diffMinutes=60*(csctrl.diffHours-csctrl.hours),csctrl.minutes=Math.trunc(csctrl.diffMinutes),csctrl.diffSeconds=60*(csctrl.diffMinutes-csctrl.minutes),csctrl.seconds=Math.trunc(csctrl.diffSeconds)},1e3);var canvas=document.getElementById("light"),ctx=canvas.getContext("2d");drawLight(ctx,canvas.width/2,canvas.width/2,canvas.height/2)}),unifyApp.controller("ContactController",function($scope,$state,$interval,ContactService,AuthenticationService){var contactCtrl=this;contactCtrl.getContact=function(contact_id){ContactService.contact.get({user_id:AuthenticationService.getUserId(),contact_id:contact_id},function(response){response.contact.circles_ids=[],_(response.contact.parents).forEach(function(parent){console.log(parent),response.contact.circles_ids.push(parent.circle)}).value(),contactCtrl.contact=response.contact,contactCtrl.friends&&contactCtrl.getFriends()})},contactCtrl.getFriends=function(){contactCtrl.friends&&(contactCtrl.contact.facebook&&contactCtrl.friends.facebook_friends&&(contactCtrl.contact.facebook=_.find(contactCtrl.friends.facebook_friends.list,function(friend){return friend.id==contactCtrl.contact.facebook.id})),contactCtrl.contact.twitter&&contactCtrl.friends.twitter&&(contactCtrl.contact.twitter=_.find(contactCtrl.friends.twitter.list,function(friend){return friend.id==contactCtrl.contact.twitter.id})),contactCtrl.contact.instagram&&contactCtrl.friends.instagram&&(contactCtrl.contact.instagram=_.find(contactCtrl.friends.instagram.list,function(friend){return friend.id==contactCtrl.contact.instagram.id})))},contactCtrl.deleteContact=function(contact_id){ContactService.contact["delete"]({user_id:AuthenticationService.getUserId(),contact_id:contact_id},function(response){$state.go("dashboard")})},contactCtrl.edit=function(){contactCtrl.editProfile=!0,contactCtrl.contact={}},contactCtrl.saveContact=function(){contactCtrl.contact.user_id=AuthenticationService.getUserId(),contactCtrl.contact.circles_ids=[],contactCtrl.contact.circles_ids.push(contactCtrl.circle_id),ContactService.saveContact(contactCtrl.contact).then(function(data){contactCtrl.parentController.closeContact()})},contactCtrl.updateContact=function(){contactCtrl.contact.user_id=AuthenticationService.getUserId(),ContactService.updateContact(contactCtrl.contact).then(function(data){contactCtrl.parentController.closeContact()})},contactCtrl.cancelContact=function(){contactCtrl.contact={},contactCtrl.contact_id=null,contactCtrl.circle_id=null,contactCtrl.editProfile=!1},$scope.$watch("contactCtrl.parentController.editContact",function(newValue,oldValue){1==newValue&&contactCtrl.contact_id?contactCtrl.getContact(contactCtrl.contact_id):contactCtrl.contact={}}),contactCtrl.init=function(circle_id,contact_id,parentController){contactCtrl.circle_id=circle_id,contactCtrl.parentController=parentController,contactCtrl.contact_id=contact_id,AuthenticationService.getFriends()?contactCtrl.friends=AuthenticationService.getFriends():AuthenticationService.getUserFriends(AuthenticationService.getUserId()).then(function(data){console.log(data),contactCtrl.friends=data;var pages={};pages.name="---Páginas de Facebook---",contactCtrl.friends.facebook_friends.list.push(pages),contactCtrl.friends.facebook_friends.list=contactCtrl.friends.facebook_friends.list.concat(contactCtrl.friends.facebook_pages.list),contactCtrl.contact_id&&contactCtrl.getContact(contactCtrl.contact_id)})}}),unifyApp.controller("ContactProfileController",function($scope,$stateParams,ContactService,AuthenticationService){var contactCtrl=this;contactCtrl.getContact=function(contact_id){ContactService.contact.get({user_id:AuthenticationService.getUserId(),contact_id:contact_id},function(response){contactCtrl.contact=response.contact,localStorage.setItem("response",JSON.stringify(response))})},contactCtrl.edit=function(){contactCtrl.editContact=!0},contactCtrl.closeContact=function(){contactCtrl.editContact=!1,contactCtrl.getContact(contactCtrl.contact_id),contactCtrl.getContactFeed()},contactCtrl.cancelContact=function(){contactCtrl.editContact=!1},contactCtrl.cancelContact=function(){contactCtrl.contact_id=null,contactCtrl.circle_id=null,contactCtrl.editContact=!1},contactCtrl.getContactFeed=function(){contactCtrl.feed=null,ContactService.getContactFeed(AuthenticationService.getUserId(),contactCtrl.contact_id).then(function(data){data.contact_id==contactCtrl.contact_id&&(contactCtrl.feed=data.media)})},$stateParams.contact_id&&(contactCtrl.contact_id=$stateParams.contact_id,contactCtrl.getContact(contactCtrl.contact_id),contactCtrl.getContactFeed())}),unifyApp.controller("HeaderController",function(){var canvas=document.getElementById("myCanvas"),context=canvas.getContext("2d");context.beginPath(),context.moveTo(0,0),context.bezierCurveTo(100,80,300,80,400,0),context.closePath(),context.lineWidth=5,context.fillStyle="#579f9b",context.fill(),context.save()}),unifyApp.controller("LoginController",function($scope,$auth,$window,$document,AuthenticationService){function bubbles(){for(var min_bubble_count=40,max_bubble_count=80,min_bubble_size=3,max_bubble_size=12,bubbleCount=min_bubble_count+Math.floor(Math.random()*(max_bubble_count+1)),i=0;bubbleCount>i;i++)$bubbles.append('<div class="bubble-container"><div class="bubble"></div></div>');$bubbles.find(".bubble-container").each(function(){var pos_rand=Math.floor(101*Math.random()),size_rand=min_bubble_size+Math.floor(Math.random()*(max_bubble_size+1)),delay_rand=Math.floor(11*Math.random()),speed_rand=6+Math.floor(26*Math.random()),blur_rand=Math.floor(3*Math.random()),$this=$(this);$this.css({left:pos_rand+"%","-webkit-animation-duration":speed_rand+"s","-moz-animation-duration":speed_rand+"s","-ms-animation-duration":speed_rand+"s","animation-duration":speed_rand+"s","-webkit-animation-delay":delay_rand+"s","-moz-animation-delay":delay_rand+"s","-ms-animation-delay":delay_rand+"s","animation-delay":delay_rand+"s","-webkit-filter":"blur("+blur_rand+"px)","-moz-filter":"blur("+blur_rand+"px)","-ms-filter":"blur("+blur_rand+"px)",filter:"blur("+blur_rand+"px)"}),$this.children(".bubble").css({width:size_rand+"px",height:size_rand+"px"})})}var lgnCtrl=this;lgnCtrl.login=function(){AuthenticationService.login(lgnCtrl.user).then(function(response){lgnCtrl.errors=response.errors})},lgnCtrl.authenticate=function(provider){AuthenticationService.authenticate(provider).then(function(response){lgnCtrl.errors=response.errors})},lgnCtrl.toTheTop=function(){$document.scrollTopAnimated(0,1e3).then(function(){})},lgnCtrl.signup=function(){AuthenticationService.signup(lgnCtrl.newuser).then(function(response){lgnCtrl.errors=response.errors})},lgnCtrl.isLogin=!0,lgnCtrl.isSignUp=!1;for(var ocean=angular.element(".ocean"),waveWidth=10,waveCount=Math.floor(window.innerWidth/waveWidth),docFrag=document.createDocumentFragment(),i=0;waveCount>i;i++){var wave=document.createElement("div");wave.className+=" wave",docFrag.appendChild(wave),wave.style.left=i*waveWidth+"px",wave.style.webkitAnimationDelay=i/100+"s"}ocean.append(docFrag);var w=angular.element($window);w.bind("resize",function(){$scope.$apply()});var $bubbles=angular.element(".bubbles");$(".bubble-toggle").click(function(){return $bubbles.is(":empty")?(bubbles(),$bubbles.show(),$(this).text("Bubbles Off")):($bubbles.fadeOut(function(){$(this).empty()}),$(this).text("Bubbles On")),!1}),bubbles()}),unifyApp.controller("MailController",function(base64,$sce,MailService,AuthenticationService){var mailCtlr=this;mailCtlr.viewMail=null,mailCtlr.getInbox=function(){mailCtlr.viewList="inbox",MailService.getInbox(AuthenticationService.getUserId()).then(function(data){mailCtlr.inbox=data.emails,mailCtlr.email_ids=[]})},mailCtlr.getDraft=function(){mailCtlr.viewList="draft",MailService.getDraft(AuthenticationService.getUserId()).then(function(data){mailCtlr.draft=data.emails,mailCtlr.email_ids=[]})},mailCtlr.getSent=function(){mailCtlr.viewList="sent",MailService.getSent(AuthenticationService.getUserId()).then(function(data){mailCtlr.sent=data.emails,mailCtlr.email_ids=[]})},mailCtlr.getTrash=function(){mailCtlr.viewList="trash",MailService.getTrash(AuthenticationService.getUserId()).then(function(data){mailCtlr.trash=data.emails,mailCtlr.email_ids=[]})},mailCtlr.markAsSeen=function(){MailService.markAsSeen(AuthenticationService.getUserId(),mailCtlr.email_ids).then(function(data){_(mailCtlr.inbox.list).forEach(function(mail){_.includes(mailCtlr.email_ids,mail.id)&&(mail.unread=!1),mail.checked=!1}).value(),mailCtlr.email_ids=[]})},mailCtlr.markAsUnseen=function(){MailService.markAsUnseen(AuthenticationService.getUserId(),mailCtlr.email_ids).then(function(){_(mailCtlr.inbox.list).forEach(function(mail){_.includes(mailCtlr.email_ids,mail.id)&&(mail.unread=!0),mail.checked=!1}).value(),mailCtlr.email_ids=[]})},mailCtlr.moveToTrash=function(){MailService.moveToTrash(AuthenticationService.getUserId(),mailCtlr.email_ids).then(function(data){_.remove(mailCtlr.inbox.list,function(mail){return _.includes(mailCtlr.email_ids,mail.id)}),mailCtlr.email_ids=[]})},mailCtlr.deleteMail=function(mail_id){MailService.deleteMail(AuthenticationService.getUserId(),mail_id).then(function(data){_.pull(mailCtlr.email_ids,mail_id),_.remove(mailCtlr.trash.list,function(mail){return mail_id==mail.id})})},mailCtlr.moveToInbox=function(){MailService.moveToInbox(AuthenticationService.getUserId(),mailCtlr.email_ids).then(function(data){_.remove(mailCtlr.trash.list,function(mail){return _.includes(mailCtlr.email_ids,mail.id)}),mailCtlr.email_ids=[]})},mailCtlr.check=function(mail){mail.checked?mailCtlr.email_ids.push(mail.id):_.pull(mailCtlr.email_ids,mail.id),console.log(mailCtlr.email_ids)},mailCtlr.getMail=function(mail){var html=mail.html;html=html.replace(/_/g,"/"),html=html.replace(/-/g,"+"),mailCtlr.decodedHtml=base64.decode(html),mailCtlr.mailHtml=$sce.trustAsHtml(mailCtlr.decodedHtml),mailCtlr.viewMail=mail,_(mailCtlr.inbox).forEach(function(mail){mail.checked=!1}).value(),mailCtlr.email_ids=[],mail.unread&&(mailCtlr.email_ids.push(mail.id),mailCtlr.markAsSeen())},mailCtlr.sendMail=function(mail){mailCtlr.writeMail.user_id=AuthenticationService.getUserId(),mailCtlr.writeMail.to=mailCtlr.writeMail.to.split(","),mailCtlr.writeMail.cc?mailCtlr.writeMail.cc=mailCtlr.writeMail.cc.split(","):mailCtlr.writeMail.cc=[],mailCtlr.writeMail.cco?mailCtlr.writeMail.cco=mailCtlr.writeMail.cco.split(","):mailCtlr.writeMail.cco=[],MailService.sendMail(mailCtlr.writeMail).then(function(data){mailCtlr.writeMail=""})},mailCtlr.answerMail=function(mail){var from=mail.from.match(/<(.*?)>/g).map(function(val){return console.log("VAL:"+val),val.replace(/</g,"").replace(/>/g,"")});mailCtlr.viewMail=null,mailCtlr.writeMail={},mailCtlr.writeMail.to=from.toString(),mailCtlr.writeMail.subject="RE: "+mail.subject},mailCtlr.answerAllMail=function(mail,myAddress){mailCtlr.viewMail=null,mailCtlr.writeMail={};var from=mail.from.match(/<(.*?)>/g).map(function(val){return val.replace(/</g,"").replace(/>/g,"")});if(mailCtlr.writeMail.to=from.toString(),mail.cc!=[""]){var cc=mail.cc.toString().match(/<(.*?)>/g).map(function(val){return val.replace(/</g,"").replace(/>/g,"")}),to=mail.to.toString().match(/<(.*?)>/g).map(function(val){return val.replace(/</g,"").replace(/>/g,"")});cc=to.concat(cc),_.remove(cc,function(mail){return mail==myAddress}),mailCtlr.writeMail.cc=cc.toString()}mailCtlr.writeMail.subject="RE: "+mail.subject},mailCtlr.getInbox()}),unifyApp.controller("MainController",function($translate,$auth,ENV,ProfileService,AuthenticationService){var mainController=this;mainController.logout=function(){AuthenticationService.logout()},$auth.isAuthenticated()&&(AuthenticationService.getFriends(),ProfileService.user.get({user_id:AuthenticationService.getUserId()},function(response){null!=response.user.name?mainController.user=response.user.name:null!=response.user.mail?mainController.user=response.user.mail:mainController.user="Usuario Unify",mainController.email=null!=response.user.google?response.user.google.email:null})),mainController.auth=$auth.isAuthenticated()}),unifyApp.controller("ProfileController",function(ProfileService,AuthenticationService){var profileCtlr=this;ProfileService.user.get({user_id:AuthenticationService.getUserId()},function(response){profileCtlr.user=response.user}),profileCtlr.authenticate=function(provider){AuthenticationService.authenticate(provider)},profileCtlr.unlink=function(provider){AuthenticationService.unlink(provider)},profileCtlr.edit=function(){profileCtlr.newUser={},profileCtlr.newUser.name=profileCtlr.user.name,profileCtlr.newUser.email=profileCtlr.user.email,profileCtlr.editProfile=!0},profileCtlr.save=function(){ProfileService.saveUser(AuthenticationService.getUserId(),profileCtlr.newUser).then(function(data){profileCtlr.user.name=profileCtlr.newUser.name,profileCtlr.user.email=profileCtlr.newUser.email,profileCtlr.editProfile=!1})},profileCtlr.getFeed=function(){profileCtlr.feed=null,ProfileService.getFeed(AuthenticationService.getUserId()).then(function(data){data.user_id==AuthenticationService.getUserId()&&(profileCtlr.feed=data.media)})},profileCtlr.getFeed()}),unifyApp.controller("SignUpController",function($scope,$state,AuthenticationService){$scope.signup=function(){AuthenticationService.signup($scope.user)};for(var ocean=angular.element(".ocean"),waveWidth=10,waveCount=Math.floor(window.innerWidth/waveWidth),docFrag=document.createDocumentFragment(),i=0;waveCount>i;i++){var wave=document.createElement("div");wave.className+=" wave",docFrag.appendChild(wave),wave.style.left=i*waveWidth+"px",wave.style.webkitAnimationDelay=i/100+"s"}ocean.append(docFrag)}),unifyApp.controller("VideoController",function($scope,video,$modal){$scope.open=function(source){$modal.open({animation:$scope.animationsEnabled,templateUrl:"myModalContent.html",controller:"ModalInstanceCtrl",resolve:{source:function(){return source}}})}}),unifyApp.controller("ModalInstanceCtrl",function($scope,$modalInstance,source,video){video.addSource("mp4",source,!0)}),unifyApp.directive("uwContactData",function(){return{restrict:"E",templateUrl:"views/contact.html",scope:{uwContactId:"=",uwCircleId:"=",uwParentController:"="}}}),unifyApp.directive("uwLoader",function(){return{restrict:"E",templateUrl:"views/loader.html"}}),unifyApp.directive("uwMainContent",function($auth){var link=function(scope,elm,attrs,ctrl){};return{restrict:"E",link:link,templateUrl:function(elem,attr){return $auth.isAuthenticated()?"views/circle.html":"views/home.html"}}}),unifyApp.directive("uwMessage",function($timeout){var link=function(scope,elm,attrs,ctrl){scope.$watch("ngModel",function(newValue,oldValue){scope.danger="undefined"!=typeof attrs.danger,scope.warning="undefined"!=typeof attrs.warning,scope.info="undefined"!=typeof attrs.info,scope.success="undefined"!=typeof attrs.success,newValue&&($timeout(function(){scope.showMessage=!0},500),$timeout(function(){scope.showMessage=!1,scope.ngModel=""},5e3))})};return{restrict:"EA",link:link,templateUrl:"views/message.html",scope:{ngModel:"="}}}),unifyApp.directive("uwTimeLine",function(){return{restrict:"E",templateUrl:"views/timeline.html",scope:{uwMedia:"=",uwName:"=",uwPicture:"="}}}),unifyApp.directive("uwVideo",function(){var link=function(scope,elm,attrs,ctrl){};return{restrict:"E",link:link,templateUrl:"views/video.html",scope:{videoSrc:"="}}}),unifyApp.filter("clock",function(){return function(input){return 10>input&&(input="0"+input),input}}),angular.module("unifyApp").config(function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/"),$stateProvider.state("main",{url:"/",templateUrl:"views/main.html"}),$stateProvider.state("login",{url:"/login",templateUrl:"views/login.html"}),$stateProvider.state("signUp",{url:"/signUp",templateUrl:"views/signUp.html"}),$stateProvider.state("profile",{url:"/profile",templateUrl:"views/userProfile.html"}),$stateProvider.state("editProfile",{url:"/profile/edit",templateUrl:"views/userEditProfile.html"}),$stateProvider.state("dashboard",{url:"/circles",templateUrl:"views/circle.html"}),$stateProvider.state("contact",{url:"/contact/:contact_id",templateUrl:"views/contactProfile.html"}),$stateProvider.state("waiting",{url:"/waiting",templateUrl:"views/comingSoon.html"}),$stateProvider.state("emails",{url:"/emails",templateUrl:"views/mailDash.html"})}),unifyApp.service("AuthenticationService",function($http,$auth,$state,$window,ENV){var userId,mainCircleId,friends,getUserId=function(){return null==userId&&setUserId(localStorage.getItem(ENV.storageUserId)),userId},setUserId=function(value){localStorage.setItem(ENV.storageUserId,value),userId=value},getMainCircleId=function(){return null==mainCircleId&&setMainCircleId(localStorage.getItem(ENV.storageMainCircleId)),mainCircleId},setMainCircleId=function(value){localStorage.setItem(ENV.storageMainCircleId,value),mainCircleId=value},getFriends=function(){return friends},signup=function(user){console.log(user.name);var promise=$auth.signup({name:user.name,email:user.email,password:user.password,confirm_password:user.confirmpassword}).then(function(response){setUserId(response.data.user._id),setMainCircleId(response.data.user.main_circle._id),localStorage.setItem("response",JSON.stringify(response)),console.log("You have successfully logged in: "+response.data.token),$window.location.href="/"})["catch"](function(response){return response.data});return promise},login=function(user){var promise=$auth.login({email:user.email,password:user.password}).then(function(response){setUserId(response.data.user._id),setMainCircleId(response.data.user.main_circle._id),localStorage.setItem("response",JSON.stringify(response)),console.log("You have successfully logged in: "+response.data.token),$window.location.href="/"})["catch"](function(response){return response.data});return promise},authenticate=function(provider){var promise=$auth.authenticate(provider).then(function(response){setUserId(response.data.user._id),setMainCircleId(response.data.user.main_circle._id),localStorage.setItem("response",JSON.stringify(response)),console.log("You have successfully logged in: "+response.data.token),$window.location.href="/"})["catch"](function(response){return console.log(response.data.errors),response.data});return promise},unlink=function(provider){var req={method:"DELETE",url:ENV.apiEndPoint+"/auth/"+provider,headers:{Authorization:"Bearer "+localStorage.getItem("satellizer_token")}};$http(req).then(function(response){localStorage.setItem("response",JSON.stringify(response)),localStorage.setItem("satellizer_token",response.data.token),console.log("You have successfully unlogged in: "+response.data.token),$window.location.href="/"})["catch"](function(response){console.log(response.data.message)})},getUserFriends=function(user_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/friends").then(function(response){return localStorage.setItem("response",JSON.stringify(response)),friends=response.data.friends,response.data.friends},function(response){return response.data});return promise},logout=function(){localStorage.clear(),$window.location.href="/"};return{signup:signup,login:login,authenticate:authenticate,unlink:unlink,getUserId:getUserId,getMainCircleId:getMainCircleId,getFriends:getFriends,getUserFriends:getUserFriends,logout:logout}}),unifyApp.factory("CircleService",function($http,$resource,ENV){var circle=$resource(ENV.apiEndPoint+"/api/user/:user_id/circle/:circle_id",{circle_id:"@_id"},{update:{method:"PUT"}}),saveCircle=function(circle){var promise=$http.post(ENV.apiEndPoint+"/api/user/"+circle.user_id+"/circle",{user_id:circle.user_id,name:circle.name,parent_id:circle.parent,picture:circle.picture}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},updateCircle=function(circle){var promise=$http.put(ENV.apiEndPoint+"/api/user/"+circle.user_id+"/circle/"+circle._id,{user_id:circle.user_id,circle_id:circle._id,name:circle.name,parent_id:circle.parent,picture:circle.picture}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},getCircleTree=function(user_id,circle_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/circle/"+circle_id+"/tree").then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},getCircleFeed=function(user_id,circle_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/circle/"+circle_id+"/media").then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise};return{circle:circle,saveCircle:saveCircle,updateCircle:updateCircle,getCircleTree:getCircleTree,getCircleFeed:getCircleFeed}}),unifyApp.factory("ContactService",function($http,$resource,ENV){var contact=$resource(ENV.apiEndPoint+"/api/user/:user_id/contact/:contact_id",{contact_id:"@_id"},{update:{method:"PUT"}}),saveContact=function(contact){var promise=$http.post(ENV.apiEndPoint+"/api/user/"+contact.user_id+"/contact",{user_id:contact.user_id,name:contact.name,picture:contact.picture,circles_ids:contact.circles_ids,facebook_id:null!=contact.facebook?contact.facebook.id:null,twitter_id:null!=contact.twitter?contact.twitter.id:null,instagram_id:null!=contact.instagram?contact.instagram.id:null,facebook_display_name:null!=contact.facebook?contact.facebook.name:null,twitter_username:null!=contact.twitter?contact.twitter.username:null,instagram_username:null!=contact.instagram?contact.instagram.username:null}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},updateContact=function(contact){var promise=$http.put(ENV.apiEndPoint+"/api/user/"+contact.user_id+"/contact/"+contact._id,{user_id:contact.user_id,contact_id:contact._id,name:contact.name,picture:contact.picture,circles_ids:contact.circles_ids,facebook_id:null!=contact.facebook?contact.facebook.id:null,twitter_id:null!=contact.twitter?contact.twitter.id:null,instagram_id:null!=contact.instagram?contact.instagram.id:null,facebook_display_name:null!=contact.facebook?contact.facebook.name:null,twitter_username:null!=contact.twitter?contact.twitter.username:null,instagram_username:null!=contact.instagram?contact.instagram.username:null}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},getContactFeed=function(user_id,contact_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/contact/"+contact_id+"/media").then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise};return{contact:contact,saveContact:saveContact,updateContact:updateContact,getContactFeed:getContactFeed}}),unifyApp.factory("MailService",function($http,ENV){var getInbox=function(user_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/email/inbox").then(function(response){return console.log(response.data),response.data},function(response){return response.data});return promise},getDraft=function(user_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/email/draft").then(function(response){return response.data});return promise},getSent=function(user_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/email/sent").then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},getTrash=function(user_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/email/trash").then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},sendMail=function(mail){var promise=$http.post(ENV.apiEndPoint+"/api/user/"+mail.user_id+"/email",{user_id:mail.user_id,to:mail.to,cc:mail.cc,cco:mail.cco,subject:mail.subject,text:mail.text}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},markAsSeen=function(user_id,email_ids){var promise=$http.post(ENV.apiEndPoint+"/api/user/"+user_id+"/email/seen",{email_ids:email_ids}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},markAsUnseen=function(user_id,email_ids){var promise=$http.post(ENV.apiEndPoint+"/api/user/"+user_id+"/email/unseen",{email_ids:email_ids}).then(function(response){
return response.data},function(response){return console.log(response.data.errors),response.data});return promise},moveToTrash=function(user_id,email_ids){var promise=$http.post(ENV.apiEndPoint+"/api/user/"+user_id+"/email/trash",{email_ids:email_ids}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},moveToInbox=function(user_id,email_ids){var promise=$http.post(ENV.apiEndPoint+"/api/user/"+user_id+"/email/untrash",{email_ids:email_ids}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},deleteMail=function(user_id,email_id){var promise=$http["delete"](ENV.apiEndPoint+"/api/user/"+user_id+"/email/"+email_id).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise};return{getInbox:getInbox,getDraft:getDraft,getSent:getSent,getTrash:getTrash,sendMail:sendMail,markAsSeen:markAsSeen,markAsUnseen:markAsUnseen,moveToTrash:moveToTrash,moveToInbox:moveToInbox,deleteMail:deleteMail}}),unifyApp.factory("ProfileService",function($http,$resource,ENV){var user=$resource(ENV.apiEndPoint+"/api/user/:user_id",{user_id:"@_id"},{update:{method:"PUT"}}),saveUser=function(user_id,user){var promise=$http.put(ENV.apiEndPoint+"/api/user/"+user_id,{user_id:user_id,email:user.email,name:user.name,password:user.password,confirm_password:user.confirm_password}).then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise},getFeed=function(user_id){var promise=$http.get(ENV.apiEndPoint+"/api/user/"+user_id+"/media").then(function(response){return response.data},function(response){return console.log(response.data.errors),response.data});return promise};return{user:user,saveUser:saveUser,getFeed:getFeed}}),angular.module("unifyApp").config(function($translateProvider){$translateProvider.useStaticFilesLoader({prefix:"scripts/i18n/locale-",suffix:".json"}),$translateProvider.preferredLanguage("es_AR")});