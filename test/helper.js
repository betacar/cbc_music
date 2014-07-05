global.DB = global.DB || { users: {}, follows: [], music: {}, recommendations: {} };

exports = module.exports = {
  clearUsers: function() {
    global.DB.users = {};
  },

  clearFollows: function() {
    global.DB.follows = [];
  },

  clearRecommendations: function() {
    global.DB.recommendations = {};
  },

  clearMusic: function() {
    global.DB.music = {};
  },

  clearListens: function() {
    global.DB.listen = {};
  },

  clearAll: function() {
    exports.clearUsers();
    exports.clearFollows();
    exports.clearRecommendations();
    exports.clearMusic();
    exports.clearListens();
  }
};
