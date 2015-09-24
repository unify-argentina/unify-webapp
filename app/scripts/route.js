'use strict';

angular.module('unifyApp').config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'views/main.html'
  });

  $stateProvider.state('privacy', {
    url: '/privacy',
    templateUrl: 'views/privacy.html'
  });
 });