'use strict';

angular.module('unifyApp').config(function($authProvider, ENV) {
    $authProvider.baseUrl = ENV.apiEndPoint;
    $authProvider.unlinkUrl = ENV.unlinkUrl;
    $authProvider.unlinkMethod = ENV.unlinkMethod;

    $authProvider.facebook({
      clientId: '805638479520745',
      url: '/auth/facebook'
    });

    $authProvider.google({
      clientId: '79996335280-gc0hh1efoo859u1lqaqct2v3u1larsrj.apps.googleusercontent.com',
      url: '/auth/google'
    });

   $authProvider.twitter({
      url: '/auth/twitter'
    });

    $authProvider.oauth2({
      name: 'instagram',
      url: '/auth/instagram',
      redirectUri: window.location.origin,
      clientId: 'ad148c3db70f4b7188a0e30c1b74ea06',
      requiredUrlParams: ['scope'],
      scope: ['likes'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });
  });