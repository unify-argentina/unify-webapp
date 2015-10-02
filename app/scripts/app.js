
'use strict';

var unifyApp = angular.module('unifyApp', 
	['angular-loading-bar', 'ngVideo', 'ngSanitize', 'ngResource', 'ngAnimate', 'ui.router','ui.bootstrap', 'config', 'pascalprecht.translate', 'satellizer', 'duScroll', 'ab-base64', 'angularMoment', 'ngFileUpload', 'angularUtils.directives.dirPagination'])
	.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    cfpLoadingBarProvider.includeSpinner = false;
	  }]);

unifyApp.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
});

unifyApp.run(function(amMoment) {
    amMoment.changeLocale('es');
});

unifyApp.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('views/pagination.html');
});