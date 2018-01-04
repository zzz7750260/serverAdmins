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

router.post("/registe", function(req, res, next){
	let theUserID , 
		theUserName = req.body.useName,
		thePass = req.body.userPass,
		theUserJoinTime ,
		theUserQQ = req.body.userQQ,
		theUserTel = req.body.userTel,
		theUserEmail = req.body.userEmail,
		theUserRole = req.body.userRole;
	
	//生成用户id
		console.log(RandomId.theId());
		
})



module.exports = router;