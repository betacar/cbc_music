var recommendation = require('../../app/recommendations/lib');
var helper         = require('../helper');

describe('The recommendation lib', function(){
  after(function () {
    helper.clearAll();
  });

  describe('with no saved data', function() {
    before(function() {
      helper.clearAll();
    });

    it('returns an exception if the user parameter is not defined', function() {
      (function() {
        recommendation();
      }).should.throw(Error('user id is required'));
    });

    it('returns an exception if the user does not exists', function() {
      (function() {
        recommendation('a');
      }).should.throw(Error('user id a does not exists in the database'));
    });
  });

  describe('with saved data', function() {
    before(function() {
      helper.loadAll();
    });

    it('returns an exception if the user parameter is not defined', function() {
      (function() {
        recommendation();
      }).should.throw(Error('user id is required'));
    });

    it('returns an exception if the user does not exists', function() {
      (function() {
        recommendation('betacar');
      }).should.throw(Error('user id a does not exists in the database'));
    });

    it('does not return an exception if the user exists', function() {
      (function() {
        recommendation('a');
      }).should.not.throw(Error('user id is required'));
    });

    it('returns an array with a length of 5 string elements', function() {
      var result = recommendation('a');

      result.should.be.an.Array;
      result.should.have.length(5);
      result.map(function(music) {
        music.should.be.a.String;
      });
    });
  });
});
