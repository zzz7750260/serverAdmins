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
		articleSourceName:theSource_name,
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

/*文章列表*/
router.get('/listArticle',function(req, res, next){	
	//文章查询
	console.log("==============查看传来的参数==============");
	console.log(req.query)
	//分页参数
	var thePageSize = req.query.pageSize,
		thePage = req.query.page,
		theLimit = req.query.pageSizes,
		skip;
		
	skip = (parseInt(thePage) - 1)*parseInt(thePageSize);

  	
	//列表状态查询参数	
	var theStatus = req.query.articleStatus;
	
	var params,
		ArticleList,
		ArticleListNum,
		ArticleModel;
	
	if(theStatus == null || theStatus == ''){
		params = {};		
	}
	else{
		params = {articleStatus:theStatus}			
	}
	
	//文章获取方法的模块，对总数以及分块的操作
	ArticleModel = {
		totalNum:function totalNum(params){
			return	Article.find(params).exec()				
		},
		findArticle:function findArticle(params){
			ArticleList = Article.find(params).limit(parseInt(thePageSize)).skip(skip);
			
			return ArticleList.exec()						
		}		
	}
		
	//执行模块并返回对应的结果
	Promise.all([
		ArticleModel.totalNum(params),
		ArticleModel.findArticle(params)
	]).then(function(doc){
		if(!doc){
			res.json({
				status:"1",
				msg:err.message,
				result:"数据查询出现错误",
			})			
		}
		else{
			console.log("================获取文章的总数量================");
			console.log(doc[0].length);
			console.log("===============放回文章的查询结果================");
			console.log(doc[1]);
			
			res.json({
				status:"2",
				msg:"文章查询成功",
				result:{
					total:doc[0].length,
					theResult:doc[1]
				}				
			})
			
		}
		
	})
	
	
//	ArticleList = Article.find(params).limit(parseInt(thePageSize)).skip(skip);
//	ArticleList.exec(function(err,doc){
//		if(err){
//			res.json({
//				status:"1",
//				msg:err.message,
//				result:"文章查询出现错误"
//			})
//		}
//		else{
//			console.log("==============文章查询列表===============");
//			console.log(doc);
//			res.json({
//				status:"2",
//				msg:"文章查询成功",
//				result:{
//					num:doc.length,
//					theDoc:doc,
//				}
//			})
//		}		
//	})			
})

//获取文章详情
router.get('/articleDetail',function(req, res, next){
	var theID = req.query.articleID;
	console.log("=============获取的文章ID================");
	console.log(theID)
	Article.findOne({articleID:theID},function(err,doc){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:"文章详情查询出现错误"	
			})		
		}
		else{
			console.log("==============文章查询结果================")
			console.log(doc)
			res.json({
				status:"2",
				msg:"文章查询成功",
				result:doc
			})
		}
	})
	
})

//更新编辑文档
router.post('/editUpdataArticle',function(req, res, next){
	console.log("=====================获取传递过来的更新后的文章内容=====================");
	console.log(req.body);
	
	var theID = req.body.id,
		theStatus = req.body.status,
		theAuthor = req.body.author,
		theTitle = req.body.title,
		theContent = req.body.content,
		theContent_short = req.body.content_short,
		theSource_url = req.body.source_url,
		theImage_url = req.body.image_url,
		theSource_name = req.body.source_name,
		theDisplay_time = req.body.display_time,
		thePlatforms = req.body.platforms,
		theCommit_disabled = req.body.commit_disabled;
	
	//查询参数
	var theData,
		newData;	

	//查询条件
	 theData = {articleID:theID};
	 newData = {$set:{		
		articleAuthor:theAuthor,
		articleTitle:theTitle,
		articleShortContent:theContent_short,
		articleContent:theContent,
		articleTime:theDisplay_time,
		articleSource:theSource_url,
		articleSourceName:theSource_name,
		articleImg:theImage_url,
		articleStatus:theStatus,
		articleCheck:theCommit_disabled,
		}}
	 	
	Article.update(theData,newData,function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:'更改文章出现未知错误'				
			})					
		}
		else{
			console.log("===================查看更改后的数据===================");
			console.log(doc)
			console.log("文章更改成功")
			//doc不是更改的数组结果			
			//res.json({
			//	status:'2',
			//	msg:'文章更新成功',
			//	result:doc			
			//})
		}		
	})
	
	Article.findOne(theData,function(err,doc1){
		if(err){
			res.json({
				status:'11',
				msg:err.message,
				result:'查找更新的文件结果出现未知错误'
			})			
		}
		else{
			console.log("===================查看更改后的文章数据结果===================");
			console.log(doc1)
			res.json({
				status:'2',
				msg:'文章更新查询成功',
				result:doc1
			})
		}		
	})
})

router.post('/delArticle',function(req, res, next){
	var theArticleId = req.body.articleID;
	console.log("============获取删除文章的id=============");
	console.log(theArticleId);
	Article.remove({articleID:theArticleId},function(err,doc){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:"删除文章出现错误"
			})			
		}
		else{
			res.json({
				status:'2',
				msg:"删除文章成功",
				result:''			
			})
		}
	})
})


module.exports = router;
