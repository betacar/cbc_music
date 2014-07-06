var request = require('supertest');
var assert  = require('assert');
var helper  = require('../helper');
var Music   = require('../../app/music/model');
var User    = require('../../app/users/model');
var Listen  = require('../../app/listen/model');

describe('The listen model', function(){
  before(function() {
    helper.clearAll();
  });

  describe('when saving a listen', function() {
    before(function() {
      (new Music('m1', 'rock,metal')).save();
      (new User('a')).save();
    });

    it('wont return an error', function() {
      listen = new Listen('a', 'm1');
      listen.save().should.eql(1);
    });

    it('returns an exception when the user does not exists', function() {
      (function() {
        listen = new Listen('x', 'm1');
        listen.save();
      }).should.throw(Error('user id x does not exists'));
    });

    it('returns an exception when the music track does not exists', function() {
      (function() {
        listen = new Listen('a', 'm10');
        listen.save();
      }).should.throw(Error('music track id z does not exists'));
    });
  });

  it('returns an exception when the user is undefined', function() {
    (function() {
      new Listen('', 'm1');
    }).should.throw(Error('user id is required'));
  });

  it('returns an exception when the music track id is undefined', function() {
    (function() {
      new Listen('a');
    }).should.throw(Error('music track id is required'));
  });

  after(function () {
    helper.clearAll();
  });
});
