// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','youtube-embed'])

 app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

 app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('login', {
      url: "/login",
      templateUrl: 'templates/login.html'
  })
  .state('videos', {
      url: "/videos",
      templateUrl: 'templates/videos.html',
      controller: 'mycontroller'
  })
  $urlRouterProvider.otherwise('/videos');
});

app.controller('mycontroller', function($scope, $http){
  $scope.videos = [ ];
  $scope.searchInput = { };

  $scope.search = function(){
    $scope.videos = [];
    $scope.youtubeParams = {
        key: 'AIzaSyA-pPQzLFEpRubdJpDZHnBjxwhW2gYGntE',
        type: 'video',
        maxResults: '10',
        part: 'id,snippet',
        fields:'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',
        q: $scope.searchInput
      }

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
      $scope.videos.push(child);
      });
    });
  }
  $scope.playerVars = {
  rel: 0,
  showinfo: 0,
  modestbranding: 0,
}
});
