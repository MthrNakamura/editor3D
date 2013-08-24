var slideList = [];
var numSlides = 3;
var mouse = {x: undefined, y: undefined};
var offset;
var isDragging = false;
var focusSlide = undefined;

var dragSlide = function(e) {
	mouse.x = e.clientX - offset.x;
	mouse.y = e.clientY - offset.y;
};

$(function(){
	//コンテキストの取得
	var canvas = $('canvas');
	var context = canvas[0].getContext('2d');
	offset = canvas.offset();
	
	//描画オブジェクト: スライドの生成
	for (var i = 0; i < numSlides; i++) {
		slideList.push(new Slide3D(i, i*40, 0));
	}
	
	//マウスイベント
	canvas.bind('mousedown', function(e){
		mouse.x = e.clientX - offset.x;
		mouse.y = e.clientY - offset.y;
		
		//スライドをクリックしたか?
		for (var i = 0; i < numSlides; i++) {
			var slide = slideList[i];
			if (isInSlide(slide, mouse[0], mouse[1])) {
				//このスライドをフォーカス
				focusSlide = i;
				//ドラッグの開始位置を記録
				slide.prevPos[0] = mouse.x;
				slide.prevPos[1] = mouse.y;
				//ドラッグイベントをバインド
				isDragging = true;
				canvas.bind('mousemove', dragSlide);
				break;
			}
		}
	});
	canvas.bind('mouseup', function(e){
		//ドラッグイベントを解除
		canvas.unbind('mousemove', dragSlide);
		isDragging = false;
		
		//フォーカスされたスライドを最前面にするために描画順位を最下位にする
		var slide = $.extend(true, {}, slideList[focusSlide]);
		slideList.splice(focusSlide, 1);
		slideList.push(slide);
		focusSlide = undefined;
	});
	//描画
	for (var i = 0; i < numSlides; i++) {
		var slide = slideList[i];
		context.beginPath();
		context.fillStyle = "#ffffff";
		context.fillRect(slide.pos[0], slide.pos[1], slide.width, slide.height);
	}
	
	setInterval(function(){
		for (var i = 0; i < numSlides; i++) {
			var slide = slideList[i];
			context.beginPath();
			context.fillStyle = "#ffffff";
			if (isDragging && i == focusSlide) {
				context.rect(mouse.x, mouse.y, slide.width, slide.height);	
			} else {
				context.rect(slide.pos[0], slide.pos[1], slide.width, slide.height);
			}
			context.fill();
		}	
	}, 30);
});

function isInSlide(slide, x, y) {
	window.alert(x+" : "+y);
	return ((slide.x < x && x < (slide.x + slide.width))&&(slide.y < y && y < (slide.y + slide.height)));
}