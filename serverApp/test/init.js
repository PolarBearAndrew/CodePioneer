process.env.NODE_ENV = 'test';

var app = require('../app.js')
  , chai = require('chai')
  , request = require('supertest');

global.should = chai.should();
global.request = request(app);