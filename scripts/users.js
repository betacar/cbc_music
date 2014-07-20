var supertest = require('supertest');
var users     = require('../test/stub/users.json');
var async     = require('async');
var request   = supertest('http://localhost:4000');
var count     = 1;

// Loads the users
async.each(users, function(user, cb) {
  request
          .post('/users')
          .send({id: user.id})
          .expect(201)
          .end(function(err, res) {
            if (err) return cb(err);
            count++;

            if (users.length === count) return cb();
          });
}, function(err) {
  if (err) throw new Error(err);
  return users;
});
