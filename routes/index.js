var express = require('express');
var router = express.Router();
var Article = require('../models/article');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*获取文章请求*/
router.get('/getArticle', function(req, res, next){
	var theArticleID = req.query.articleID;
	Article.findOne({articleID:theArticleID},function(err,doc){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:"前端获取文章失败",
			})			
		}
		else{
			res.json({
				console.log("==============根据文章id获取的文章数据==============");
				console.log(doc)
				res.json({
					status:"2",
					msg:"获取文章结果成功",
					result:doc
				})
			})			
		}
	})	
})

module.exports = router;
