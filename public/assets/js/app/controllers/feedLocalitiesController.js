'use strict';
/*
 * Feeds Locality Controller
 *
 */
function FeedLocalitiesCtrl($scope, $rootScope, $feedsService, $routeParams, $appProperties, $location, $filter, ngTableParams) {

  // get the vipfeed param from the route
  var feedid = $routeParams.vipfeed;
  $scope.vipfeed = feedid;

  // initialize page header variables
  $rootScope.setPageHeader("Localities", $rootScope.getBreadCrumbs(), "feeds", "", null);

  // get general Feed data
  $feedsService.getFeedData(feedid)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedData = data;
      $rootScope.feedData = data;

      // now call the other services to get the rest of the data
      FeedLocalitiesCtrl_getFeedLocalities($scope, $rootScope, $feedsService, data.localities, $appProperties, $filter, ngTableParams);

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
      $scope.feedLocalities = {};
    });
}

/*
 * Get the Feed Localities for the Feed detail page
 *
 */
function FeedLocalitiesCtrl_getFeedLocalities($scope, $rootScope, $feedsService, servicePath, $appProperties, $filter, ngTableParams){

  // get Feed Locality
  $feedsService.getFeedLocalities(servicePath)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedLocalities = data;

      // sets the defaults for the table sorting parameters
      $scope.localitiesTableParams = $rootScope.createTableParams(ngTableParams, $filter, data, $appProperties.highPagination, { id: 'asc' });

      // set the title
      $rootScope.pageHeader.title = $scope.feedLocalities.length + " Localities";


    }).error(function (data, $http) {

      $rootScope.pageHeader.error += "Could not retrieve Feed Localities data. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedLocalities = {};
    });
}
