// 加上這句就會自動載入 es6 檔案並即時編譯為 es5
require('babel/register');
require('./api-users.js');

// process.env.NODE_ENV = 'test';

// var app = require('../app.js')
//   , chai = require('chai')
//   , request = require('supertest');

// global.should = chai.should();
// global.request = request(app);