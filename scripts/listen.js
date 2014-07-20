var supertest = require('supertest');
var listens   = require('../test/stub/listen.json');
var async     = require('async');
var request   = supertest('http://localhost:4000');
var count     = 1;

// Loads the listens
async.each(listens, function(listen, cb) {
  request
          .post('/listen')
          .send({music: listen.music, user: listen.user})
          .expect(201)
          .end(function(err, res) {
            if (err) return cb(err);
            count++;

            if (listens.length === count) return cb();
          });
}, function(err) {
  if (err) throw new Error(err);
  return listens;
});
