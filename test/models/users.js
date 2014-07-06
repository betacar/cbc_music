var request = require('supertest');
var assert = require('assert');
var User = require('../../app/users/model');
var helper = require('../helper');

describe('The user model', function(){
  after(function () {
    helper.clearUsers();
  });

  describe('with no saved users', function() {
    before(function() {
      helper.clearUsers();
    });

    it('returns an empty object', function() {
      User.all().should.eql({});
    });
  });

  it('saves a new user without error', function(){
    var user = new User('a');
    user.save();
  });

  it('returns an exception if the id exists', function(){
    (function() {
      var user = new User('a');
      user.save();
    }).should.throw(Error('user id a already exists in the database'));
  });

  it('returns the saved user id', function() {
    var user = new User('b');
    user.save();
    user.id.should.eql('b');
  });

  it('returns an exception when no ID is passed', function() {
    (function() {
      new User();
    }).should.throw(Error('An id string must be provided'));
  });

  it('returns true if a user exists', function() {
    var user = new User('c');
    user.save();
    User.exists('c').should.be.true;
  });

  it('returns false if a user does not exists', function() {
    User.exists('x').should.be.false;
  });

  it('returns a list of users', function() {
    expected = {
      a: {},
      b: {},
      c: {}
    }
    User.all().should.eql(expected);
  });
});
