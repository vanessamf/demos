$(function() {
	banner();

	function banner() {
		var _win_width = $(window).width(),
			_header_hei = $(window).height();
		if(_win_width > 1440) {
			$('.banner').height('500px');
		} else if(_win_width < 1440 && _win_width > 960) {
			_header_hei = 500 * _win_width / 1440;
			$('.banner').height(_header_hei);
		} else {
			$('.banner').height("333.3333px");
		}
	}
	//	    window.onresize=function(){
	//	    		banner();
	//	    }
	$(window).resize(function() {
		//调整窗口大小时显示
		banner();
	});

	var theInt = null;
	var num = $(".banner-list .item").length;

	for(var i = 0; i < num; i++) {
		$(".banner-num").append("<a class='num-text' href='javascript:void(0);'>" + "</a>");
	}
	$(".banner-num .num-text").eq(0).addClass("active");

	$(".banner-num .num-text").each(function(i) {
		$(this).click(function() {
			change(i);
		})
	})

	Carousel = function(p) {
		clearInterval(theInt);
		theInt = setInterval(function() {
			p++;
			if(p < num) {
				change(p);
			} else {
				p = 0;
				change(p);
			}
		}, 2000);
	}
	Carousel(0);

	function change(i) {
		$(".banner-list .item").eq(i).siblings(".item").removeClass("active");
		$(".banner-list .item").eq(i).addClass("active");
		$(".banner-num .num-text").eq(i).siblings(".num-text").removeClass("active");
		$(".banner-num .num-text").eq(i).addClass("active");
	}
})