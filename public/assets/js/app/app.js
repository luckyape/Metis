'use strict';
/*
 * VIP App
 *
 */
// Comment in if want to disable all "debug" logging
//debug.setLevel(0);

// VIP app module with its dependencies
var vipApp;
if(globalVars.isTesting)
  vipApp = angular.module('vipApp', ['ngTable', 'ngRoute', 'ngCookies', 'ngMockE2E']);
else
  vipApp = angular.module('vipApp', ['ngTable', 'ngRoute', 'ngCookies']);

// Constants
vipApp.constant('$appProperties', {
  contextRoot: '',
  servicesPath: '/services'
});

/*
 * VIP App configuration
 *
 * Will setup routing and retrieve reference data for the app before any pages are loaded
 *
 */
vipApp.config(['$routeProvider', '$appProperties', '$httpProvider', '$logProvider',
  function ($routeProvider, $appProperties, $httpProvider, $logProvider) {

    // disable the logProvider's debugging as Ngtable uses it and it crowds out all other logging
    // without any other way to turn it off
    $logProvider.debugEnabled(false);

    $routeProvider.when('/', {
      templateUrl: $appProperties.contextRoot + '/app/partials/home.html',
      controller: 'HomeCtrl'
    });

    $routeProvider.when('/admin', {
      templateUrl: $appProperties.contextRoot + '/app/partials/admin.html',
      controller: 'AdminCtrl'
    });

    $routeProvider.when('/feeds', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feeds.html',
      controller: 'FeedsCtrl'
    });

    $routeProvider.when('/feeds/:vipfeed', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feed-overview.html',
      controller: 'FeedOverviewCtrl'
    });

    $routeProvider.when('/feeds/:vipfeed/source', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feed-source.html',
      controller: 'FeedSourceCtrl'
    });

    $routeProvider.when('/feeds/:vipfeed/election', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feed-election.html',
      controller: 'FeedElectionCtrl'
    });

    $routeProvider.when('/feeds/:vipfeed/election/state', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feed-state.html',
      controller: 'FeedStateCtrl'
    });

    $routeProvider.when('/feeds/:vipfeed/election/state/localities', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feed-localities.html',
      controller: 'FeedLocalitiesCtrl'
    });

    $routeProvider.when('/feeds/:vipfeed/election/state/localities/:locality', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feed-locality.html',
      controller: 'FeedLocalityCtrl'
    });

    $routeProvider.when('/feeds/:vipfeed/election/state/localities/:locality/precincts', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feed-precincts.html',
      controller: 'FeedPrecinctsCtrl'
    });

    $routeProvider.when('/feeds/:vipfeed/election/state/localities/:locality/precincts/:precinct', {
      templateUrl: $appProperties.contextRoot + '/app/partials/feed-precinct.html',
      controller: 'FeedPrecinctCtrl'
    });


    // done
    $routeProvider.when('/template/feed', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/feed.html'
    });
    // done
    $routeProvider.when('/template/source', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/source.html'
    });
    // done
    $routeProvider.when('/template/election', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/election.html'
    });
    // done
    $routeProvider.when('/template/state', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/state.html'
    });
    // done
    $routeProvider.when('/template/locality', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/locality.html'
    });

    $routeProvider.when('/template/precinct', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/precinct.html'
    });

    $routeProvider.when('/template/precinct-split', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/precinct-split.html'
    });

    $routeProvider.when('/template/election-administration', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/election-administration.html'
    });

    $routeProvider.when('/template/early-vote-site', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/early-vote-site.html'
    });

    $routeProvider.when('/template/polling-location', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/polling-location.html'
    });

    $routeProvider.when('/template/contests', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/contests.html'
    });

    $routeProvider.when('/template/contest', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/contest.html'
    });

    $routeProvider.when('/template/ballot', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/ballot.html'
    });

    $routeProvider.when('/template/candidate', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/candidate.html'
    });

    $routeProvider.when('/template/electoral-district', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/electoral-district.html'
    });

    $routeProvider.when('/template/contest-result', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/contest-result.html'
    });

    $routeProvider.when('/template/ballot-line-result', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/ballot-line-result.html'
    });

    $routeProvider.when('/template/results', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/results.html'
    });

    $routeProvider.when('/template/errors', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/errors.html'
    });

    $routeProvider.when('/template/search-results', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/search-results.html'
    });

    $routeProvider.when('/template/grid', {
      templateUrl: $appProperties.contextRoot + '/app/partials/templates/grid.html'
    });



    $routeProvider.when('/profile', {
      templateUrl: $appProperties.contextRoot + '/app/partials/profile.html',
      controller: 'ProfileCtrl'
    });

    $routeProvider.when('/styleguide', {
      templateUrl: $appProperties.contextRoot + '/app/partials/styleguide.html',
      controller: 'StyleguideCtrl'
    });

    // default when no path specified
    $routeProvider.otherwise({redirectTo: '/'});



    /*
     * HTTP Interceptor
     * Will be used to check to see if user is authenticated
     */
    $httpProvider.responseInterceptors.push(function ($q, $location, $rootScope) {
      return function (promise) {
        return promise.then(
          // Success: just return the response
          function (response) {

            // if the user is logged in and going to the home page,
            // redirect to the feeds page
            if ($rootScope.user !== null && $rootScope.user.isAuthenticated === true && $location.path() === "/") {

              $location.url('/feeds');
            }

            return response;
          },
          // Error: check the error status for 401
          // and if so redirect back to homepage
          function (response) {
            if (response.status === 401) {
              // nullify the user object
              $rootScope.user = null;
              $location.url('/');
            }
            return $q.reject(response);
          });
      }
    });

  }
]);

