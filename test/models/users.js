
var request = require('supertest');
var assert = require('assert');
var User = require('../../app/users/model');
var helper = require('../helper');

describe('The user model', function(){
  describe('with no saved users', function() {
    before(function() {
      helper.clearUsers();
    });

    it('should return an empty object', function() {
      User.all().should.eql({});
    });
  });

  it('should save a new user without error', function(){
    var user = new User('a');
    user.save();
  });

  it('should return the saved user id', function() {
    var user = new User('b');
    user.save();
    user.id.should.eql('b');
  });

  it('should return an exception when no ID is passed', function() {
    (function() {
      new User();
    }).should.throw(Error('An id string must be provided'));
  });

  it('lists all users', function() {
    expected = {
      a: {},
      b: {}
    }
    User.all().should.eql(expected);
  });

  after(function () {
    helper.clearUsers();
  });
});
