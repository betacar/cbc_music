var helper  = require('../helper');
var Follow  = require('../../app/follows/model');
var User    = require('../../app/users/model');

describe('The follow model', function(){
  before(function() {
    helper.clearFollows();
  });

  describe('when saving a follow', function() {
    before(function() {
      (new User('a')).save();
      (new User('b')).save();
    });

    it('wont return an error', function() {
      var follow = new Follow('a', 'b');
      follow.save().should.eql(1);
    });

    it('returns an exception when the following user does not exists', function() {
      (function() {
        var follow = new Follow('x', 'b');
        follow.save();
      }).should.throw(Error('user id x does not exists'));
    });

    it('returns an exception when the followed user does not exists', function() {
      (function() {
        var follow = new Follow('a', 'z');
        follow.save();
      }).should.throw(Error('user id z does not exists'));
    });

    it('returns an exception when the follow relation already exists', function() {
      (function() {
        var follow = new Follow('a', 'b');
        follow.save();
      }).should.throw(Error('a already follows b'));
    });
  });

  it('returns an exception when the following user is undefined', function() {
    (function() {
      new Follow(undefined, 'b');
    }).should.throw(Error('from and to ids are required'));
  });

  it('returns an exception when the followed user is undefined', function() {
    (function() {
      new Follow('a');
    }).should.throw(Error('from and to ids are required'));
  });

  after(function () {
    helper.clearFollows();
  });
});