/*
 * Static initialization block
 *
 */
vipApp.run(function ($rootScope, $appService, $location, $httpBackend, $appProperties, $window, $anchorScroll) {

  // TODO
  // initialize the cache for the app
  //$rootScope.cache = $cacheFactory('vipApp');
  InterceptorSetup($httpBackend, $appProperties);

  $rootScope.pageHeader = {};
  $rootScope.user = null;

  //when the route is changed scroll to the top of the page
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $anchorScroll();
  });

  /*
   * Sets PageHeader values
   *
   * @param title - the Title of the page
   * @breadcrumbs - the breadcrumbs as an array
   * @section - section name used for the navigation bar "home", "admin", "feeds", "profile"
   * @error - error message to show on the screen
   * @error - alert message to show on the screen
   */
  $rootScope.setPageHeader = function (title, breadcrumbs, section, error, alert) {

    this.pageHeader.title = title;
    this.pageHeader.section = section;
    this.pageHeader.breadcrumbs = breadcrumbs;
    this.pageHeader.error = error;
    this.pageHeader.alert = alert;
  };

  // Before we render any pages,
  // see if user is authenticated or not and take appropriate action
  $appService.getUser()
    .success(function (data) {

      // set user object
      $rootScope.user = data;

      // redirect to home page if not authenticated
      if (data ===null || data.isAuthenticated == false) {
        $location.path("/");
      }

    }).error(function (data) {

      // if we get an error, we could not connect to the server to check to
      // see if the user is authenticated, this should not happen
      $rootScope.pageHeader.error = "Server Error";
      $location.path("/");
    });

  // expose the $location into the scope
  $rootScope.$location = $location;


  // set a flag to determine if the screen is in mobile dimensions
  var mobileThreshhold = 1116;
  $rootScope.mobileDimensions = ($window.innerWidth < mobileThreshhold);
  $rootScope.toggleAside = true;
  window.onresize = function(){
    $rootScope.mobileDimensions = ($window.innerWidth < mobileThreshhold);
    if(!$rootScope.mobileDimensions){

      $rootScope.toggleAside = true;
    }
    $rootScope.$apply();
  }

  $rootScope.toggleAsideFunc = function(){
    if($rootScope.mobileDimensions){
      $rootScope.toggleAside = !$rootScope.toggleAside;
    }
  }

  $rootScope.createTableParams = function(ngTableParams, $filter, data, count, sorting) {
    // sets the defaults for the table sorting parameters
    return new ngTableParams({
      page: 1,
      count: count,
      sorting: sorting
    }, {
      total: data.length,
      // sets the type of sorting for the table
      getData: function ($defer, params) {
        var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  };

  /*
   * Currently takes the current URL path and turns it into a service path used
   * to get the data for the current page
   */
  $rootScope.getServiceUrl = function(urlPath){
    return "/services" + urlPath;
  }

});
