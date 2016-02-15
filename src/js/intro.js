/* global Dom7 */
var $ = Dom7;

var introSlides = [
	{
		id: "slide0",
		picture: "<img src='" + require("../img/intro1.jpg") + "'>"
	},
	{
		id: "slide1",
		picture: "<img src='" + require("../img/intro2.jpg") + "'>"
	}
];

function init(app, callback) {
	const intro = app.welcomescreen(introSlides, {
		"bgcolor": "#fff",
		"fontcolor": "#000",
		"closeButton": false,
		pagination: false,
		onClosed: callback
	});
	$(".welcomescreen-container .close-btn").on("click", e => {
		intro.close();
	});
	$(".welcomescreen-container #slide0").on("click", e => {
		intro.next();
	});
	$(".welcomescreen-container #slide1").on("click", e => {
		intro.close();
	});

	

}

module.exports = {
	init: init
};