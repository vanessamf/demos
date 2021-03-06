window.onload = function() {
	banner();
}
window.onresize = function() {
	//	banner();
}
var banner = function() {
    /*1. 自动轮播图且无缝   定时器，过渡*/
    /*2. 点要随着图片的轮播改变  根据索引切换*/ 
    /*3. 滑动效果  利用touch事件完成*/
    /*4. 滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡*/
    /*5. 滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡*/
    /*轮播图*/
	var banner = document.querySelector('.banner');
	/*屏幕宽度*/
	var width = banner.offsetWidth;
	/*图片容器*/
	var imageBox = banner.querySelector('.banner-list');
	/*点容器*/
	var pointBox = banner.querySelector('.banner-num');
	/*所有的点*/
	var points = pointBox.querySelectorAll('.num-text');

	var addTransition = function() {
		imageBox.style.transition = 'all 0.2s';
		imageBox.style.webkitTransition = 'all 0.2s';
	}
	var removeTransition = function() {
		imageBox.style.transition = 'none';
		imageBox.style.webkitTransition = 'none';
	}
	var setTranslateX = function(translateX) {
		imageBox.style.transform = 'translateX(' + translateX + 'px)';
		imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
	}

	var index = 1;
	//var num = $(".banner-list .item").length;
	var num = imageBox.querySelectorAll('.item').length;

	//	var timer = setInterval(function() {
	//		index++;
	//		addTransition();
	//		if(index<num){
	//			setTranslateX(-index * width);
	//		}else{
	//			index=0;
	//			removeTransition();
	//			setTranslateX(-index * width);
	//		}
	//	}, 1000);
	var timer = null;
	Carousel = function() {
		clearInterval(timer);
		timer = setInterval(function() {
			index++;
			addTransition();
			setTranslateX(-index * width);
		}, 2000);
	}
	Carousel();
	//	var timer = setInterval(function() {
	//		index++;
	//		addTransition();
	//		setTranslateX(-index * width);
	//	}, 2000);

    /*需要等最后一张动画结束去判断 是否瞬间定位第一张*/
	imageBox.addEventListener("transitionend", function() {
		if(index >= num - 1) {
		    //最后一张的时候变为第二张，即要显示的第一张
			index = 1;
			removeTransition();
			setTranslateX(-index * width);
		} else if(index <= 0) {
		    //第一张的时候变为倒数第二张，即要显示的最后一张
			index = num - 2;
			removeTransition();
			setTranslateX(-index * width);
		}
		setPoint();
	})
	var setPoint = function() {
		for(var i = 0; i < points.length; i++) {
			var obj = points[i];
			obj.classList.remove('active');
		}
		points[index - 1].classList.add('active');
	}

	//点击圆点切换
	for(var i = 0; i < points.length; i++) {　
		(function(n) {
			points[i].onclick = function() {
				//for(var i = 0; i < points.length; i++) {
				//	points[i].classList.remove('active');
				//}
				//points[n].classList.add('active');
				index = n + 1;
				addTransition();
				setTranslateX(-index * width);
				setPoint(); //等同于上面的
			}
		})(i)
	}
	document.querySelector(".prev").onclick = function() {
		clearInterval(timer);
		index = index - 1;
		addTransition(); //有transition才会执行transitionend
		setTranslateX(-index * width);
	}
	document.querySelector(".next").onclick = function() {
		clearInterval(timer);
		index = index + 1;
		addTransition();
		setTranslateX(-index * width);
	}
	//鼠标进入
	banner.addEventListener('mouseover', function(e) {
		clearInterval(timer);
		document.querySelector(".prev").style.display="block";
		document.querySelector(".next").style.display="block";
	})
	//鼠标移出
	banner.addEventListener('mouseout', function(e) {
		Carousel(index);
		document.querySelector(".prev").style.display="none";
		document.querySelector(".next").style.display="none";
	})
	
	//手指滑动切换
	var startX = 0;
	var distanceX = 0;
	var isMove = false;
	imageBox.addEventListener('touchstart', function(e) {
		/*清除定时器*/
		clearInterval(timer);
		/*记录起始位置的X坐标*/
		startX = e.touches[0].clientX;
	});

	imageBox.addEventListener('touchmove', function(e) {
		/*记录滑动过程当中的X坐标*/
		var moveX = e.touches[0].clientX;
		/*计算位移  有正负方向*/
		distanceX = moveX - startX;
		/*计算目标元素的位移  不用管正负*/
		/*元素将要的定位=当前定位+手指移动的距离*/
		var translateX = -index * width + distanceX;
		/*滑动--->元素随着手指的滑动做位置的改变*/
		removeTransition();
		setTranslateX(translateX);
		isMove = true;
	});

	imageBox.addEventListener('touchend', function(e) {
		/*4. 滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡*/
        /*5. 滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡*/
		/*要使用移动的距离*/
		if(isMove) {
			if(Math.abs(distanceX) < width / 3) {
				/*吸附*/
				addTransition();
				setTranslateX(-index * width);
			} else {
				/*切换*/
				/*右滑动 上一张*/
				if(distanceX > 0) {
					index--;
				}
				/*左滑动 下一张*/
				else {
					index++;
				}
				/*根据index去动画的移动*/
				addTransition();
				setTranslateX(-index * width);
			}
		}
		/*最好做一次参数的重置*/
		startX = 0;
		distanceX = 0;
		isMove = false;
		/*加上定时器*/
		//clearInterval(timer);
		//		timer = setInterval(function() {
		//			index++;
		//			addTransition();
		//			setTranslateX(-index * width);
		//		}, 2000);
		Carousel();
	});
}