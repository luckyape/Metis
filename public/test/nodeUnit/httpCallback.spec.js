/**
 * Created by rcartier13 on 1/14/14.
 */

var proxyquire = require('proxyquire');
var nodeUtil = require('./nodeUtil');
var daoStub = { };
var feedStub = { };
var res = { };

res.json = function(something) {
  expect(true).toBeTruthy();
};

var map = function(callback) {
  callback(null);
};

var req = { path: 'path', params: {feedid: 1, localityid: 2, precinctid: 3, splitid: 4, evsid: 5, contestid: 6, candidateid: 7, districtid: 8, blrid: 9, referendumid: 10} };
var httpCallback = proxyquire('../../../services/HttpCallbacks', {'../dao/db': daoStub, './mappers/feed': feedStub});

describe('Feeds Unit Tests', function() {
  describe('Not Found Handler Test', function() {
    it('sends a 404 if feed is null', function(done) {
      daoStub.getFeedOverview = function(feedId, callback) {
        callback(null, null);
      };

      res.send = function(err) {
        expect(err).toBe(404);
        done();
      };
      httpCallback.feedOverviewGET(req, res);
    });
  });

  describe('All Feeds GET Test', function() {
    it('Calls json', function() {
      daoStub.getFeeds = function(callback) {
        var data = {map: map}
        callback(null, data);
      };
      feedStub.mapFeed = function(path, data) {
        return;
      };
      httpCallback.allFeedsGET(req, res);
    });
  });

  describe('Feed Oveview GET Test', function() {
    it('Calls Json function', function() {
      daoStub.getFeedOverview = nodeUtil.daoFunc;
      feedStub.mapFeedOverview = nodeUtil.feedFunc;
      httpCallback.feedOverviewGET(req,res);
    });
  });

  describe('Feed Source GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getFeedSource = nodeUtil.daoFunc;
      feedStub.mapSource = nodeUtil.feedFunc;
      httpCallback.feedSourceGET(req, res);
    });
  });

  describe('Feed Election GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getFeedElection = nodeUtil.daoFunc;
      feedStub.mapElection = nodeUtil.feedFunc;
      httpCallback.feedElectionGET(req, res);
    });
  });

  describe('Feed State GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getState = nodeUtil.daoFunc;
      feedStub.mapState = nodeUtil.feedFunc;
      httpCallback.feedStateGET(req, res);
    });
  });

  describe('Feed State Early Vote Sites GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getStateEarlyVoteSites = nodeUtil.daoFunc;
      feedStub.mapEarlyVoteSites = nodeUtil.feedFunc;
      httpCallback.feedStateEarlyVoteSitesGET(req, res);
    });
  });

  describe('Feed Locality GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getLocality = nodeUtil.daoFunc;
      feedStub.mapLocality = nodeUtil.feedFunc;
      httpCallback.feedLocalityGET(req, res);
    });
  });

  describe('Feed Localities GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getLocalities = nodeUtil.daoFunc;
      feedStub.mapLocalities = nodeUtil.feedFunc;
      httpCallback.feedLocalitiesGET(req, res);
    });
  });

  describe('Feed Locality Early Vote Sites GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getLocalityEarlyVoteSite = nodeUtil.daoFunc;
      feedStub.mapEarlyVoteSites = nodeUtil.feedFunc;
      httpCallback.feedLocalityEarlyVoteSitesGET(req, res);
    });
  });

  describe('Feed Locality Precincts GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getLocalityPrecincts = nodeUtil.daoFunc;
      feedStub.mapLocalityPrecincts = nodeUtil.feedFunc;
      httpCallback.feedLocalityPrecinctsGET(req, res);
    });
  });

  describe('Feed Precinct GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getLocalityPrecinct = nodeUtil.daoFunc;
      feedStub.mapPrecinct = nodeUtil.feedFunc;
      httpCallback.feedPrecinctGET(req, res);
    });
  });

  describe('Feed Precinct Early Vote Sites GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getLocalityPrecinctEarlyVoteSites = nodeUtil.daoFunc;
      feedStub.mapEarlyVoteSites = nodeUtil.feedFunc;
      httpCallback.feedPrecinctEarlyVoteSitesGET(req, res);
    });
  });

  describe('Feed Precinct Electoral Districts GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getPrecinctElectoralDistricts = nodeUtil.daoFunc;
      feedStub.mapElectoralDistricts = nodeUtil.feedFunc;
      httpCallback.feedPrecinctElectoralDistrictsGET(req, res);
    });
  });

  describe('Feed Precinct Polling Locations GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getPrecinctPollingLocations = nodeUtil.daoFunc;
      feedStub.mapPollingLocations = nodeUtil.feedFunc;
      httpCallback.feedPrecinctPollingLocationsGET(req, res);
    });
  });

  describe('Feed Precinct Precinct Split GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getPrecinctPrecinctSplits = nodeUtil.daoFunc;
      feedStub.mapPrecinctPrecinctSplits = nodeUtil.feedFunc;
      httpCallback.feedPrecinctPrecinctSplitsGET(req, res);
    });
  });

  describe('Feed Precinct Street Segments GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getPrecinctStreetSegments = nodeUtil.daoFunc;
      feedStub.mapStreetSegments = nodeUtil.feedFunc;
      httpCallback.feedPrecinctStreetSegmentsGET(req, res);
    });
  });

  describe('Feed Election Contests GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getFeedContests = function(feedId, callback) {
        var contests = {map: map};
        callback(null, contests);
      };
      feedStub.mapElectionContest = nodeUtil.feedFunc;
      httpCallback.feedElectionContestsGET(req, res);
    });
  });

  describe('Feed Precinct Split GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedPrecinctSplit = nodeUtil.daoFunc;
      feedStub.mapPrecinctSplit = nodeUtil.feedFunc;
      httpCallback.feedPrecinctSplitGET(req, res);
    });
  });

  describe('Feed Precinct Split Polling Locations GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedPrecinctSplitPollingLocations = nodeUtil.daoFunc;
      feedStub.mapPollingLocations = nodeUtil.feedFunc;
      httpCallback.feedPrecinctSplitPollingLocationsGET(req, res);
    });
  });

  describe('Feed Precinct Split Street Segments GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedPrecinctSplitStreetSegments = nodeUtil.daoFunc;
      feedStub.mapStreetSegments = nodeUtil.feedFunc;
      httpCallback.feedPrecinctSplitStreetSegmentsGET(req, res);
    });
  });

  describe('Feed Early Vote Site GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedEarlyVoteSite = nodeUtil.daoFunc;
      feedStub.mapEarlyVoteSite = nodeUtil.feedFunc;
      httpCallback.feedEarlyVoteSiteGET(req, res);
    });
  });

  describe('Feed State Election Administration GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedStateElectionAdministration = nodeUtil.daoFunc;
      feedStub.mapElectionAdministration = nodeUtil.feedFunc;
      httpCallback.feedStateElectionAdministrationGET(req, res);
    });
  });

  describe('Feed Locality Election Administration GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedLocalityElectionAdministration = nodeUtil.daoFunc;
      feedStub.mapElectionAdministration = nodeUtil.feedFunc;
      httpCallback.feedLocalityElectionAdministrationGET(req, res);
    });
  });

  describe('Feed Contest GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedContest = nodeUtil.daoFunc;
      feedStub.mapContest = nodeUtil.feedFunc;
      httpCallback.feedContestGET(req, res);
    });
  });

  describe('Feed Contest Electoral District GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedContestElectoralDistrict = nodeUtil.daoFunc;
      feedStub.mapElectoralDistrict = nodeUtil.feedFunc;
      httpCallback.feedContestElectoralDistrictGET(req, res);
    });
  });

  describe('Feed Precinct Electoral District GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedElectoralDistrict = nodeUtil.daoFunc;
      feedStub.mapElectoralDistrict = nodeUtil.feedFunc;
      httpCallback.feedPrecinctElectoralDistrictGET(req, res);
    });
  });

  describe('Feed Precinct Split Electoral District GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedElectoralDistrict = nodeUtil.daoFunc;
      feedStub.mapElectoralDistrict = nodeUtil.feedFunc;
      httpCallback.feedPrecinctSplitElectoralDistrictGET(req, res);
    });
  });

  describe('Feed Contest Ballot GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedContestBallot = nodeUtil.daoFunc;
      feedStub.mapBallot = nodeUtil.feedFunc;
      httpCallback.feedContestBallotGET(req, res);
    });
  });

  describe('Feed Ballot Candidates GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedBallotCandidates = nodeUtil.daoFunc;
      feedStub.mapBallotCandidates = nodeUtil.feedFunc;
      httpCallback.feedBallotCandidatesGET(req, res);
    });
  });

  describe('Feed Candidate GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedCandidate = nodeUtil.daoFunc;
      feedStub.mapCandidate = nodeUtil.feedFunc;
      httpCallback.feedCandidateGET(req, res);
    });
  });

  describe('Feed Ballot Referenda GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedBallotReferenda = nodeUtil.daoFunc;
      feedStub.mapReferenda = nodeUtil.feedFunc;
      httpCallback.feedBallotReferendaGET(req, res);
    });
  });

  describe('Feed Ballot Referendum GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.feedBallotReferendum = nodeUtil.daoFunc;
      feedStub.mapReferendum = nodeUtil.feedFunc;
      httpCallback.feedBallotReferendumGET(req, res);
    });
  });

  describe('Feed Contest Result GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getContestResult = nodeUtil.daoFunc;
      feedStub.mapContestResult = nodeUtil.feedFunc;
      httpCallback.feedContestResultGET(req, res);
    });
  });

  describe('Feed Contest Ballot Line Results GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getContestBallotLineResults = nodeUtil.daoFunc;
      feedStub.mapBallotLineResults = nodeUtil.feedFunc;
      httpCallback.feedContestBallotLineResultsGET(req, res);
    });
  });

  describe('Feed Ballot Line Result GET Test', function() {
    it('Calls Json Function', function() {
      daoStub.getBallotLineResult = nodeUtil.daoFunc;
      feedStub.mapBallotLineResult = nodeUtil.feedFunc;
      httpCallback.feedBallotLineResultGET(req, res);
    });
  });
});