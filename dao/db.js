/**
 * Created by Akelaus on 12/4/13.
 */

//app configuration
var config = require('../config');

//database setup
var mongoose = require('mongoose');
var daoSchemas = require('./schemas');

function dbConnect() {
  mongoose.connect(config.mongoose.connectionString);
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error: '));
  db.once('open', function callback(){
    console.log("Initializing Mongoose...")
    daoSchemas.initSchemas(mongoose);
    console.log("Initialized Mongoose for VIP database.");
  });
};

function getFeedList (callback) {
  daoSchemas.models.Feed.find({}, { payload: 0 })
    .populate('_state')
    .populate('_election', 'electionType date')
    .exec(callback);
};

function getFeedOverview (id, callback) {
  daoSchemas.models.Feed.findById(id, { payload: 0 }, callback);
};

function getFeedSource (feedId, callback) {
  daoSchemas.models.Source.findOne({ _feed: feedId }).populate('_feedContact').exec(callback);
};

function getFeedElection (feedId, callback) {
  var election;
  var promise = daoSchemas.models.Election.findOne({ _feed: feedId }).populate('_state').exec();

  promise.then(function(elec) {
    election = elec;
    return daoSchemas.models.Locality.count({ _feed: feedId }).exec();
  }).then(function(localityCount) {
      election._state.localityCount = localityCount;
      callback(undefined, election);
    });
};

function getElectionOfficial (feedId, officialId, callback) {
  daoSchemas.models.ElectionOfficial.findOne( { _feed: feedId, elementId: officialId }, callback);
};

function getFeedContests (feedId, callback) {
  daoSchemas.models.Contest.find( { _feed: feedId}, callback);
};

function getState (feedId, callback) {
  daoSchemas.models.State.findOne({ _feed: feedId })
    .populate('_electionAdministration')
    .populate('_localities')
    .exec(callback);
};

function getStateEarlyVoteSites (feedId, callback) {
  daoSchemas.models.EarlyVoteSite.find({ _feed: feedId }, callback);
};

function getLocalities (feedId, callback) {
  daoSchemas.models.Locality.find({ _feed: feedId }, callback);
};

function getLocality (feedId, localityId, callback) {
  daoSchemas.models.Locality.findOne({ _feed: feedId, elementId: localityId })
    .populate('_electionAdministration')
    .exec(callback);
};

function getLocalityEarlyVoteSite (feedId, localityId, callback) {
  var promise = daoSchemas.models.EarlyVoteSite.find({ _feed: feedId })
    .populate('_locality')
    .exec();

  promise.then(function (earlyVoteSites) {
    var evs = earlyVoteSites.filter(function(site) {
      return site._locality && site._locality.elementId == localityId;
    });
    callback(undefined, evs);
  });
};

function getLocalityPrecincts (feedId, localityId, callback) {
  daoSchemas.models.Precinct.find({ _feed: feedId, localityId: localityId }, callback);
};

function getLocalityPrecinct (feedId, precinctId, callback) {
  daoSchemas.models.Precinct.findOne({ _feed: feedId, elementId: precinctId }, callback);
};

function getLocalityPrecinctEarlyVoteSites (feedId, precinctId, callback) {
  var promise = daoSchemas.models.Precinct.findOne({ _feed: feedId, elementId: precinctId })
    .select('_earlyVoteSites')
    .exec();

  promise.then(function (precinct) {
    if (precinct) {
      daoSchemas.models.EarlyVoteSite.find({ _id: { $in: precinct._earlyVoteSites } }, callback);
    }
    else { callback(undefined); }
  })
};

function getPrecinctElectoralDistricts (feedId, precinctId, callback) {
  var promise = daoSchemas.models.Precinct.findOne({ _feed: feedId, elementId: precinctId })
    .select('_electoralDistricts')
    .exec();

  promise.then(function (precinct) {
    if (precinct) {
      daoSchemas.models.ElectoralDistrict.find({ _id: { $in: precinct._electoralDistricts } }, callback);
    }
    else { callback(undefined); }
  });
};

