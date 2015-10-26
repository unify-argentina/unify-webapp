unifyApp.directive('uwTimeLine', function($sce, $filter, $modal, $rootScope, CircleService, ProfileService, ContactService, AuthenticationService) {
  
  	var link = function(scope, elm, attrs, ctrl) {
        scope.moreFeed=null;

        scope.boldHashtags = function(text, provider){
            var target = "_blank";
            var replacedText = $filter('linky')(text, target);
            var targetAttr = "";
            if (angular.isDefined(target)) {
                targetAttr = ' target="' + target + '"';
            }
            replacedText = replacedText.replace("&#10;", '<br/> ');
            if(provider=='twitter'){
                var replacePattern1 = /(^|\s|[^&])#(((\w*[\-a-zA-Z_]+\w*)|(&#(19?[2-9]|2?[0-4][0-9]|25[0-5]);))*)/igm;
                replacedText = replacedText.replace(replacePattern1, '$1<a class="hashtag" href="https://twitter.com/search?q=%23$2"' + targetAttr + '>#$2</a>');
                var replacePattern2 = /(^|\s|[^&])@(((\w*[\-a-zA-Z_]+\w*)|(&#(19?[2-9]|2?[0-4][0-9]|25[0-5]);))*)/igm;
                replacedText = replacedText.replace(replacePattern2, '$1<a class="mention" href="https://twitter.com/$2"' + targetAttr + '>@$2</a>');
            }else if(provider == 'facebook'){
                var replacePattern1 = /(^|\s|[^&])#(((\w*[\.\-a-zA-Z_]+\w*)|(&#(19?[2-9]|2?[0-4][0-9]|25[0-5]);))*)/igm;
                replacedText = replacedText.replace(replacePattern1, '$1<a class="hashtag" href="https://facebook.com/hashtag/$2"' + targetAttr + '>#$2</a>');
            }else if(provider == 'instagram'){
                var replacePattern1 = /(^|\s|[^&])#(((\w*[\.\-a-zA-Z_]+\w*)|(&#(19?[2-9]|2?[0-4][0-9]|25[0-5]);))*)/igm;
                replacedText = replacedText.replace(replacePattern1, '$1<a class="hashtag" href="https://instagram.com/explore/tags/$2"' + targetAttr + '>#$2</a>');
                 var replacePattern2 = /(^|\s|[^&])@(((\w*[\.\-a-zA-Z_]+\w*)|(&#(19?[2-9]|2?[0-4][0-9]|25[0-5]);))*)/igm;
                replacedText = replacedText.replace(replacePattern2, '$1<a class="mention" href="https://instagram.com/$2"' + targetAttr + '>@$2</a>');
            }
            return replacedText;
        }
       scope.like = function(post){
            var facebook_id; 
            var twitter_id;
            if(post.provider=='facebook'){
                facebook_id=post.id;
                twitter_id=null;
            }else if(post.provider=='twitter'){
                facebook_id=null;
                twitter_id=post.id;
            }
            ContactService.like(
                AuthenticationService.getUserId(),
                facebook_id,
                twitter_id
            ).then(function(data) {
                post.user_has_liked=true;
            });
        };
        scope.unlike = function(post){
            var facebook_id; 
            var twitter_id;
            if(post.provider=='facebook'){
                facebook_id=post.id;
                twitter_id=null;
            }else if(post.provider=='twitter'){
                facebook_id=null;
                twitter_id=post.id;
            }
            ContactService.unlike(
                AuthenticationService.getUserId(),
                facebook_id,
                twitter_id
            ).then(function(data) {
                post.user_has_liked=false;
            });
        };

        scope.openPhoto = function (source) {
            var modalInstance = $modal.open({
                animation: scope.animationsEnabled,
                templateUrl: 'myModalPhoto.html',
                controller: 'ModalPhotoCtrl',
                size: 'lg',
                resolve: {
                    source: function () {
                      return source;
                    }
                }
            });
        };
        
        scope.getMoreCircleFeed  = function(){
            scope.moreFeed=null;
            console.log("LALALA");
            CircleService.getFeed(
                AuthenticationService.getUserId(),
                scope.uwCircleId
            ).then(function(data) {
                if(data){
                    if(data.errors==null){
                        if(data.circle_id==scope.uwCircleId)
                        {
                            scope.uwMedia.list=scope.uwMedia.list.concat(data.media.list);
                            scope.uwMedia.count+=data.media.count;
                        }
                    }else{
                       $rootScope.errorMsg = data.errors[0].msg;
                    }
                }
            });
        };

        scope.getMoreProfileFeed = function(){
            scope.moreFeed=null;
            ProfileService.getFeed(
                AuthenticationService.getUserId()
            ).then(function(data) {
                if(data.errors==null){
                    if(data.user_id==AuthenticationService.getUserId())
                    {
                        scope.uwMedia.list=scope.uwMedia.list.concat(data.media.list);
                        scope.uwMedia.count+=data.media.count;
                    }
                }else{
                   $rootScope.errorMsg = data.errors[0].msg;
                }
            });
        };

        scope.getMoreContactFeed = function(){
            scope.moreFeed=null;
            ContactService.getContactFeed(
                AuthenticationService.getUserId(),
                scope.uwContactId
            ).then(function(data) {
                if(data.errors==null){
                    if(data.contact_id==scope.uwContactId)
                    {
                        scope.uwMedia.list=scope.uwMedia.list.concat(data.media.list);
                        scope.uwMedia.count+=data.media.count;
                    }
                }else{
                   $rootScope.errorMsg = data.errors[0].msg;
                }
            });
        };
        
    
    };
    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/timeline.html',
        scope:{
        	uwMedia: "=",
        	uwName: "=",
            uwCircleId: "=",
            uwContactId: "=",
        	uwPicture: "=",
            uwFromProfile: "=",
            uwFromCircle: "=",
            uwFromContact: "="
        }
    };
});

unifyApp.controller('ModalPhotoCtrl', function ($scope, $modalInstance, source) {
    $scope.source=source;
});