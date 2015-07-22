//express
var express = require('express');
var router = express.Router();

//debug
var debug = require('debug')('API:article');

//models
var User = require('../models/user.js');
var	Article = require('../models/article.js');

//feature
let checkPorperty = require('../feature/checkProperty.js');
let check = checkPorperty.check;

//=======================================================

/*
 * [GET] 查詢指定分類
 * request : body.from
 * respone : db result
 */

module.exports = router;