function getPrecinctPollingLocations (feedId, precinctId, callback) {
  var promise = daoSchemas.models.Precinct.findOne({ _feed: feedId, elementId: precinctId })
    .select('_pollingLocations')
    .exec();

  promise.then(function (precinct) {
    if (precinct) {
      daoSchemas.models.PollingLocation.find({ _id: { $in: precinct._pollingLocations } }, callback);
    }
    else { callback(undefined); }
  });
};

function getPrecinctPrecinctSplits (feedId, precinctId, callback) {
  daoSchemas.models.PrecinctSplit.find({ _feed: feedId, precinctId: precinctId }, callback);
};

function getPrecinctStreetSegments (feedId, precinctId, callback) {
  daoSchemas.models.StreetSegment.find({ _feed: feedId, precinctId: precinctId }, callback);
};

function feedPrecinctSplit (feedId, precinctSplitId, callback) {
  daoSchemas.models.PrecinctSplit.findOne({ _feed: feedId, elementId: precinctSplitId }, callback);
};

function feedPrecinctSplitElectoralDistricts (feedId, precinctSplitId, callback) {
  var promise = daoSchemas.models.PrecinctSplit.findOne({ _feed: feedId, elementId: precinctSplitId })
    .populate('_electoralDistricts')
    .select('_electoralDistricts')
    .exec();

  promise.then(function (precinctSplit) {
    if (precinctSplit) {
      callback(undefined, precinctSplit._electoralDistricts);
    }
    else { callback(undefined); }
  });
};

function feedPrecinctSplitPollingLocations (feedId, precinctSplitId, callback) {
  var promise = daoSchemas.models.PrecinctSplit.findOne({ _feed: feedId, elementId: precinctSplitId })
    .populate('_pollingLocations')
    .select('_pollingLocations')
    .exec();

  promise.then(function (precinctSplit) {
    if (precinctSplit) {
      callback(undefined, precinctSplit._pollingLocations);
    }
    else { callback(undefined); }
  });
};

function feedPrecinctSplitStreetSegments (feedId, precinctSplitId, callback) {
  daoSchemas.models.StreetSegment.find({ _feed: feedId, precinctSplitId: precinctSplitId }, callback);
};

function feedEarlyVoteSite (feedId, earlyVoteSiteId, callback) {
  daoSchemas.models.EarlyVoteSite.findOne({ _feed: feedId, elementId: earlyVoteSiteId }, callback);
};

function feedStateElectionAdministration (feedId, callback) {
  var promise = daoSchemas.models.State.findOne({ _feed: feedId })
    .populate('_electionAdministration')
    .exec();

  promise.then(function (state) {
    if (state && state._electionAdministration) {
      state._electionAdministration.populate('_electionOfficial _overseasVoterContact', callback);
    }
    else { callback(); }
  });
};

function feedLocalityElectionAdministration (feedId, localityId, callback) {
  var promise = daoSchemas.models.Locality.findOne({ _feed: feedId, elementId: localityId })
    .populate('_electionAdministration')
    .exec();

  promise.then(function (locality) {
    if (locality && locality._electionAdministration) {
      locality._electionAdministration.populate('_electionOfficial _overseasVoterContact', callback);
    }
    else { callback(); }
  });
};

function feedContest (feedId, contestId, callback) {
  daoSchemas.models.Contest.findOne({ _feed: feedId, elementId: contestId })
    .populate('_ballot _electoralDistrict _contestResult _ballotLineResults')
    .exec(callback);
};

