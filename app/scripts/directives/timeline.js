unifyApp.directive('uwTimeLine', function($sce, $filter) {
  
  	var link = function(scope, elm, attrs, ctrl) {
        scope.boldHashtags = function(text){

            var target = "_blank";
            var replacedText = $filter('linky')(text, target);
            var targetAttr = "";
            if (angular.isDefined(target)) {
                targetAttr = ' target="' + target + '"';
            }
            var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = replacedText.replace(replacePattern1, '$1<b class="hashtag">#$2</b>');
            var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<b class="mention">@$2</b>');
            return replacedText;
        }
    };
    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/timeline.html',
        scope:{
        	uwMedia: "=",
        	uwName: "=",
        	uwPicture: "="
        }
    };
});