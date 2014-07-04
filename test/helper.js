global.DB = global.DB || { users: {}, follows: [], music: {}, listens: {} };

exports = module.exports = {
  clearUsers: function() {
    global.DB.users = {};
  },

  clearFollows: function() {
    global.DB.follows = [];
  },

  clearListens: function() {
    global.DB.listens = {};
  },

  clearMusic: function() {
    global.DB.music = {};
  },

  clearAll: function() {
    exports.clearUsers();
    exports.clearFollows();
    exports.clearListens();
    exports.clearMusic();
  }
};
