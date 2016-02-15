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
		this._latestEntry = -1;

		function updateFeedBadge() {
			const numNew = data.feed.entries.filter(e => !data.user.feed.entries[e.id]).length;
			if (numNew > 0) {
				$(".navbar-link-athlete-feed .badge").html(numNew).show();
			} else {
				$(".navbar-link-athlete-feed .badge").hide();
			}

		}
		setInterval(updateFeedBadge.bind(this), 100);
	}

	load(container, query) {
		this._container = container;

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

		this._firstLoad = false;
	}

	addEntries(entries, isNew) {
		const feedContainer = $(".feed-container", this._container);

		entries.forEach(entry => {
			entry.unread = !data.user.feed.entries[entry.id];
			data.user.feed.entries[entry.id] = true;
			this._latestEntry = entry.id;
			if (entry.type in feedTemplates) {
				entry.target = data.athletes.find(a => a.id === entry.athlete);
				feedContainer.prepend(
					feedTemplates[entry.type](entry)
				);
			}
		});
		
	}

	loadInitialEntries(callback) {
		setTimeout(() => {
			callback(data.feed.entries);
		}, 0);
	}

	loadNewEntries(callback) {
		setTimeout(() => {
			callback(
				data.feed.entries.filter(e => e.id > this._latestEntry)
			);
		}, 1000);
	}

}

module.exports = AthleteFeed;