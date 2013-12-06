'use strict';
/*
 * Feeds Controller
 *
 */
function FeedsCtrl($scope, $rootScope, $feedsService, $location) {

  var breadcrumbs = [
    {
      name: "Feeds",
      url: $location.absUrl()
    }
  ];

  // initialize page header variables
  $rootScope.setPageHeader("Feeds", breadcrumbs, "feeds", null);

  // call our service
  $feedsService.getData()
    .success(function (data) {

      // set the feeds data into the Angular model
      $scope.feeds = data;

    }).error(function (data) {

      $rootScope.pageHeader.error = "Could not retrieve Feeds Data."
    });
}
