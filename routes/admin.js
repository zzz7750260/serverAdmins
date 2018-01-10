var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Admin = require('../models/admin');
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
		theUserRole = req.body.params.userRole;

	//生成用户id
	console.log(RandomId.theId());
	theUserID = RandomId.theId();
	
	theUserJoinTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
	
	let params = {
		userID:theUserID,
		userName:theUserName,
		userPass:thePass,
		userJoinTime:theUserJoinTime,
		userQQ:theUserQQ,
		userTel:theUserTel,
		userEmail:theUserEmail,
		userAge:theUserAge.
		userRole:theUserRole,
		userArticle:[],
		userGoods:[],
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



module.exports = router;