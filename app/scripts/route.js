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

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'views/dashboard.html'
  });

    $stateProvider.state('circles', {
    url: '/circles',
    templateUrl: 'views/circle.html'
  });

  $stateProvider.state('bookTickets', {
    url: '#/bookTickets/:id',
    templateUrl: 'views/bookTickets.html'
  });
  
 });