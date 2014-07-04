/**
 * Dependencies.
 */

User = require('../users/model');

/**
 * Follow model.
 */

function Follow(from, to) {
  if (!from || !to) throw new Error('from and to ids are required');
  this.from = from;
  this.to   = to;

  return this;
};

/**
 * Class method: returns true if a relation already exists, else if not
 */

Follow.exists = function(from, to) {
  follows = DB.follows
  length = follows.length - 1;

  for (var i = 0; i <= length; i++) {
    if ((follows[i].from === from) && (follows[i].to === to)) return true;
  };

  return false;
};

/**
 * Instance methods.
 */

Follow.prototype.save = function() {
  if (!User.exists(this.from)) throw new Error('user id ' + this.from + ' does not exists');
  if (!User.exists(this.to)) throw new Error('user id ' + this.to + ' does not exists');
  if (Follow.exists(this.from, this.to)) throw new Error(this.from + ' already follows ' + this.to);
  return DB.follows.push ({ from: this.from, to: this.to });
};

module.exports = Follow;
