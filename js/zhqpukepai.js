$(function(){
//开始点击左右离开
$('.kaichang h1').on('click',function(){
	$('.kaichang').addClass('animation');
})
  var poker=[];
  var colors=['c','h','d','s'];
  var biao={};
  while(poker.length<52){
  	var huase=colors[Math.floor(Math.random()*4)];
  	var shuzi=Math.ceil(Math.random()*13);
  	var item={huase:huase,shuzi:shuzi};
  	if(!biao[huase+'-'+shuzi]){
  		poker.push(item);
  		biao[huase+'-'+shuzi]=true;
  	}
  }
    console.table(poker);//数字中所有元素为对象的数字可以使用
  var fapai=function(){
  	var d=0;
  	var index=0;
  	for(var i=0;i<7;i++){
  		var t=i*60;
  		for(var j=0;j<i+1;j++){
  			index+=1;
  			d+=90;
  			var l=(6-i)*50+j*100;
  			$('<div>')
  			.addClass('pai shang')
  			.css({
  				backgroundImage:'url(img/'+poker[index].shuzi+poker[index].huase+'.png)'
  			})
  			.appendTo('.paizhuo')
  			.delay(d)
  			.animate({
  				top:t,
  				left:l,
  				opacity:1
  			})
  			.attr('id',i+'-'+j)
  			.data('shuzi',poker[index].shuzi)

  		}
  	}
  	for(;index<poker.length;index++){
  		d+=90;
  		$('<div>')
  		.addClass('pai zuo')
  		.css({
  			backgroundImage:'url(img/'+poker[index].shuzi+poker[index].huase+'.png)'
  		})
  		.appendTo('.paizhuo')
  		.delay(d)
  		.animate({
  			top:500,
  			left:140,
  			opacity:1
  		})
  		.data('shuzi',poker[index].shuzi)
  	}



  	//判断上牌是否被压住 
  	var ison=function(el){
  		var x=Number($(el).attr('id').split('-')[0]);
  		var y=Number($(el).attr('id').split('-')[1]);
  		return $('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length;
  	}
  	var shangyizhang;
  	$('.paizhuo .pai').on('click',function(){
  		if($(this).hasClass('shang')&&ison(this)){
  		return;
  	} 	
  	  $(this).toggleClass('chulie');
  	  $(this).animate({top:'-=20'});
      //点击恰好是13
      if($(this).data('shuzi')==13){
        $(this).animate({
          top:0,
          left:610,
          opacity:0
        }).queue(function(){
          $(this).remove();
        })
        shangyizhang=undefined;
        return;
      }
        if(!shangyizhang){//第一次点击
          shangyizhang=$(this);
        }else{//第二次点击
          if(shangyizhang.data('shuzi')+$(this).data('shuzi')==13){
            shangyizhang.delay(400).animate({
                top:0,
                left:610,
                opacity:0
            }).queue(function(){
              $(this).remove();
            })
            $(this).animate({
              top:0,
              left:610,
              opacity:0
            }).queue(function(){
              $(this).remove();
            });
            shangyizhang=undefined;
          }else{
            shangyizhang.delay(400).animate({
              top:'+=20'
            }).removeClass('chulie');
            $(this).animate({
              top:'+=20'
            }).removeClass('chulie');
            shangyizhang=undefined;
            $('.paizhuo .tips').css({'display':'block'});
            var t=setTimeout(function(){
              $('.paizhuo .tips').css({'display':'none'});
            },3000);
          
        }
        } 
  	})
  }
 $('.fapai').on('click',function(){
  fapai();
 })
 //按钮
 var zIndex=1;
 $('.move-right').on('click',function(){
  zIndex+=1;
  $('.paizhuo .zuo')
  .eq(-1)
  .removeClass('zuo')
  .addClass('you')
  .animate({
    top:500,
    left:455
  })
  .css({
    zIndex:zIndex
  })
 })
 var num=0;
 $('.paizhuo .move-left').on('click',function(){
  if($('.zuo').length){
    $('.paizhuo .tips1').css({'display':'block'});
    var t=setTimeout(function(){
      $('.paizhuo .tips1').css({'display':'none'});
    },3000);
    return;
  }
  num+=1;
  if(num>3){
    $('.gameover').css('display','block');
    return;
  }
  $('.you').each(function(i,el){
    $(this)
    .delay(i*30)
    .animate({
      top:500,
      left:140
    })
    .css({
      zIndex:0
    })
    .removeClass('you')
    .addClass('zuo')
  })
 })
$('.restart').on('click',function(){
  location.reload();
})

})