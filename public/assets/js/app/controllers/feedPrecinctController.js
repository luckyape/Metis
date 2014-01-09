'use strict';
/*
 * Feeds Precinct Controller
 *
 */
function FeedPrecinctCtrl($scope, $rootScope, $feedsService, $routeParams, $location, $filter, ngTableParams) {

  // get the vipfeed param from the route
  var feedid = $routeParams.vipfeed;
  $scope.vipfeed = feedid;

  // get the locality param from the route
  var localityid = $routeParams.locality;

  // get the precinct param from the route
  var precinctid = $routeParams.precinct;

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
      name: "Localities",
      url: "/#/feeds/" + $scope.vipfeed + "/election/state/localities"
    },
    {
      name: localityid,
      url: "/#/feeds/" + $scope.vipfeed + "/election/state/localities/" + localityid
    },
    {
      name: "Precincts",
      url: "/#/feeds/" + $scope.vipfeed + "/election/state/localities/" + localityid + "/precincts"
    },
    {
      name: precinctid,
      url: $location.absUrl()
    }
  ];

  // initialize page header variables
  $rootScope.setPageHeader("Precinct", breadcrumbs, "feeds", "", null);

  // get general Feed data
  $feedsService.getFeedData(feedid)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedData = data;
      $rootScope.feedData = data;

      // now call the other services to get the rest of the data
      FeedPrecinctCtrl_getFeedPrecinct($scope, $rootScope, $feedsService, $rootScope.getServiceUrl($location.path()), $filter, ngTableParams, precinctid, feedid, localityid);

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
      $scope.feedPrecinct = {};
      $scope.feedEarlyVoteSites = {};
      $scope.feedElectoralDistricts = {};
      $scope.feedPollingLocations = {};
      $scope.feedPrecinctSplits = {};
      $scope.feedStreetSegments = {};
    });
}

/*
 * Get the Feed Precinct for the Feed detail page
 *
 */
function FeedPrecinctCtrl_getFeedPrecinct($scope, $rootScope, $feedsService, servicePath, $filter, ngTableParams, precinctid, feedid, localityid){

  // get Feed Precinct
  $feedsService.getFeedPrecinct(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedPrecinct = data;

      // set the title
      $rootScope.pageHeader.title = "Precinct ID: " + data.id;

      // now call the other services to get the rest of the data
      FeedPrecinctCtrl_getFeedEarlyVoteSites($scope, $rootScope, $feedsService, data.earlyvotesites, $filter, ngTableParams);
      FeedPrecinctCtrl_getFeedElectoralDistricts($scope, $rootScope, $feedsService, data.electoraldistricts, $filter, ngTableParams);
      FeedPrecinctCtrl_getFeedPollingLocations($scope, $rootScope, $feedsService, data.pollinglocations, $filter, ngTableParams);
      FeedPrecinctCtrl_getFeedPrecinctSplits($scope, $rootScope, $feedsService, data.precinctsplits, $filter, ngTableParams);

    }).error(function (data, $http) {

      if($http===404){
        // feed not found

        $rootScope.pageHeader.alert = "Sorry, Precinct  \"" + precinctid + "\" for Locality  \"" + localityid + "\" under VIP feed \"" + feedid + "\" does not exist.";
      } else {
        // some other error

        $rootScope.pageHeader.error += "Could not retrieve Feed Precinct data. ";
      }

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedEarlyVoteSites = {};
      $scope.feedElectoralDistricts = {};
      $scope.feedPollingLocations = {};
      $scope.feedPrecinctSplits = {};
      $scope.feedStreetSegments = {};
    });
}

/*
 * Get the Feed Precinct Early Vote Sites for the Feed detail page
 *
 */
function FeedPrecinctCtrl_getFeedEarlyVoteSites($scope, $rootScope, $feedsService, servicePath, $filter, ngTableParams){

  // get Feed Early Vote Sites
  $feedsService.getFeedPrecinctEarlyVoteSites(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedEarlyVoteSites = data;

      $scope.earlyVoteTableParams = $rootScope.createTableParams(ngTableParams, $filter, data, 15, { id: 'asc' });

    }).error(function (data) {

      $rootScope.pageHeader.error += "Could not retrieve Precinct Early Vote Sites. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedEarlyVoteSites = {};
    });
}

/*
 * Get the Feed Precinct Electoral Districts for the Feed detail page
 *
 */
function FeedPrecinctCtrl_getFeedElectoralDistricts($scope, $rootScope, $feedsService, servicePath, $filter, ngTableParams){

  // get Feed Electoral Districts
  $feedsService.getFeedPrecinctElectoralDistricts(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedElectoralDistricts = data;

      $scope.electoralDistrictsTableParams = $rootScope.createTableParams(ngTableParams, $filter, data, 15, { id: 'asc' });

    }).error(function (data) {

      $rootScope.pageHeader.error += "Could not retrieve Precinct Electoral Districts. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedElectoralDistricts = {};
    });
}

/*
 * Get the Feed Precinct Polling Locations for the Feed detail page
 *
 */
function FeedPrecinctCtrl_getFeedPollingLocations($scope, $rootScope, $feedsService, servicePath, $filter, ngTableParams){

  // get Feed Early Vote Sites
  $feedsService.getFeedPrecinctPollingLocations(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedPollingLocations = data;

      $scope.pollingLocationsTableParams = $rootScope.createTableParams(ngTableParams, $filter, data, 15, { id: 'asc' });

    }).error(function (data) {

      $rootScope.pageHeader.error += "Could not retrieve Precinct Polling Locations. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedPollingLocations = {};
    });
}

/*
 * Get the Feed Precinct Precinct-Splits for the Feed detail page
 *
 */
function FeedPrecinctCtrl_getFeedPrecinctSplits($scope, $rootScope, $feedsService, servicePath, $filter, ngTableParams){

  // get Feed Early Vote Sites
  $feedsService.getFeedPrecinctPrecinctSplits(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedPrecinctSplits = data;

      $scope.precinctSplitsTableParams = $rootScope.createTableParams(ngTableParams, $filter, data, 15, { id: 'asc' });

    }).error(function (data) {

      $rootScope.pageHeader.error += "Could not retrieve Precinct Splits. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedPrecinctSplits = {};
    });
}