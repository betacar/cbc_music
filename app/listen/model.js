/**
 * Dependencies.
 */
helper = require('../../lib/helpers');
User   = require('../users/model');
Music  = require('../music/model');

/**
 * Listen model.
 */

function Listen(user, music) {
  if (!user) throw new Error('user id is required');
  if (!music) throw new Error('music track id is required');
  this.user  = user;
  this.music = music;

  return this;
};

/**
 * Class method: returns true if the user already listened to the track, else if not
 */

Listen.exists = function(user, music) {
  return helper.findWhere(DB.listen, {user: user, music: music});
};

Listen.findUser = function(user) {
  return helper.where(DB.listen, {user: user});
};

Listen.userMusic = function(user) {
  return helper.pluck(Listen.findUser(user), 'music');
};

/**
 * Instance methods.
 * We should add a playCount attr to count the times an user has played a music track.
 */

Listen.prototype.save = function() {
  if (!User.exists(this.user)) throw new Error('user id ' + this.user + ' does not exists');
  if (!Music.exists(this.music)) throw new Error('music track id ' + this.music + ' does not exists');
  if (!Listen.exists(this.user, this.music)) return DB.listen.push({user: this.user, music: this.music});
  return true;
};

module.exports = Listen;
