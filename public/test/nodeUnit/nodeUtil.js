/**
 * Created by rcartier13 on 1/10/14.
 */

var util = {
  mapperTest: function(saveFunc, model, xml, done) {
    var isPassing = false;
    model.mapXml3_0(xml);
    model.model.save = saveFunc;
    model.save(function() {}, function() { isPassing = true; });

    waitsFor(function() {
      return isPassing == true;
    }, 5000);

    runs(function() {
      done();
    });
  },

  testXmlAddress: function(first, second) {
    expect(first.locationName).toBe(second.location_name);
    expect(first.line1).toBe(second.line1);
    expect(first.line2).toBe(second.line2);
    expect(first.line3).toBe(second.line3);
    expect(first.city).toBe(second.city);
    expect(first.state).toBe(second.state);
    expect(first.zip).toBe(second.zip);
  },

  daoFunc: function(feedId, first, second) {
    if(!second)
      first(null, feedId);
    else
      second(null, first);
  },

  feedFunc: function(path, election) {
    return;
  },

  testElectionAdmin: function(first, second) {
    expect(first.id).toBe(second.elementId);
    expect(first.name).toBe(second.name);
    expect(first.address).toBe(second.physicalAddress.city +', ' + second.physicalAddress.state + ' ' + second.physicalAddress.zip);
  },

  testMapperAddress: function(first, second) {
    expect(first.location_name).toBe(second.location_name);
    expect(first.line1).toBe(second.line1);
    expect(first.line2).toBe(second.line2);
    expect(first.line3).toBe(second.line3);
    expect(first.city).toBe(second.city);
    expect(first.state).toBe(second.state);
    expect(first.zip).toBe(second.zip);
  },

  testElectionOfficial: function(first, second) {
    expect(first.id).toBe(second.elementId);
    expect(first.name).toBe(second.name);
    expect(first.title).toBe(second.title);
    expect(first.phone).toBe(second.phone);
    expect(first.fax).toBe(second.fax);
    expect(first.email).toBe(second.email);
  }
};

module.exports = util;