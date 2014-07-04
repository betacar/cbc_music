var request = require('supertest');
var api = require('../..');
var helper = require('../helper');

describe('POST /follow', function() {
  describe('with no parameters', function() {
    it('returns 400', function(done) {
      var app = api();

      request(app.listen())
      .post('/follow')
      .send({})
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });

  describe('with no saved users', function() {
    before(function() {
      helper.clearUsers();
    });

    it('returns 400', function(done) {
      var app = api();

      request(app.listen())
      .post('/follow')
      .send({from: 'a', to: 'b'})
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
      .post('/users')
      .send({id: 'b'})
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('returns 201', function(done) {
      var app = api();

      request(app.listen())
      .post('/follow')
      .send({from: 'a', to: 'b'})
      .expect(201)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });

    describe('when the following user is not defined', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .post('/follow')
        .send({from: '', to: 'b'})
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });

    describe('when the followed user is not defined', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .post('/follow')
        .send({from: 'a', to: ''})
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });

    describe('when the following user does not exists', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .post('/follow')
        .send({from: 'x', to: 'b'})
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });

    describe('when the followed user does not exists', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .post('/follow')
        .send({from: 'a', to: 'z'})
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });
  });

  after(function () {
    helper.clearAll();
  });
});