function feedContestElectoralDistrict(feedId, contestId, callback) {
  var promise = daoSchemas.models.Contest.findOne({ _feed: feedId, elementId: contestId })
    .populate('_electoralDistrict')
    .exec();

  promise.then(function(contest) {
    return daoSchemas.models.ElectoralDistrict.populate(contest._electoralDistrict,
      [
        { path: '_contest', model: daoSchemas.models.Contest.modelName },
        { path: '_precincts', model: daoSchemas.models.Precinct.modelName },
        { path: '_precinctSplits', model: daoSchemas.models.PrecinctSplit.modelName }
      ]);
  }).then(function(electoralDistrict) {
      electoralDistrict.populate(
        { path: '_precinctSplits._precinct', select: 'localityId', model: daoSchemas.models.Precinct.modelName },
        callback);
    });
};

function feedElectoralDistrict(feedId, districtId, callback) {
  var promise = daoSchemas.models.ElectoralDistrict.findOne({ _feed: feedId, elementId: districtId })
    .exec();

  promise.then(function(electoralDistrict) {
    return daoSchemas.models.ElectoralDistrict.populate(electoralDistrict,
      [
        { path: '_contest', model: daoSchemas.models.Contest.modelName },
        { path: '_precincts', model: daoSchemas.models.Precinct.modelName },
        { path: '_precinctSplits', model: daoSchemas.models.PrecinctSplit.modelName }
      ]);
  }).then(function(electoralDistrict) {
      electoralDistrict.populate(
        { path: '_precinctSplits._precinct', select: 'localityId', model: daoSchemas.models.Precinct.modelName },
        callback);
    });
};

function feedContestBallot(feedId, contestId, callback) {
  var promise = daoSchemas.models.Contest.findOne({ _feed: feedId, elementId: contestId })
    .populate('_ballot')
    .exec();

  promise.then(function (contest) {
    if (contest) {
      return daoSchemas.models.Ballot.populate(contest._ballot,
      [
        { path: '_referenda', model: daoSchemas.models.Referendum.modelName },
        { path: 'candidates._candidate', model: daoSchemas.models.Candidate.modelName },
        { path: '_customBallot', model: daoSchemas.models.CustomBallot.modelName }
      ]);
    }
    else {
      callback(undefined, null);
    }
  }).then(function(ballot) {
      daoSchemas.models.BallotResponse.populate(ballot,
        { path: '_customBallot.ballotResponses._response' },
        callback);
    });
};

function feedBallotCandidates(feedId, contestId, callback) {
  var promise = daoSchemas.models.Contest.findOne({ _feed: feedId, elementId: contestId })
    .populate('_ballot')
    .exec();

  promise.then(function (contest) {
    if (contest) {
      return daoSchemas.models.Candidate.populate(contest._ballot, { path: 'candidates._candidate' });
    }
    else {
      callback(undefined, null);
    }
  }).then(function(ballot) {
      callback(undefined, ballot.candidates);
    });
};

function feedCandidate(feedId, candidateId, callback) {
  daoSchemas.models.Candidate.findOne({ _feed: feedId, elementId: candidateId }, callback);
};

function feedBallotReferenda(feedId, contestId, callback) {
  var promise = daoSchemas.models.Contest.findOne({ _feed: feedId, elementId: contestId })
    .populate('_ballot')
    .exec();

  promise.then(function(contest) {
    if (contest && contest._ballot) {
      return daoSchemas.models.Ballot.populate(contest._ballot, '_referenda');
    } else {
      callback(undefined, null);
    }
  }).then(function(ballot) {
      daoSchemas.models.BallotResponse.populate(ballot._referenda, 'ballotResponses._response', callback);
    });
};

function feedBallotReferendum(feedId, referendumId, callback) {
  daoSchemas.models.Referendum
    .findOne({ _feed: feedId, elementId: referendumId })
    .populate('ballotResponses._response')
    .exec(callback);
};

function getPollingLocation(feedId, pollingLocationId, callback) {
  daoSchemas.models.PollingLocation
    .findOne({ _feed: feedId, elementId: pollingLocationId })
    .populate('_precincts _precinctSplits')
    .exec(callback);
};

