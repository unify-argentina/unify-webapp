'use strict';

angular.module('unifyApp').config(function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'scripts/i18n/locale-',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('es_AR');
});