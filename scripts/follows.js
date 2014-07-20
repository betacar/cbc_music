var supertest = require('supertest');
var follows   = require('../test/stub/follows.json');
var async     = require('async');
var request   = supertest('http://localhost:4000');
var count     = 1;

// Loads the follows
async.each(follows, function(follow, cb) {
  request
          .post('/follow')
          .send({from: follow.from, to: follow.to})
          .expect(201)
          .end(function(err, res) {
            if (err) return cb(err);
            count++;

            if (follows.length === count) return cb();
          });
}, function(err) {
  if (err) throw new Error(err);
  return follows;
});
