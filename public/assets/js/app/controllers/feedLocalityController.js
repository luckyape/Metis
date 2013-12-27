'use strict';
/*
 * Feeds Locality Controller
 *
 */
function FeedLocalityCtrl($scope, $rootScope, $feedsService, $routeParams, $location) {

  // get the vipfeed param from the route
  var feedid = $routeParams.vipfeed;
  $scope.vipfeed = feedid;

  // get the locality param from the route
  var localityid = $routeParams.locality;

  var breadcrumbs = [
    {
      name: "Feeds",
      url: "/#/feeds"
    },
    {
      name: feedid,
      url: "/#/feeds/" + $scope.vipfeed
    },
    {
      name: "Election",
      url: "/#/feeds/" + $scope.vipfeed + "/election"
    },
    {
      name: "State",
      url: "/#/feeds/" + $scope.vipfeed + "/election/state"
    },
    {
      name: "Locality " + localityid,
      url: $location.absUrl()
    }
  ];

  // initialize page header variables
  $rootScope.setPageHeader("Locality", breadcrumbs, "feeds", "", null);

  // get general Feed data
  $feedsService.getFeedData(feedid)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedData = data;
      $rootScope.feedData = data;

      // now call the other services to get the rest of the data
      FeedLocalityCtrl_getFeedLocality($scope, $rootScope, $feedsService, data.state + "/" + localityid);

    }).error(function (data, $http) {

      if($http===404){
        // feed not found

        $rootScope.pageHeader.alert = "Sorry, the VIP feed \"" + feedid + "\" does not exist.";
      } else {
        // some other error

        $rootScope.pageHeader.error += "Could not retrieve Feed data. ";
      }

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedData = {};
      $scope.feedLocality = {};
      $scope.feedEarlyVoteSites = {};
      $scope.feedPrecincts = {};
    });
}

/*
 * Get the Feed Locality for the Feed detail page
 *
 */
function FeedLocalityCtrl_getFeedLocality($scope, $rootScope, $feedsService, servicePath){

  // get Feed Locality
  $feedsService.getFeedLocality(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedLocality = data;

      // set the title
      $rootScope.pageHeader.title = "Locality ID: " + data.id;

      // now call the other services to get the rest of the data
      FeedLocalityCtrl_getFeedEarlyVoteSites($scope, $rootScope, $feedsService, data.earlyvotesites);
      FeedLocalityCtrl_getFeedPrecincts($scope, $rootScope, $feedsService, data.precincts);


    }).error(function (data) {

      $rootScope.pageHeader.error += "Could not retrieve Feed Locality data. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedLocality = {};
      $scope.feedEarlyVoteSites = {};
      $scope.feedPrecincts = {};
    });
}

/*
 * Get the Feed Locality Early Vote Sites for the Feed detail page
 *
 */
function FeedLocalityCtrl_getFeedEarlyVoteSites($scope, $rootScope, $feedsService, servicePath){

  // get Feed Early Vote Sites
  $feedsService.getFeedLocalityEarlyVoteSites(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedEarlyVoteSites = data;

    }).error(function (data) {

      $rootScope.pageHeader.error += "Could not retrieve Locality Early Vote Sites. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedEarlyVoteSites = {};
    });
}

/*
 * Get the Feed Locality Precincts for the Feed detail page
 *
 */
function FeedLocalityCtrl_getFeedPrecincts($scope, $rootScope, $feedsService, servicePath){

  // get Feed Precincts
  $feedsService.getFeedLocalityPrecincts(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedPrecincts = data;

    }).error(function (data) {

      $rootScope.pageHeader.error += "Could not retrieve Locality Precincts. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedPrecincts = {};
    });
}