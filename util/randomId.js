require('./dataUtil.js')
function theId(){
	var r1 = Math.floor(Math.random()*10);
	var r2 = Math.floor(Math.random()*10);
	var tid = "233";
	var sysDate = new Date().Format('yyyyMMddhhmmss');
	return theId = tid + r1 + sysDate + r2;
}

module.exports.theId = theId;