require('./dataUtil.js')
var theMathT = {
	theRandomId:function(){
		var r1 = Math.floor(Math.random()*10);
		var r2 = Math.floor(Math.random()*10);
		var tid = "233";
		var sysDate = new Date().Format('yyyyMMddhhmmss');
		return theId = tid + r1 + sysDate + r2;
	},
	theTokenId:function(tname){
		var tokenNum = "455";
		var sysDate = new Date().Format('yyyyMMddhhmmss');
		var theToke = tname + tokenNum + sysDate;
		return theToke;	
		console.log(tname)
		return tname;
	},
	theArticleId:function(){
		var articleNum = "566";
		var sysDate = new Date().Format('yyyyMMddhhmmss')
		var ArticleId = articleNum + sysDate;
		console.log("文章id为：" + ArticleId);
		return ArticleId;
	}
}

module.exports = theMathT;