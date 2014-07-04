
var request = require('supertest');
var api = require('../..');
var helper = require('../helper');

describe('GET /users', function(){
  it('should respond with users', function(done){
    var app = api();

    request(app.listen())
    .get('/users')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      res.body.should.eql({});
      done();
    });
  });

  it('should respond with users/:id', function(done){
    var app = api();

    request(app.listen())
    .post('/users/')
    .send({id: 'a'})
    .expect(201)
    .end(function(err, res){
      if (err) return done(err);
      done();
    });
  });

  it('should respond with bad request (400) and id required', function(done) {
    var app = api();

    request(app.listen())
    .post('/users/')
    .send({})
    .expect(400)
    .end(function(err, res){
      if (err) return done(err);
      done();
    });
  });

  it('should respond with bad request (400) and id exists', function(done) {
    var app = api();

    request(app.listen())
    .post('/users/')
    .send({id: 'a'})
    .expect(400)
    .end(function(err, res){
      if (err) return done(err);
      done();
    });
  });

  it('should respond with saved users', function(done){
    var app = api();

    request(app.listen())
    .get('/users')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      done();
    });
  });

  after(function () {
    helper.clearUsers();
  });
});
