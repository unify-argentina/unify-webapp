
'use strict';

var unifyApp = angular.module('unifyApp', 
	['angular-loading-bar', 'ngVideo', 'ngResource', 'ngAnimate', 'ui.router','ui.bootstrap', 'config', 'pascalprecht.translate', 'satellizer', 'duScroll'])
	.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    cfpLoadingBarProvider.includeSpinner = false;
	  }]);

