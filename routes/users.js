var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = require('../models/article');
require('../util/dataUtil.js')
var randomId = require('../util/randomId');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*用户添加文章*/
router.post('/addArticle',function(req, res, next){
	console.log("============插入的文章数据==============")
	console.log(req.body);
	var theStatus = req.body.status,
		theAuthor = req.body.author,
		theTitle = req.body.title,
		theContent = req.body.content,
		theContent_short = req.body.content_short,
		theSource_url = req.body.source_url,
		theImage_url = req.body.image_url,
		theSource_name = req.body.source_name,
		theDisplay_time = req.body.display_time,
		thePlatforms = req.body.platforms,
		theCommit_disabled = req.body.commit_disabled,
		theID = randomId.theArticleId();
	
	console.log("查看生成的文章ID:" + theID);
	
	var params = {
		articleID:theID,
		articleAuthor:theAuthor,
		articleTitle:theTitle,
		articleShortContent:theContent_short,
		articleContent:theContent,
		articleTime:theDisplay_time,
		articleSource:theSource_url,
		articleImg:theImage_url,
		articleStatus:theStatus,
		articleCheck:theCommit_disabled,
		articleCommits:[],		
	}
	
	var theArticle = new Article(params);
	
	theArticle.save(function(err,doc){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:"插入文章失败"
			})		
		}
		else{
			res.json({
				status:"2",
				msg:"文章插入成功",
				result:doc
			})			
		}
	})
	
})

module.exports = router;
