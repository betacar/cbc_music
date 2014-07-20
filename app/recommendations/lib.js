/**
 * Dependencies.
 */
var User   = require('../users/model');
var Music  = require('../music/model');
var Follow = require('../follows/model');
var Listen = require('../listen/model');
var _      = require('underscore');

module.exports = function (user) {
  if (!user) throw new Error('user id is required');
  if (!User.exists(user)) throw new Error('user id ' + user + ' does not exists in the database');

  var userListened = [], follows = [], followsMusic = [], diff = [], recommendation = [];
  var allMusic = Object.keys(_.memoize(Music.all())), unlistenedMusic = [];

  // We search for the user's listened music
  userListened = Listen.userMusic(user);

  // Then search for the users he/she follows
  follows = Follow.userFollows(user);

  if (follows.length) {
    // Get the follows listened music
    followsMusic = follows.map(function(follow) {
      return Listen.userMusic(follow);
    });

    followsMusic = _.flatten(followsMusic);
  };

  // We filter the music our user listened and the one his follows listened too
  if (followsMusic.length > userListened.length) {
    recommendation = _.difference(followsMusic, userListened);
  } else {
    recommendation = _.difference(userListened, followsMusic);
  };

  // If the recommendation is bigger than 5 music tracks, we return a shuffled list of tracks
  // The list is shuffle to not return the same order of items each time
  if (recommendation.length >= 5) {
    return _.shuffle(recommendation.slice(0, 5));
  };

  // If the recommendation list is smaller than 5, then we filter the user's
  // listened tracks and all the music list, so we have unlistened music tracks
  diff = _.difference(allMusic, userListened);
  unlistenedMusic = _.chain(diff).union(recommendation).shuffle().value().slice(0, 5);

  return unlistenedMusic;
};
