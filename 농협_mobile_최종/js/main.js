var key_enter = true;
var firstPlayStop = "stop";

function fn_swiper(playStop){
	firstPlayStop = playStop;
}

$(function () {

/**********************************************
  *	Swiper - visual-link
**********************************************/
var visuallinkSwiper = new Swiper('.link-box', {
	watchSlidesProgress: true,
	watchSlidesVisibility: true,
	slidesPerView: 3,
	spaceBetween: 8,
	a11y: true,
	});
var visuallink_60Swiper = new Swiper('.link-box-60', {
	watchSlidesProgress: true,
	watchSlidesVisibility: false,
	slidesPerView: 2.5,
	spaceBetween: 8,
	});


/**********************************************
*	Swiper - visual
**********************************************/
var introSwiper = new Swiper('.section01 .intro-swiper', {
    loop: true,
	speed: 300,
    effect: 'fade',
	autoplay: {
		delay: 5000,
		},
	runCallbacksOnInit: true,
	
	on: {
		slideChangeTransitionEnd: function () {
            var $currentSlide = $('.swiper-container').find('.swiper-slide-active');
            sliderPlay();
			visual04();
        },
		init: function (swiperint) {
			$('.intro-swiper .swiper-wrapper .swiper-slide').attr('aria-hidden', 'true');
			$('.intro-swiper .swiper-slide-active').attr('aria-hidden', 'false');
			var focusAbles = $('.intro-swiper .swiper-wrapper').find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');

			focusAbles.each(function () {
				$(this).attr('data-default-tabindex', function () {
					if ($(this).attr("tabindex")) {
						return $(this).attr('tabindex');
					} else {
						return "none";
					}

				});
			});
			focusAbles.attr('tabindex', '-1');
			console.log('swiperint initialized');
		},
		slideChange: function (swiperint) {
			var myslide = introSwiper.activeIndex;
			$('.intro-swiper .swiper-wrapper .swiper-slide').attr('aria-hidden', 'true');
			/*make all non-focusable*/
			var focusAbles = $('.intro-swiper .swiper-wrapper').find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');
			focusAbles.each(function () {
				if (!$(this).attr("data-default-tabindex")) {
					$(this).attr('data-default-tabindex', function () {
						if ($(this).attr("tabindex")) {
							return $(this).attr('tabindex');
						} else {
							return "none";
						}
					});
				}
			});
			focusAbles.attr('tabindex', '-1');
				setTimeout(function () {
					$('.intro-swiper .swiper-wrapper .swiper-slide-active').attr('aria-hidden', 'false');
					var focusAbles = $('.intro-swiper .swiper-wrapper .swiper-slide-active').find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');

					focusAbles.each(function () {
						$(this).attr('tabindex', function () {
							if ($(this).attr("data-default-tabindex") != "none") {
								return $(this).attr('data-default-tabindex');
							} else {
								$(this).removeAttr('tabindex');
							}

						});
					});
					focusAbles.removeAttr('data-default-tabindex');
					$("#SwiperLive").text("Slide " + (myslide + 1) + " displayed");
				}, 0);
			},
		},
	
	keyboard: {
		enabled: true,
		},
	// slideRole:'gruop',	
	pagination: {
		el: '.swiper-pagination',
		type: 'fraction',
		clickable: true,
		},	
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
	a11y: false,
});

// visual-60주년 링크 
function visual04(){
	if($('.visual04').hasClass('swiper-slide-active')){
		$('.link-box').fadeOut();
		$('.link-box-60').fadeIn();
		$('.link-box-60  a').css('opacity','1');
		$('.link-box-60  a').attr('aria-hidden','false');
	}else{
		$('.link-box').fadeIn();
		$('.link-box-60').fadeOut();
		$('.link-box-60  a').attr('aria-hidden','true');
	}
}

// play button control
$(".intro-swiper .swiper-button-control .pause").click(function(){
    introSwiper.autoplay.stop();
    $(this).hide();
    $('.intro-swiper .swiper-button-control .play').fadeIn();
});
$(".intro-swiper .swiper-button-control .play").click(function(){
    introSwiper.autoplay.start();
    $(this).hide();
    $('.intro-swiper .swiper-button-control .pause').fadeIn();
});

var timerID = null;
function sliderPlay() {
	clearTimeout(timerID);
	if (checkHasVideo()) {
		$('.section01 .swiper-container').find('.swiper-slide-active video')[0].addEventListener('ended', nextSlider);
		}

	function checkHasVideo() {
		if ($('.section01 .swiper-container').find('.swiper-slide-active video').length) {
			var video = $('.section01 .swiper-container').find('.swiper-slide-active video').get(0);
			video.play();
			$('a[name=startStop]').click();
			return true;
		} 
		else {
			$('.section01 .swiper-container').find('video').each(function () {
				this.pause();
				if(firstPlayStop == 'play'){
					$('a[name=startPlay]').click();
				}else if(firstPlayStop == 'stop'){
					$('a[name=startStop]').click();
				}
			});
			return false;
		}
	}
	function nextSlider() {
		introSwiper.slideNext();
	}

}


	
/**********************************************
  *	Swiper - banner & event
**********************************************/
  var ban_swiper = new Swiper(" .banSwiper", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
  	  },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    	},
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    	},
    });
  
  
    $(".banSwiper .swiper-button-control .pause").click(function(){
      ban_swiper.autoplay.stop();
      $(this).hide();
      $('.banSwiper .swiper-button-control .play').fadeIn();
    });
    $(".banSwiper .swiper-button-control .play").click(function(){
      ban_swiper.autoplay.start();
      $(this).hide();
      $('.banSwiper .swiper-button-control .pause').fadeIn();
    });
  