function getContestResult(feedId, contestId, callback) {
  var promise = daoSchemas.models.Contest.findOne({ _feed: feedId, elementId: contestId })
    .populate('_contestResult')
    .exec();

  promise.then(function(contest) {
    return daoSchemas.models.ContestResult.populate(contest._contestResult, '_contest _state _locality _precinct _precinctSplit _electoralDistrict');
  }).then(function(contestResult) {
      contestResult.populate(
        { path: '_precinctSplit._precinct', select: 'localityId', model: daoSchemas.models.Precinct.modelName },
        callback);
    });
}

function getContestBallotLineResults(feedId, contestId, callback) {
  var promise = daoSchemas.models.Contest.findOne({ _feed: feedId, elementId: contestId })
    .populate('_ballotLineResults')
    .exec()

  promise.then(function(contest) {
    if (contest) {
      callback(undefined, contest._ballotLineResults);
    } else { callback(undefined, null); }

  });
}

function getBallotLineResult(feedId, blrId, callback) {
  var promise = daoSchemas.models.BallotLineResult.findOne({ _feed: feedId, elementId: blrId })
    .populate('_contest _candidate _ballotResponse _state _locality _precinct _precinctSplit _electoralDistrict')
    .exec();

  promise.then(function(blr) {
    blr.populate(
      { path: '_precinctSplit._precinct', select: 'localityId', model: daoSchemas.models.Precinct.modelName },
      callback);
  });
}

exports.getFeeds = getFeedList;
exports.getFeedOverview = getFeedOverview;
exports.getFeedSource = getFeedSource;
exports.getFeedElection = getFeedElection;
exports.getElectionOfficial = getElectionOfficial;
exports.getFeedContests = getFeedContests;
exports.getState = getState;
exports.getStateEarlyVoteSites = getStateEarlyVoteSites;
exports.feedStateElectionAdministration = feedStateElectionAdministration;
exports.getLocalities = getLocalities;
exports.getLocality = getLocality;
exports.getLocalityEarlyVoteSite = getLocalityEarlyVoteSite;
exports.feedLocalityElectionAdministration = feedLocalityElectionAdministration;
exports.getLocalityPrecincts = getLocalityPrecincts;
exports.getLocalityPrecinct = getLocalityPrecinct;
exports.getLocalityPrecinctEarlyVoteSites = getLocalityPrecinctEarlyVoteSites;
exports.getPrecinctElectoralDistricts = getPrecinctElectoralDistricts;
exports.getPrecinctPollingLocations = getPrecinctPollingLocations;
exports.getPrecinctPrecinctSplits = getPrecinctPrecinctSplits;
exports.getPrecinctStreetSegments = getPrecinctStreetSegments;
exports.feedPrecinctSplit = feedPrecinctSplit;
exports.feedPrecinctSplitElectoralDistricts = feedPrecinctSplitElectoralDistricts;
exports.feedPrecinctSplitPollingLocations = feedPrecinctSplitPollingLocations;
exports.feedPrecinctSplitStreetSegments = feedPrecinctSplitStreetSegments;
exports.feedEarlyVoteSite = feedEarlyVoteSite;
exports.feedContest = feedContest;
exports.feedContestElectoralDistrict = feedContestElectoralDistrict;
exports.feedElectoralDistrict = feedElectoralDistrict;
exports.feedBallotCandidates = feedBallotCandidates;
exports.feedContestBallot = feedContestBallot;
exports.feedCandidate = feedCandidate;
exports.feedBallotReferenda = feedBallotReferenda;
exports.feedBallotReferendum = feedBallotReferendum;
exports.getPollingLocation = getPollingLocation;
exports.getContestResult = getContestResult;
exports.getContestBallotLineResults = getContestBallotLineResults;
exports.getBallotLineResult = getBallotLineResult;
exports.dbConnect = dbConnect;
