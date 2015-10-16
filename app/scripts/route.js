'use strict';

angular.module('unifyApp').config(function ($httpProvider, $interpolateProvider, $stateProvider, $urlRouterProvider) {
  
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'views/main.html'
  });

  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'views/userProfile.html'
  });

  $stateProvider.state('editProfile', {
    url: '/profile/edit',
    templateUrl: 'views/userEditProfile.html'
  });

  $stateProvider.state('dashboard', {
    url: '/circles',
    templateUrl: 'views/circle.html'
  });

  $stateProvider.state('contact', {
    url: '/contact/:circle_id/:contact_id',
    templateUrl: 'views/contactProfile.html'
  });

  $stateProvider.state('circle', {
    url: '/circle/:circle_id',
    templateUrl: 'views/circle.html'
  });

  $stateProvider.state('waiting', {
    url: '/waiting',
    templateUrl: 'views/comingSoon.html'
  });

  $stateProvider.state('emails', {
    url: '/emails',
    templateUrl: 'views/mailDash.html'
  });

  $stateProvider.state('privacy', {
    url: '/privacy',
    templateUrl: 'views/privacy.html'
  });

  $stateProvider.state('verify', {
    url: '/auth/verify/:token',
    templateUrl: 'views/verify.html'
  });

  $stateProvider.state('notFound', {
    url: '/notFound',
    templateUrl: 'views/notFound.html'
  });

 });