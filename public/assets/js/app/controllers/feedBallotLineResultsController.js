/**
 * Created by rcartier13 on 1/30/14.
 */

function FeedBallotLineResultsCtrl($scope, $rootScope, $feedsService, $routeParams, $appProperties, $location, $filter, ngTableParams) {

  // get the vipfeed param from the route
  var feedid = $routeParams.vipfeed;
  $scope.vipfeed = feedid;

  // initialize page header variables
  $rootScope.setPageHeader("Ballot Line Results", $rootScope.getBreadCrumbs(), "feeds", "", null);

  // get general Feed data
  $feedsService.getFeedData(feedid)
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feedData = data;
      $rootScope.feedData = data;

      // now call the other services to get the rest of the data
      FeedBallotLineResultsCtrl_getFeedBallotLineResults($scope, $rootScope, $feedsService, $rootScope.getServiceUrl($location.path()), $appProperties, $filter, ngTableParams);

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
      $scope.feedBallotLineResult = {};
    });
};

function FeedBallotLineResultsCtrl_getFeedBallotLineResults ($scope, $rootScope, $feedsService, servicePath, $appProperties, $filter, ngTableParams) {
  $feedsService.getFeedBallotLineResult(servicePath)
    .success(function(data) {

      // set the feeds data into the Angular model
      $scope.feedBallotLineResults = data;

      $rootScope.ballotLineResultsTableParams = $rootScope.createTableParams(ngTableParams, $filter, data, $appProperties.highPagination, { id: 'asc' });

      // set the title
      $rootScope.pageHeader.title = data.length + " Ballot Line Results";
    }).error(function(data, $http) {
      $rootScope.pageHeader.error += "Could not retrieve Feed Ballot Line Result data. ";

      // so the loading spinner goes away and we are left with an empty table
      $scope.feedBallotLineResults = {};
    });
}