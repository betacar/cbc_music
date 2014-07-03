/**
 * User model.
 */

function User (id) {
  if (!id) throw new Error('An id string must be provided');
  this.id = id;

  return this;
};

/**
 * Class methods.
 */

User.all = function () {
  return DB.users;
}

/**
 * Instance methods.
 */

User.prototype.save = function() {
  DB.users[this.id] = {};
  return DB.users[this.id];
};

module.exports = User;
