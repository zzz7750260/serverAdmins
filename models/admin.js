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
	"userArticle":[{
		"articleID":Number,
		"articleTitle":String,
		"articleContent":String,
		"articleData":String,
		"articlCheck":Boolean,
		
	}],
	"userGoods":Array,
	"userRole":Number,
});

module.exports = mongoose.model('user',useSchema);