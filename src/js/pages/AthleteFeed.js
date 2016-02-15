/* global Dom7 twttr FB */

const data = require("../data.js");
const Page = require("./Page.js");
const $ = Dom7;
const feedTemplates = {
	drartikel: require("../../hbs/partials/athleteFeedDRArtikel.hbs"),
	twitter: require("../../hbs/partials/athleteFeedTwitter.hbs"),
	facebook: require("../../hbs/partials/athleteFeedFacebook.hbs"),
	event: require("../../hbs/partials/athleteFeedEvent.hbs")
};


class AthleteFeed extends Page {

	constructor(app, view) {
		super(app, view);
		this._firstLoad = true;
	}

	load(container, query) {
		this._container = container;

		if (this._firstLoad) {
			const waiting = data.feed.waiting;
			data.feed.waiting = [];
			setTimeout(() => {
				data.feed.waiting = waiting;
			}, 5000);
		} else {
			data.feed.waiting.forEach(e => {
				data.feed.entries.push(e);
			});
			data.feed.waiting.length = 0;
		}

		this.loadInitialEntries(this.addEntries.bind(this));

		var ptrContent = $(".pull-to-refresh-content", this._container);
		ptrContent.on("refresh", () => {
			this.loadNewEntries(entries => {
				if (entries) {
					this.addEntries(entries);
				}
				this._app.pullToRefreshDone();
			});
		});

		function updateFeedBadge() {
			if (data.feed.waiting.length > 0) {
				$(".navbar-link-athlete-feed .badge").html(data.feed.waiting.length).show();
			} else {
				$(".navbar-link-athlete-feed .badge").hide();
			}

		}
		setInterval(updateFeedBadge, 100);
		this._firstLoad = false;
	}

	addEntries(entries) {
		const feedContainer = $(".feed-container", this._container);

		entries.forEach(entry => {
			if (entry.type in feedTemplates) {
				entry.target = data.athletes.find(a => a.id === entry.athlete);
				feedContainer.prepend(
					feedTemplates[entry.type](entry)
				);
			}
		});
		

		twttr.widgets.load();
		FB.XFBML.parse();
	}

	loadInitialEntries(callback) {
		setTimeout(() => {
			callback(data.feed.entries);
		}, 0);
	}

	loadNewEntries(callback) {
		setTimeout(() => {
			callback(data.feed.waiting);
			data.feed.waiting.length = 0;
		}, 1000);
	}

}

module.exports = AthleteFeed;