global.DB = global.DB || { users: {}, follows: [], music: {}, listen: [] };

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
  }
};
