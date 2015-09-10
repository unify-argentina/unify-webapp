
'use strict';

var unifyApp = angular.module('unifyApp', 
	['angular-loading-bar', 'ngVideo', 'ngResource', 'ngAnimate', 'ui.router','ui.bootstrap', 'config', 'pascalprecht.translate', 'satellizer', 'duScroll', 'ab-base64', 'angularMoment'])
	.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    cfpLoadingBarProvider.includeSpinner = false;
	  }]);

unifyApp.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
});

unifyApp.run(function(amMoment) {
    amMoment.changeLocale('es');
});