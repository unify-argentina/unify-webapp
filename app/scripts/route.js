'use strict';

angular.module('unifyApp').config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'views/main.html'
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login.html'
  });

  $stateProvider.state('signUp', {
    url: '/signUp',
    templateUrl: 'views/signUp.html'
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
    url: '/contact/:contact_id',
    templateUrl: 'views/contactProfile.html'
  });

  
 });