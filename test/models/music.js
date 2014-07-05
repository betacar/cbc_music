var request = require('supertest');
var assert  = require('assert');
var helper  = require('../helper');
var Music   = require('../../app/music/model');

describe('The music model', function() {
  describe('with no saved music', function() {
    before(function() {
      helper.clearMusic();
    });

    it('returns an empty object', function() {
      Music.all().should.eql({});
    });
  });

  after(function() {
    helper.clearMusic();
  });
});
