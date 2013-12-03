/**
 * Created by bantonides on 12/3/13.
 */
var utils = require('./utils');

var registerFeedsServices = function (app) {
  /*
   * REST endpoints associated with Feed data
   */
  app.get('/services/feeds', utils.ensureAuthentication, allFeedsGET);


};

var mockFeeds = [
  {
    date: '2014/11/04',
    state: 'OH',
    type: 'General1',
    status: 'Revisions Needed',
    edit: 'vipfeed-37-2014-11-04'
  },
  {
    date: '2014/11/05',
    state: 'OH',
    type: 'General2',
    status: 'Revisions Needed',
    edit: 'vipfeed-37-2014-11-05'
  },
  {
    date: '2014/11/06',
    state: 'OH',
    type: 'General3',
    status: 'Revisions Needed',
    edit: 'vipfeed-37-2014-11-06'
  },
  {
    date: '2014/11/07',
    state: 'OH',
    type: 'General4',
    status: 'Revisions Needed',
    edit: 'vipfeed-37-2014-11-07'
  },
  {
    date: '2014/11/08',
    state: 'OH',
    type: 'General5',
    status: 'Revisions Needed',
    edit: 'vipfeed-37-2014-11-08'
  }
];

/*
 * Callbacks for HTTP verbs
 */
allFeedsGET = function (req, res) {
  res.json(mockFeeds);
};

exports.registerFeedsServices = registerFeedsServices;