var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
	"roleName":String,
	"theRole":String,	
})

module.exports = mongoose.model('role',roleSchema);
