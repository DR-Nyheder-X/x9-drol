/* global Framework7 Dom7 */

require("./libs.js");
require("../less/styles.less");

var intro = require("./intro.js");
var data = require("./data.js");

var app = new Framework7();
var mainView = app.addView(".view-main", {});
var $ = Dom7;


var pageControllers = {
	"athlete-list": require("./pages/AthleteList.js"),
	"athlete-feed": require("./pages/AthleteFeed.js"),
	"athlete-profile": require("./pages/AthleteProfile.js"),
	"athlete-swiper": require("./pages/AthleteSwiper.js")
};

Object.keys(pageControllers).forEach(page => {
	pageControllers[page] = new pageControllers[page](app, mainView);
});

$(document).on("pageBeforeInit", e => {
	let page = e.detail.page;
	if (page.name in pageControllers) {
		let controller = pageControllers[page.name];
		controller.load(page.container, page.query);
	}
});

$(".list-panel-athlete-list").on("click", e => {
	mainView.router.loadPage("/pages/athlete-list.html");
});

$(".navbar-link-athlete-feed").on("click", e => {
	mainView.router.loadPage("/pages/athlete-feed.html");
});

$(".navbar-link-athlete-swiper").on("click", e => {
	mainView.router.loadPage("/pages/athlete-swiper.html");
});

data.init(() => {
	$(".navbar").show();
	mainView.router.loadPage({
		url: "/pages/athlete-swiper.html",
		animatePages: false,
		reload: true
	});

	// intro.init(app);	
})

