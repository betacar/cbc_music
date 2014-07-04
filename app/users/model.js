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
};

User.exists = function(id) {
  return (id in DB.users);
};

/**
 * Instance methods.
 */

User.prototype.save = function() {
  if (User.exists(this.id)) throw new Error('user id ' + this.id + ' already exists in the database');
  DB.users[this.id] = {};
  return DB.users[this.id];
};

module.exports = User;
