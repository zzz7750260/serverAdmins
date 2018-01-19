var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var useSchema = new Schema({
	"userID":Number,
	"userName":String,
	"userPass":String,
	"userJoinTime":String,
	"userQQ":Number,
	"userTel":Number,
	"userEmail":String,
	"userAge":Number,
	"userRole":Array,
	"token":String,
	"userArticle":[{
		"articleID":Number,
		"articleTitle":String,
		"articleContent":String,
		"articleData":String,
		"articleCheck":Boolean,
		"articleCommits":Array,
	}],
	"userGoods":Array,
});

module.exports = mongoose.model('user',useSchema);