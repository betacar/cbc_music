var request = require('supertest');
var api = require('../..');
var helper = require('../helper');

describe('POST /listen', function() {
  describe('with no parameters', function() {
    it('returns 400', function(done) {
      var app = api();

      request(app.listen())
      .post('/listen')
      .send({})
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });

  describe('with no saved parameters', function() {
    before(function() {
      helper.clearAll();
    });

    after(function() {
      helper.clearAll();
    });

    it('returns 400 when the user does not exists', function(done) {
      var app = api();

      request(app.listen())
      .post('/music')
      .send({id: 'm1', generes: 'jazz,ska'})
      .end(function(err, res) {
        if (err) return done(err);
      });

      request(app.listen())
      .post('/listen')
      .send({user: 'x', music: 'm1'})
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });

    it('returns 400 when the music track does not exists', function(done) {
      var app = api();

      request(app.listen())
      .post('/users')
      .send({id: 'a'})
      .end(function(err, res) {
        if (err) return done(err);
      });

      request(app.listen())
      .post('/listen')
      .send({user: 'a', music: 'm10'})
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });

  describe('with saved users', function() {
    before(function(done) {
      var app = api();

      request(app.listen())
      .post('/users')
      .send({id: 'a'})
      .end(function(err, res) {
        if (err) return done(err);
      });

      request(app.listen())
      .post('/music')
      .send({id: 'm1', generes: 'jazz,ska'})
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('returns 201', function(done) {
      var app = api();

      request(app.listen())
      .post('/listen')
      .send({user: 'a', music: 'm1'})
      .expect(201)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });

    describe('when the user is not defined', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .post('/listen')
        .send({user: '', music: 'm1'})
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });

    describe('when the music is not defined', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .post('/listen')
        .send({user: 'a', music: ''})
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });
  });

  describe('when a user listens again to a music track', function() {
    it('returns 201', function(done) {
      var app = api();

      request(app.listen())
      .post('/listen')
      .send({user: 'a', music: 'm1'})
      .expect(201)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });

  after(function () {
    helper.clearAll();
  });
});
