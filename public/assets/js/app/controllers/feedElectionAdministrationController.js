'use strict';
/*
 * Feeds Election Administration Controller
 *
 */
function FeedElectionAdministrationCtrl($scope, $rootScope, $feedsService, $routeParams, $appProperties, $location, $filter, ngTableParams) {

  // get the vipfeed param from the route
  var feedid = $routeParams.vipfeed;
  $scope.vipfeed = feedid;

  // create a unique id for this page based on the breadcrumbs
  $scope.pageId = $rootScope.generatePageId(feedid);

  // initialize page header variables
  $rootScope.setPageHeader("Election Administration", $rootScope.getBreadCrumbs(), "feeds", "", null);

  // get general Feed data
  $feedsService.getFeedData(feedid)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedData = data;
      $rootScope.feedData = data;

      // now call the other services to get the rest of the data
      FeedElectionAdministrationCtrl_getFeedElectionAdministration($scope, $rootScope, $feedsService, $rootScope.getServiceUrl($location.path()), $appProperties, $filter, ngTableParams);

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
      $scope.feedElectionAdministration = {};
    });
}

/*
 * Get the Feed Election Administration for the Feed detail page
 *
 */
function FeedElectionAdministrationCtrl_getFeedElectionAdministration($scope, $rootScope, $feedsService, servicePath, $appProperties, $filter, ngTableParams){

  // get Feed State
  $feedsService.getFeedElectionAdministration(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedElectionAdministration = data;

      // update the title
      $rootScope.pageHeader.title = "Election Administration ID: " + data.id;

    }).error(function (data) {

      $rootScope.pageHeader.error += "Could not retrieve Feed Election Administration data. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedElectionAdministration = {};
    });
}