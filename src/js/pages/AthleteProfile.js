/* global Dom7 twttr FB */

const data = require("../data.js");
const Page = require("./Page.js");
const $ = Dom7;


class AthleteProfile extends Page {

	load(container, query) {
		$(".navbar-link-athlete-swiper .navbar-icon").addClass("navbar-icon--active");

		const id = parseInt(query.id, 10);
		this._container = container;
		this._athlete = data.athletes.filter(a => a.id === id)[0];

		const profileTemplate = require("../../hbs/partials/athleteProfile.hbs");

		$(".athlete-profile-container", this._container).html(
			profileTemplate(this._athlete)
		);

		$(".athlete-profile-controls-name", this._container).html(this._athlete.firstName);

		this._app.swiper($(".athlete-gallery", this._container), {
			pagination: $(".athlete-gallery .swiper-pagination", this._container),
			spaceBetween: 10
		});

		this._app.swiper($(".athlete-instagram", this._container), {
			pagination: $(".athlete-instagram .swiper-pagination", this._container),
			spaceBetween: 10,
			slidesPerView: 3,
			slidesPerColumn: 1,
			slidesPerGroup: 6
		});

		this._app.swiper($(".athlete-twitter", this._container), {
			pagination: $(".athlete-twitter .swiper-pagination", this._container),
			spaceBetween: 10
		});
	}

}

module.exports = AthleteProfile;