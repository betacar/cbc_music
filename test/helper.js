global.DB = global.DB || { users: {}, follows: [], music: {}, listen: [] };
var async = require('async');
var stubs = {
  users: require('./stub/users.json'),
  follows: require('./stub/follows.json'),
  listens: require('./stub/listen.json'),
};

exports = module.exports = {
  clearUsers: function() {
    global.DB.users = {};
  },

  clearFollows: function() {
    global.DB.follows = [];
  },

  clearMusic: function() {
    global.DB.music = {};
  },

  clearListens: function() {
    global.DB.listen = [];
  },

  clearAll: function() {
    exports.clearUsers();
    exports.clearFollows();
    exports.clearMusic();
    exports.clearListens();
  },

  loadUsers: function() {
    var count = 1;

    async.each(stubs.users, function(user, cb) {
      global.DB.users[user.id] = {};
      count++;

      if (stubs.users.length === count) return cb();
    }, function(err) {
      if (err) throw new Error(err);
      return true;
    });
  },

  loadFollows: function() {
    var count = 1;

    async.each(stubs.follows, function(follow, cb) {
      global.DB.follows.push({ from: follow.from, to: follow.to });
      count++;

      if (stubs.follows.length === count) return cb();
    }, function(err) {
      if (err) throw new Error(err);
      return true;
    });
  },

  loadListen: function() {
    var count = 1;

    async.each(stubs.listens, function(listen, cb) {
      global.DB.listen.push({user: listen.user, music: listen.music});
      count++;

      if (stubs.listens.length === count) return cb();
    }, function(err) {
      if (err) throw new Error(err);
      return true;
    });
  },

  loadAll: function() {
    exports.loadUsers();
    exports.loadFollows();
    exports.loadListen();
  }
};
