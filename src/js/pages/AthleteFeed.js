/* global Dom7 */

const data = require("../data.js");
const Page = require("./Page.js");
const $ = Dom7;
const feedTemplates = {
	drartikel: require("../../hbs/partials/athleteFeedDRArtikel.hbs"),
	btartikel: require("../../hbs/partials/athleteFeedBTArtikel.hbs"),
	archive: require("../../hbs/partials/athleteFeedArchive.hbs"),
	twitter: require("../../hbs/partials/athleteFeedTwitter.hbs"),
	facebook: require("../../hbs/partials/athleteFeedFacebook.hbs"),
	event: require("../../hbs/partials/athleteFeedEvent.hbs"),
	result: require("../../hbs/partials/athleteFeedResultat.hbs")
};

class AthleteFeed extends Page {

	constructor(app, view) {
		super(app, view);
		this._firstLoad = true;
		this._latestEntry = -1;

		function updateFeedBadge() {
			const numNew = data.feed.entries.filter(e => !data.user.feed.entries[e.id] && data.user.following[e.athlete]).length;
			if (numNew > 0) {
				$(".navbar-link-athlete-feed .navbar-icon").addClass("navbar-icon--updates");
			} else {
				$(".navbar-link-athlete-feed .navbar-icon").removeClass("navbar-icon--updates");
			}

		}
		setInterval(updateFeedBadge.bind(this), 100);
	}

	load(container, query) {
		this._container = container;
		$(".navbar-link-athlete-feed .navbar-icon").addClass("navbar-icon--active");

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
			const athlete = data.athletes.filter(a => a.id === entry.athlete)[0];
			if (!data.user.following[athlete.id]) {
				return;
			}
			entry.unread = !data.user.feed.entries[entry.id];
			data.user.feed.entries[entry.id] = true;
			this._latestEntry = entry.id;
			if (entry.type in feedTemplates) {
				entry.target = athlete;
				entry.data.author = entry.data.author || entry.target.name;
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