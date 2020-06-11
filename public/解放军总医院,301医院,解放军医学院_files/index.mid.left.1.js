		jQuery(".picnews").slide({ titCell:".num li", mainCell:".pic",effect:"fold", autoPlay:true,trigger:"click",
			//下面startFun代码用于控制文字上下切换
			startFun:function(i){
				 jQuery(".picnews .txt li").eq(i).animate({"bottom":0}).siblings().animate({"bottom":-36});
			}
		});