'use strict';

angular.module('unifyApp').config(function($authProvider, ENV) {
    $authProvider.baseUrl = ENV.apiEndPoint;
    $authProvider.unlinkUrl = ENV.unlinkUrl;
    $authProvider.unlinkMethod = ENV.unlinkMethod;

    $authProvider.facebook({
      clientId: '805638479520745',
      url: '/auth/facebook',
      scope: ['email', 'user_about_me','user_friends','user_likes','user_photos','user_posts','user_status','user_videos', 'publish_actions']
    });

   
$authProvider.google({
      clientId: '79996335280-gc0hh1efoo859u1lqaqct2v3u1larsrj.apps.googleusercontent.com',
      url: '/auth/google',
      optionalUrlParams: ['access_type', 'approval_prompt'],
      accessType: 'offline',
      approvalPromt: 'force',
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/contacts.readonly', 'https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.labels', 'https://www.googleapis.com/auth/gmail.compose']
    });

   $authProvider.twitter({
      url: '/auth/twitter',
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