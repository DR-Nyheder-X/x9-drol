/* global Dom7 */

const data = require("../data.js");
const Page = require("./Page.js");
const $ = Dom7;

class AthleteSwiper extends Page {

	constructor(app, view) {
		super(app, view);
		app.onPageBeforeAnimation("athlete-swiper", () => {
			this.refresh();
		});
	}

	setupEvents() {
		let startX = 0;
		let lastX = 0;

		const touchStart = e => {
			startX = e.touches[0].clientX;
			lastX = startX;
			$(".card-container .athlete-card", this._container).addClass("athlete-card--swiping");
			$(document).on("touchmove", touchMove);
			$(document).on("touchend", touchEnd);
		};
		const touchMove = e => {
			e.preventDefault();
			lastX = e.touches[0].clientX;
			const deltaX = lastX - startX;
			const containerWidth = $(this._container).width();

			$(".card-container .athlete-card", this._container).transform("translate3d(" + deltaX + "px,0,0) rotate(" + (deltaX / containerWidth * 10) + "deg)");
		};
		const touchEnd = e => {
			$(".card-container .athlete-card", this._container).removeClass("athlete-card--swiping");

			const deltaX = lastX - startX;
			const containerWidth = $(this._container).width();
			if (Math.abs(deltaX / containerWidth) > 0.4) {
				if (deltaX < 0) {
					this.rejectCurrent();
				} else {
					this.acceptCurrent();
				}
			} else {
				$(".card-container .athlete-card", this._container).transform("translate3d(0,0,0)");
			}

			$(document).off("touchmove", touchMove);
			$(document).off("touchend", touchEnd);
		};

		$(".card-container", this._container).on("touchstart", touchStart);

		$(".athlete-card-button--reject", this._container).on("click", this.rejectCurrent.bind(this));
		$(".athlete-card-button--accept", this._container).on("click", this.acceptCurrent.bind(this));
		$(".athlete-card-button--info", this._container).on("click", this.showProfile.bind(this));
		$(".card-container", this._container).on("click", this.showProfile.bind(this));
	}

	showProfile() {
		this._view.router.loadPage({
			url: "pages/athlete-profile.html?id=" + this._currentAthlete.id
		});
	}

	load(container, query) {
		$(".navbar-link-athlete-swiper .navbar-icon").addClass("navbar-icon--active");
		this._container = container;
		this.setupEvents();
		this.showNext();
	}

	acceptCurrent() {
		data.user.queue.shift();
		data.user.following[this._currentAthlete.id] = true;
		$(".card-container .athlete-card", this._container).transform("");
		$(".card-container .athlete-card", this._container).addClass("athlete-card--swipe-right");
		setTimeout(() => {
			this.showNext();
		}, 300);
	}

	rejectCurrent() {
		data.user.queue.shift();
		$(".card-container .athlete-card", this._container).transform("");
		$(".card-container .athlete-card", this._container).addClass("athlete-card--swipe-left");
		setTimeout(() => {
			this.showNext();
		}, 300);
	}

	updateCounter() {
		$(".athlete-swiper__counter", this._container).html(data.user.queue.length + " atlet" + (data.user.queue.length !== 1 ? "er" : "") + " tilbage");
	}

	showNext() {
		if (data.user.queue.length === 0) {
			$(".card-container", this._container).hide();
			$(".card-queue", this._container).hide();
			$(".athlete-swiper__counter", this._container).hide();
			$(".athlete-swiper__controls", this._container).hide();
			$(".athlete-swiper__done", this._container).show();
			return;
		}
		this.updateCounter();
		const cardTemplate = require("../../hbs/partials/athleteCard.hbs");
		const athlete = data.user.queue[0];
		if (data.user.following[athlete.id]) {
			data.user.queue.shift();
			this.showNext();
			return;
		}
		this._currentAthlete = athlete;
		$(".card-container", this._container).html(
			cardTemplate(athlete)
		);
		setTimeout(() => {
			$(".athlete-card", this._container).addClass("athlete-card--active");
		},1);

		if (data.user.queue.length > 1) {
			const nextAthlete = data.user.queue[1];
			$(".card-queue", this._container).html(
				cardTemplate(nextAthlete)
			);
		} else {
			$(".card-queue", this._container).hide();
		}
		
	}

	refresh() {
		if (this._currentAthlete && data.user.following[this._currentAthlete.id]) {
			data.user.queue.shift();
			this.showNext();
		}
	}

}

module.exports = AthleteSwiper;