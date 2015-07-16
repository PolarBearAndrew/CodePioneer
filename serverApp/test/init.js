// 加上這句就會自動載入 es6 檔案並即時編譯為 es5
require('babel/register');

process.env.NODE_ENV = 'test';

var app = require('../app.js')
var chai = require('chai');
var request = require('supertest');

global.should = chai.should();
global.request = request(app);

require('./api-users.js');