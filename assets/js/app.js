$(function () {
	/* Nav Toggle on mobile
	=========================================== */

	let navToggle = $('#navToggle');
	let nav = $('#nav');

	navToggle.on('click', function (event) {
		event.preventDefault();

		$('body').toggleClass('show-nav');
		$(this).toggleClass('active');
		nav.toggleClass('show');
	});

	$(window).on('resize', function () {
		$('body').removeClass('show-nav');
		navToggle.removeClass('active');
		nav.removeClass('show');
	});

	let intro = $('#intro');
	let header = $('#header');
	let introH = intro.innerHeight();
	let headerH = header.innerHeight();
	let scrollTop = $(window).scrollTop();

	/* Header class on scroll
	=========================================== */

	headerScroll();

	$(window).on('scroll resize', function () {
		headerScroll();
	});

	function headerScroll() {
		introH = intro.innerHeight();
		headerH = header.innerHeight();

		let scrollTop = $(this).scrollTop();

		if (scrollTop >= introH - headerH) {
			header.addClass('header--dark');
		} else {
			header.removeClass('header--dark');
		}
	}

	/* Smooth Scroll to sections
	=========================================== */

	$('[data-scroll]').on('click', function (event) {
		event.preventDefault();

		let scrollEl = $(this).data('scroll');
		let scrollElPos = $(scrollEl).offset().top;

		$('body').removeClass('show-nav');
		navToggle.removeClass('active');
		nav.removeClass('show');

		$('html, body').animate(
			{
				scrollTop: scrollElPos - headerH,
			},
			500,
		);
	});

	/* ScrollSpy for sections
	=========================================== */
	let windowH = $(window).height();

	scrollSpy(scrollTop);

	$(window).on('scroll', function () {
		scrollTop = $(this).scrollTop();

		scrollSpy(scrollTop);
	});

	function scrollSpy(scrollTop) {
		$('[data-scrollspy]').each(function () {
			let $this = $(this);

			let sectionId = $this.data('scrollspy');
			let sectionOffset = $this.offset().top;

			sectionOffset -= windowH / 3;

			if (scrollTop >= sectionOffset) {
				$('[data-scroll]').removeClass('active');

				$('[data-scroll="' + sectionId + '"]').addClass('active');
			}

			if (scrollTop < introH / 2) {
				$('[data-scroll]').removeClass('active');
			}
		});
	}

	/* Modal windows show-hide
	=========================================== */

	$('[data-modal]').on('click', function (event) {
		event.preventDefault();

		let modal = $(this).data('modal');

		$('body').addClass('no-scroll');
		$(modal).addClass('show');

		setTimeout(function () {
			$(modal).find('.modal__content').css({
				transform: 'scale(1)',
				opacity: '1',
			});
		}, 200);
	});

	$('[data-modal-close]').on('click', function (event) {
		event.preventDefault();

		let modal = $(this).parents('.modal');

		modalClose(modal);
	});

	$('.modal').on('click', function () {
		let modal = $(this);

		modalClose(modal);
	});

	$('.modal__content').on('click', function (event) {
		event.stopPropagation();
	});

	function modalClose(modal) {
		modal.find('.modal__content').css({
			transform: 'scale(0.5)',
			opacity: '0',
		});

		setTimeout(function () {
			$('body').removeClass('no-scroll');
			modal.removeClass('show');
		}, 200);
	}

	/* Slick slider for <Intro> block 
	https://kenwheeler.github.io/slick/
	=========================================== */
	let introSlider = $('#introSlider');

	introSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		autoplay: true,
		autoplaySpeed: 4000,
		speed: 500,
	});

	$('#introSliderPrev').on('click', function () {
		introSlider.slick('slickPrev');
	});

	$('#introSliderNext').on('click', function () {
		introSlider.slick('slickNext');
	});

	/* Slick slider for <Clients reviews> block 
	https://kenwheeler.github.io/slick/
	=========================================== */

	let reviewsSlider = $('#reviewsSlider');

	reviewsSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		speed: 500,
	});
});
