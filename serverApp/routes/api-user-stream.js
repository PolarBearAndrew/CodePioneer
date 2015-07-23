//express
let express = require('express');
let router = express.Router();

//debug
let debug = require('debug')('API:user');

//model
let User = require('../models/user.js');

//feature
let postMan = require('../feature/mail.js');
let checkPorperty = require('../feature/checkProperty.js');
let check = checkPorperty.check;

/*
 * [GET] 查詢使用者(10)
 * request :
 * respone : db result
 */
router.get('/', (req, res, next) => {

});

/*
 * [GET] 接續查詢使用者(10)
 * request : query.finalIndex, query.lastestTime
 * respone : db result
 */
router.get('/stream', (req, res, next) => {

});

/*
 * [GET] 查詢喜愛使用者(10)
 * request : body.uid
 * respone : db result
 */
router.get('/like', (req, res, next) => {

});

/*
 * [GET] 接續查詢喜愛使用者(10)
 * request : body.uid, query.finalIndex, query.lastestTime
 * respone : db result
 */
router.get('/like/stream', (req, res, next) => {

});

/*
 * [GET] 查詢追蹤使用者(10)
 * request : body.uid
 * respone : db result
 */
router.get('/follow', (req, res, next) => {

});

/*
 * [GET] 接續查詢追蹤使用者(10)
 * request : body.uid, query.finalIndex, query.lastestTime
 * respone : db result
 */
router.get('/follow/stream', (req, res, next) => {

});

module.exports = router;