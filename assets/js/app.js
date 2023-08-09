$(function () {
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
});
