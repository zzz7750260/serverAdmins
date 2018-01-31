var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Admin = require('../models/admin');
var Role = require('../models/roles')
require('../util/dataUtil.js');
var RandomId = require('../util/randomId.js');


//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/adminDb');

mongoose.connection.on("connected",function(){
	console.log("MongoDB connected success.");	
});

mongoose.connection.on("error",function(){
	console.log("MongoDB connected fail.")	
})

mongoose.connection.on("disconnected",function(){
	console.log("MongoDB connected disconnected.")	
})


router.get("/",function(req, res, next){
	res.send('hellow,users . ');
	
});

//用户注册，插入新用户
router.post("/registe", function(req, res, next){
	let theUserID , 
		theUserName = req.body.params.userName,
		thePass = req.body.params.userPass,
		theUserJoinTime,
		theUserQQ = req.body.params.userQQ,
		theUserTel = req.body.params.userTel,
		theUserEmail = req.body.params.userEmail,
		theUserAge = req.body.params.userAge,
		theUserRole = req.body.params.userRole,
		theToken;//定义token

	//生成用户id
	
	console.log("用户id：" + RandomId.theRandomId());
	theUserID = RandomId.theRandomId();
	
	//生成用户token
	theToken = RandomId.theTokenId(theUserName);
	console.log("用户token：" + theToken);
	
	
	theUserJoinTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
	
	let params = {
		userID:theUserID,
		userName:theUserName,
		userPass:thePass,
		userJoinTime:theUserJoinTime,
		userQQ:theUserQQ,
		userTel:theUserTel,
		userEmail:theUserEmail,
		userAge:theUserAge,
		userRole:theUserRole,
		userArticle:[],
		userGoods:[],
		token:theToken
		
	}
	console.log(params);
	
	//插入新用户
	theUser = new Admin(params);
	theUser.save(function(err,doc){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:"出现错误"
			})
		}
		else{
			res.json({
				status:"0",
				msg:"用户注册成功",
				result:doc,
			})
		}
	})
	
})


//注册用户查找用户名是否存在
router.get("/findUserName",function(req, res, next){
	var theUserName = req.query.userName;
	Admin.findOne({userName:theUserName},function(err,doc){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:"出现错误"
			})			
		}
		else{
			console.log("===========查找username的值==============")
			console.log(doc)
			if(doc){
				res.json({
					status:"0",
					msg:'用户名存在，不可以注册',
					result:doc
				})
			}
			else{
				res.json({
					status:"2",
					msg:"",
					result:"用户名不存在，可以注册"					
				})
			}
		}
	})	
})

//用户登录(这里只是获取token的信息)
router.get("/login",function(req, res, next){
	console.log("========用户登录信息==========")
	console.log(req.query);
	var arrData = JSON.parse(req.query.data);
	var theUserName = arrData.username,
		thePassWord = arrData.password;
	console.log("========用户名==========")
	console.log(arrData);	
	console.log("用户名："+arrData.username)
		
	Admin.findOne({userName:theUserName},function(err,doc){
		if(err){
			res.json({
				status:"0",
				msg:err.message,
				result:"出现错误"
			})
		}
		else{
			if(!doc){
				res.json({
					status:"1",
					msg:"用户名不存在",
					result:""
				})				
			}
			else{
				console.log(doc);
				if(doc.userPass != thePassWord){
					res.json({
						status:"2",
						msg:"输入密码错误",
						result:""
					})					
				}
				else{
					res.json({
						status:"3",
						msg:"登录成功",
						result:doc,	
						token:doc.token
					})					
				}
			}
		}
	})	
	
})

//用户登录信息（根据Token获取用户信息）
router.get("/info",function(req, res, next){
	let theTokenP = req.query.token;
	console.log("token的信息："+ theTokenP);
	Admin.findOne({token:theTokenP},function(err,doc){
		if(err){
			res.json({
				status:'0',
				msg:err.message,
				result:"出现未知错误"
			})
		}
		else{
			if(!doc){
				res.json({
					status:'1',
					msg:"该token不存在",
					result:''
				})				
			}
			else{
				res.json({
					status:"2",
					msg:"token存在，正获取用户信息",
					result:doc					
				})							
			}
		}
	})
	
})


//添加用户角色
router.post("/addRole",function(req, res, next){
	let troleName = req.body.therole,
		ttheRole = req.body.theroleen;
		
	var params = {
		"roleName":troleName,
		"theRole":ttheRole		
	}
	console.log("==============获取post参数============")
	console.log(params)
	console.log(req.body)
	
	////////////查找角色是否存在/////////////////
	Role.findOne({roleName:troleName},function(err,doc1){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:""			
			})			
		}
		else{
			if(doc1){
				res.json({
					status:"2",
					msg:"该角色存在",
					result:doc1					
				})				
			}
			else{
				Role.findOne({theRole:ttheRole},function(err,doc2){
					if(err){
						res.json({
							status:"1",
							msg:err.message,
							result:""			
						})			
					}
					else{
						if(doc2){
							res.json({
								status:"3",
								msg:"该英文存在",
								result:""							
							})
						}
						else{
							addRole = new Role(params);
							addRole.save(function(err,doc3){
								if(err){
									res.json({
										status:"1",
										msg:err.message,
										result:""			
									})			
								}
								else{
									res.json({
										status:"4",
										msg:"添加角色成功",
										result:doc3
									})			
								}
							})													
						}
					}					
				})			
			}
		}
	})
	
})


//角色查询循环
router.get('/getRole',function(req, res, next){
	Role.find({},function(err,doc){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:"角色循环出现错误1"
			})
		}
		else{
			if(doc){
				console.log("===============角色列表==============")
				console.log(doc)
				res.json({
					status:"2",
					msg:"循环角色列表",
					result:doc
				})
			}			
		}
	})			
})



module.exports = router;