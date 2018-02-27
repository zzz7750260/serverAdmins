var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	"articleID":Number,
	"articleAuthor":String,
	"articleTitle":String,
	"articleShortContent":String,
	"articleContent":String,
	"articleTime":String,
	"articleSource":String,
	"articleSourceName":String,
	"articleImg":String,
	"articleStatus":String,
	"articleCheck":Boolean,
	"articleCommits":Array,
});

module.exports = mongoose.model('article', articleSchema)