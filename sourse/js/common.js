"use strict";
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад", 
			}, 
		}); 
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.days, '.days');
					setValue(data.amount, '.amount');
					//
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume() {
		//ultimate tabs
		let cTabs = document.querySelectorAll('.tabs');
		for (let tab of cTabs){
			let Btns = tab.querySelectorAll('.tabs__btn')
			let contentGroups = tab.querySelectorAll('.tabs__wrap');

			for (let btn of Btns){
				btn.addEventListener('click', function (){

					for (let btn of Btns){
						btn.classList.remove('active');
					}
					this.classList.add('active');

					let index = [...Btns].indexOf(this);
					//-console.log(index);

					for (let cGroup of contentGroups){
						let contentItems = cGroup.querySelectorAll('.tabs__content');

						for (let item of contentItems){
							item.classList.remove('active');
						}
						contentItems[index].classList.add('active');
					}
				})
			}
		}
	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	//pure js
	animateScroll(topShift=80) {
		document.addEventListener('click', function (){
			if (event.target.closest('.menu li a, .scroll-link')) {
				let self = event.target.closest('.menu li a, .scroll-link');
				event.preventDefault();

				let targetSelector = self.getAttribute('href');
				let target = document.querySelector(targetSelector);

				if (!target) {
					self.setAttribute("href", '/' + targetSelector);
				}
				else{
					event.preventDefault();
					let targetTop = target.offsetTop;
					window.scrollTo({
						top: targetTop - topShift,
						behavior: "smooth",
					});
				}

			}
		});
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume();
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	//luckyOne Js
	let headerH;
	let header = document.querySelector(".header--js");
	function calcHeaderHeight() {
		if (!header) return;
		document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
		window.setTimeout(function (){
			document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
		}, 10);
		headerH = header.offsetHeight;

		window.scrollY > 0
			? header.classList.add('fixed')
			: header.classList.remove('fixed');
	}
	window.addEventListener('resize', calcHeaderHeight, { passive: true });
	window.addEventListener('scroll', calcHeaderHeight, { passive: true });
	calcHeaderHeight();
	window.setTimeout(calcHeaderHeight, 10);
	window.setTimeout(calcHeaderHeight, 100);

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	//-
	let freeMomentum = {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	};

	let defSlider = new Swiper('selector', {
		...defaultSl,
		...freeMomentum,
	});
	//-
	document.querySelectorAll('.btn-default-js').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');

	//
	let sCharsSlider = new Swiper('.sChars-slider-js', {
		slidesPerView: "auto",
	});

	//-
	let sSliderSlider = new Swiper('.sSlider-slider-js', {
		slidesPerView: "auto",
		spaceBetween: 30,

		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			dragSize: 26,
		},
	});
	//
	let sFeedbackSlider = new Swiper('.sFeedback-slider-js', {
		slidesPerView: "auto",
		spaceBetween: 0,

		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			dragSize: 26,
		},
	});
	// rangle sliders
	function currencyFormat(num) {
		return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
	}
	$(".range-wrap").each(function () {
		let _this = $(this);
		var $range= _this.find(".slider-js");

		//-btn
		let modalBtn = document.querySelector('.calc-btn-js');
		let thisFor = $range.data('for');
		//

		let $amountInp = _this.find('.amount-inp-js');
		let $minBtn = _this.find('.amount-min-btn-js');
		let $plusBtn = _this.find('.amount-plus-btn-js');
		var instance, from, to,
			min = $range.data('min'),
			max = $range.data('max');

		$range.ionRangeSlider({
			skin: "round",
			grid: false,
			grid_snap: false,
			hide_min_max: false,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs,
			onUpdate: updateInputs,
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			$amountInp.prop("value", currencyFormat(data.from));
			modalBtn.setAttribute(`data-${thisFor}`, currencyFormat(data.from));
		}

		$amountInp.on("change input ", function () {
			var val = +($(this).prop("value").replace(/\s/g, ''));
			// validate
			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});
			$(this).prop("value", currencyFormat(val));

		});
		$minBtn.on("click", function (){
			let newVal = Number($amountInp.prop("value")) - 1;
			if (newVal > Number(min) && newVal < Number(max)){
				$amountInp.prop("value", newVal);
				instance.update({
					from: newVal
				});
			}
		});
		$plusBtn.on("click", function (){
			let newVal = Number($amountInp.prop("value")) + 1;
			if (newVal > Number(min) && newVal < Number(max)){
				$amountInp.prop("value", newVal);
				instance.update({
					from: newVal
				});
			}
		});
	});

	//-
	$('.make-yandex-lazy-js').each(function (){
		let self = this;

		window.setTimeout(function (){
			$(self.parentElement).html($(self).data("src"));
			self.remove();
		}, 3500)
	});
	$('.scroll-top-js').click(function (){
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	})
	//
	let playButton = document.querySelector('.play-btn-js');
	let video = document.querySelector('.video-js');
	// Event listener for the play/pause button
	playButton.addEventListener("click", function() {
		if (video.paused == true) {
			// Play the video
			video.play();
		} else {
			// Pause the video
			video.pause();
		}
	});

	// modal window

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}