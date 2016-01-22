angular.module('qznews', ['ionic', 'qznews.controllers', 'qznews.services', 'qznews.filter'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceProvider) {

  $ionicConfigProvider.tabs.position('top'); // other values: top
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.style('striped');   //striped,standard
  $ionicConfigProvider.views.forwardCache('true');
  $ionicConfigProvider.views.maxCache(100);
  //$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
 
  $stateProvider
    .state('index', {
      url: '/index',
      templateUrl: '/assets/pages/index.html',
      controller: 'IndexCtrl'      
    });  
    
    $urlRouterProvider.otherwise("/index");
});