/**********************************************
  *	sile-menu
**********************************************/
 // 전역변수 선언
var header = $("#header_nav"),
	topHeader =$("header"),
	logo = header.find("h1"),
	btnMenu = header.find(".btnMenu"),	
	gnb = $(".all_menu"),
	btnClose = gnb.find(".btnClose"),
	dapth01 = gnb.find("> ul"),
	depth02 = dapth01.find("ul"),
	dim = $('<div class="allMenu-backdrop"/>').appendTo("body"),
	topheaderBg = $("header #header_nav"),
	lastScrollTop = 0;
$(window).on('scroll', function () {
		st = $(this).scrollTop();

		if (st < lastScrollTop) {
			headerAni('up');
		} else if (st > lastScrollTop) {
			headerAni('down');
		}

		if (st >= 1) {
			headerAni('top');
		} 

		lastScrollTop = st;
	});

	function headerAni(_direction) {
		if (_direction === 'up') {
			$('header').removeClass('down');
			$('header').addClass('bgwhite');
			
		} else if (_direction === 'down') {
			$('header').removeClass('up');
			$('header').addClass('bgwhite');
			if ($('.submenu-wrap').length > 0) {
				$('header').addClass('down');
			}
		} 
		else if (_direction === 'top') {
			$('header').removeClass('bgwhite up down');
			
			
		}
	}

// accessibilityFocus()
	$(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){
		 var next = $(e.target).attr('data-focus-next'),
		  prev = $(e.target).attr('data-focus-prev'), 
		  target = next || prev || false; 
		if(!target || e.keyCode != 9) { return; }
		 if( (e.shiftKey && prev) ) { 
				header.removeClass("open");
				$('all_menu').fadeOut(200);
				btnClose.fadeOut(200);
				logo.fadeIn(200);
				dim.fadeOut();
				$("html, body").css({"overflow-y":"auto"});
			} 
			if( ( next) ) { 				
				logo.fadeIn(200);
			}
		});

	dapth01.on({
	focusin : function(){
		header.addClass("on");
	},
	mouseenter : function(){
		header.addClass("on");
	},
	mouseleave : function(){
		header.removeClass("on");
	}
	});

// focusin focusout
	btnMenu.on('click', function(e){
		e.preventDefault();
		header.addClass("open");
		btnClose.fadeIn(200);
		logo.fadeOut(200);
		dim.fadeIn();
		$("html, body").css({"overflow":"hidden"});
	});

	btnClose.on('focusout click', function(e){
	  e.preventDefault();
	  header.removeClass("open");
	  $(this).fadeOut(200);
	  logo.fadeIn(200);
	  dim.fadeOut();
	  $("html, body").css({"overflow-y":"auto"});
	});

	$('#header_nav>nav').on('focusin', function(e){
		e.preventDefault();
		header.addClass("open");
		btnClose.fadeIn(200);
		logo.fadeOut(200);
	  });
	  
	
	dapth01.find("> li > h2 ").click(function(e){
		e.preventDefault();
		if($(this).parent().hasClass("on")){
		  dapth01.find("> li").removeClass("on");
		  dapth01.find("> li>ul").slideUp(200);
		}else{
		  dapth01.find("> li").removeClass("on");
		  dapth01.find("> li>ul").slideUp(200);
		  $(this).parent().addClass("on");
		  $(this).siblings("ul").slideDown(200);
		}
	});
  
	dapth01.find('> li >  h2 > a').on({
	  'click' : function(ev){
		$(this).parent().parent().siblings().removeClass('current');
		$(this).parent().parent().addClass('current');
		ev.preventDefault();
	  },
	  'focus' : function(ev){
		$(this).parent().parent().siblings().removeClass('current');
		$(this).parent().parent().addClass('current');
		ev.preventDefault();
	  }
	});
	function close_dim_layer(){
		$(".allMenu-backdrop").hide();
	}
  	$('a[name=startStop]').click();

});
