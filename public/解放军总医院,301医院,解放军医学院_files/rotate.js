		jQuery(".indexPic").hover(function(){ jQuery(this).find(".prev,.next").stop(true,true).fadeTo("show",1) },function(){ jQuery(this).find(".prev,.next").fadeOut() });
		    var cwidth = document.body.clientWidth;
		    var imagewidth=1913;
		    cheight = parseInt(460.00 / ( 1913.00 / cwidth) - 8);
		    jQuery(".indexPic").css("height",cheight+'px');	
			jQuery(".indexPic .bd li").css("height",cheight+'px');
		    jQuery(".indexPic .bd li").css("width",cwidth+'px');		
		    jQuery(".indexPic .bd ul").css("height",cheight+'px');
		    jQuery(".indexPic .bd ul").css("width",cwidth+'px');			
			
		jQuery(window).resize( function(){
		    var cwidth = document.body.clientWidth;
		    var imagewidth=1913;
		    cheight = parseInt(460.00 / ( 1913.00 / cwidth) - 8);
            jQuery(".indexPic").css("height",cheight+'px');				
		    jQuery(".indexPic .bd li").css("height",cheight+'px');
			jQuery(".indexPic .bd ul").css("height",cheight+'px');
		    jQuery(".indexPic .bd li").css("width",cwidth+'px');
			jQuery(".indexPic .bd ul").css("width",cwidth+'px');
		});
		jQuery(".indexPic").slide({ titCell:".hd ul", mainCell:".bd ul", effect:"fold",  autoPlay:true, autoPage:true, trigger:"click",
			startFun:function(i){
				var curLi = jQuery(".indexPic .bd li").eq(i); 
				if( !!curLi.attr("mysrc") ){ curLi.css("background-image",curLi.attr("mysrc")).removeAttr("mysrc")  }
			}
		});
