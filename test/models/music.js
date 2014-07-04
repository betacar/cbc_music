var request = require('supertest');
var assert  = require('assert');
var helper  = require('../helper');
var Music   = require('../../app/music/model');

describe('The music model', function() {
  after(function() {
    helper.clearMusic();
  });
});
