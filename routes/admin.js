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

//查询用户
router.get("/getUser",function(req, res, next){
	Admin.find({},function(err,doc){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:"查询用户出现错误"			
			})
		}	
		else{
			if(doc){
				console.log("===============用户列表==============")
				console.log(doc)
				let numUsers = doc.length;
				res.json({
					status:"2",
					msg:"用户查询成功",
					result:{
						userNum:numUsers,
						theUsers:doc
					}
				})
			}			
		}				
	})
	
})

//批量修改用户权限
router.post("/getChangeRoles",function(req, res, next){
	let tUserArray = req.body.userArray,
		tUserRole = req.body.userRole;
		
	let userArrayLength = tUserArray.length;
		
	console.log("tUserArray:"+tUserArray);
	console.log("tUserRole:"+tUserRole);

	//采用同步操作等待批量更改完成后再返回res
	var goStart = function(){ 	
		return new Promise(function(resolve,reject){
			for(var i=0; i<userArrayLength; i++){
				Admin.findOne({userName:tUserArray[i]},function(err,doc){
					if(err){
						res.json({
							status:"1",
							msg:err.message,
							result:"用户权限修改出现错误"
						})						
					}else{
						if(doc){
							console.log("============循环出来的用户权限，等待更改==============")
							console.log(doc);
							doc.userRole = [""+tUserRole+""];
							console.log("============更改后的用户==============")
							console.log(doc);
							doc.save(function(err){
								if(err){
									console.log("更改出现错误");					
								}
								else{
									console.log("更改成功");
								}
							})
						}						
					}					
				})			
			}
			console.log("内：更改结束")
			resolve('ok');			
		})

	}
	
	var finishXg = async function (){
		console.log("外部:循环更改用户权限");
		let result = await goStart();
		console.log("外：更改结束")
		console.log("这个是result:"+result);
		if(result ==='ok'){
			res.json({
				status:"2",
				msg:"更改成功",
				result:''
			})
		}
	} 
	finishXg()
	
})



module.exports = router;