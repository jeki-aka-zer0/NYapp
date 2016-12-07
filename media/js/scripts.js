/**
 * all scripts
 * minificate here http://dean.edwards.name/packer/
 * @author zer0 <zer0.stat@mail.ru>
 * @link https://github.com/jeki-aka-zer0
 */

function MyApi(){
	var
		self = this;

	/**
	 * init app
	 */
	this.init = function(){
		$('HTML').addClass('js');

		$('body')
			.on('click', '.menu__item__link', '.menu', function(e){
				var $link = $(this);
				if (!$link.hasClass('menu__item__link-active'))
					try {
						var hash = $link.attr('href').replace('#', '');
						myApi.scrollTo($('a[name=' + hash + ']').offset());
					} catch (err) {
					}

				e.preventDefault();
				return false;
			});

		$('#steps li.step')
			.bind('inview', function(e, isInView){
				var $step = $(this);
				if (isInView && $step.hasClass('not-initialized'))
					setTimeout(function(){
						$step.removeClass('not-initialized');
					}, 200);
			});

		$('#prices__center')
			.bind('inview', function(e, isInView){
				var $priceItems = $('.price__items .price__item');
				if (isInView && $priceItems.eq(0).hasClass('not-initialized'))
					setTimeout(function(){
						$priceItems.removeClass('not-initialized');
					}, 200);
			});

		self.initSlider();
		self.initPhone();
	};

	/**
	 * init slider
	 */
	this.initSlider = function(){
		var
			$slider = $('#slider'),
			$lis = $slider.find('li.carousel-item');

		$lis.width($('body').width());

		$('.jcarousel')
			.jcarousel({wrap: 'circular'})
			.jcarouselAutoscroll({
				interval: 4000,
				easing: 'linear',
				autostart: true
			});

		$('.jcarousel-control-prev')
			.on('jcarouselcontrol:active', function(){
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function(){
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				target: '-=1'
			});

		$('.jcarousel-control-next')
			.on('jcarouselcontrol:active', function(){
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function(){
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				target: '+=1'
			});

		$('.jcarousel-pagination')
			.on('jcarouselpagination:active', 'a', function(){
				$(this).addClass('active');
			})
			.on('jcarouselpagination:inactive', 'a', function(){
				$(this).removeClass('active');
			})
			.jcarouselPagination();
	};

	/**
	 * init phone animations
	 */
	this.initPhone = function(){
		var
			$phone = $('#phone'),
			isDragging,
			$placemark = $('.phone__placemark', $phone);

		$('.phone__map', $phone)
			.mousedown(function(){
				isDragging = false;
				$placemark.hide();
			})
			.mousemove(function(){
				isDragging = true;
			})
			.mouseup(function(e){
				var
					wasDragging = isDragging,
					$map = $(this);
				isDragging = false;
				if (!wasDragging) {
					var
						parentOffset = $map.parent().offset(),
						relX = e.pageX - parentOffset.left - 14,
						relY = e.pageY - parentOffset.top - 37;

					$placemark
						.show()
						.css({
							left: relX,
							top: relY
						});
				}
			})
			.backgroundDraggable();

		$('.phone_button', $phone)
			.click(function(){
				$('.phone__top, .phone__placemark, .phone__map, .phone__notes', $phone).hide();
			});

		$('.nycity__btn', $phone)
			.click(function(){
				$('.phone__top, .phone__map', $phone).show();
			});

		$('.notes__btn', $phone)
			.click(function(){
				$('.phone__notes', $phone).show();
			});
	};

	/**
	 * scroll window to element
	 * @param blockOffset
	 */
	this.scrollTo = function(blockOffset){
		if (typeof blockOffset != 'undefined')
			$('html, body').stop().animate({
				scrollTop: blockOffset.top
			});
	};
};

var myApi = new MyApi();

$(function(){
	myApi.init();
});