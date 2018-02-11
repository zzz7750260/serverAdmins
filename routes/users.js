var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = require('../models/article');
require('../util/dataUtil.js')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*用户添加文章*/
router.post('/addArticle',function(req, res, next){
	console.log("============插入的文章数据==============")
	console.log(req.body);
	
})

module.exports = router;
