/* global Dom7 */
var $ = Dom7;

var introSlides = [
	{
		id: "slide0",
		picture: "<img src='" + require("../img/welcome.png") + "'>",
		text: "<h1>Hvilke stjerner vil du følge til OL?</h1>Vi samler alle stjernernes daglige opdateringer og resultater til dig. Lige her."
	},
	{
		id: "slide1",
		picture: "<img src='" + require("../img/intro.png") + "'>",
		text: "Der er næsten 100 danske atleter med til OL, så du orker nok ikke at følge dem alle.<br/><br/>Brug 3 min. på at udvælge dem som interesserer dig.<br/><br/><a class='close-btn button active' href='#'>Vælg atleter</a>"
	}
];

function init(app) {
	const intro = app.welcomescreen(introSlides, {
		"bgcolor": "#fff",
		"fontcolor": "#000",
		"closeButton": false
	});
	$(".welcomescreen-container .close-btn").on("click", e => {
		intro.close();
	});

}

module.exports = {
	init: init
};