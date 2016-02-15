/* global Dom7 */

const $ = Dom7;
const DATA_URL_ATHLETES = "https://spreadsheets.google.com/feeds/list/1Z0G_Cf7zbRkeSoEMixr7qoYOrqQL48tIK19sDIF5Gy4/1/public/values?alt=json";
const DATA_URL_FEED = "https://spreadsheets.google.com/feeds/list/1Z0G_Cf7zbRkeSoEMixr7qoYOrqQL48tIK19sDIF5Gy4/2/public/values?alt=json";
const data = {
	init: getData
};

function getAthleteData(callback) {
	$.get(DATA_URL_ATHLETES, (json) => {
		const obj = JSON.parse(json);
		data.athletes = obj.feed.entry.map(e => {
			const athlete = {
				id: parseInt(e.gsx$id.$t, 10),
				name: e.gsx$name.$t,
				firstName: e.gsx$name.$t.split(" ")[0],
				description: e.gsx$description.$t,
				role: e.gsx$role.$t,
				likes: e.gsx$likes.$t,
				portrait: e.gsx$portrait.$t,
				gallery: e.gsx$gallery.$t.split("\n").filter(url => url.trim() !== "").map(url => ({
					url: url
				})),
				meters: [
					{
						value: parseInt(e.gsx$meter1.$t, 10),
						label: e.gsx$metertext1.$t
					},
					{
						value: parseInt(e.gsx$meter2.$t, 10),
						label: e.gsx$metertext2.$t
					},
					{
						value: parseInt(e.gsx$meter3.$t, 10),
						label: e.gsx$metertext3.$t
					}
				],
				tweets: [
					{
						content: e.gsx$tweet1.$t,
						author: e.gsx$tweetauthor1.$t
					},
					{
						content: e.gsx$tweet2.$t,
						author: e.gsx$tweetauthor2.$t
					},
					{
						content: e.gsx$tweet3.$t,
						author: e.gsx$tweetauthor3.$t
					}
				],
				instagram: [
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" },
					{ url: "https://scontent-arn2-1.cdninstagram.com/t51.2885-15/s640x640/e15/12568968_1717807815104881_1126366706_n.jpg?ig_cache_key=MTE4MDU4OTA1MTY3NDUwNzg4OQ%3D%3D.2" }
				],
				latestFacebookPost: {
					content: e.gsx$facebookpost.$t
				}
			};
			return athlete;

		});
		callback();
	});
}

function getFeedData(callback) {
	$.get(DATA_URL_FEED, (json) => {
		const obj = JSON.parse(json);
		const entries = obj.feed.entry.map(e => {
			const entry = {
				type: e.gsx$type.$t,
				athlete: parseInt(e.gsx$athlete.$t, 10),
				time: e.gsx$time.$t,
				isNew: e.gsx$new.$t === "x",
				breaking: e.gsx$breaking.$t === "x",
				data: {
					content: e.gsx$content.$t,
					event: e.gsx$event.$t
				},
				buttons: {
					dr1: e.gsx$buttondr1.$t === "x",
					p3: e.gsx$buttonp3.$t === "x",
					scribble: e.gsx$buttonscribble.$t === "x",
				}

			};
			return entry;
		});
		data.feed = {
			entries: entries,
			waiting: []
		};
		callback();
	});
}

function getData(callback) {
	getAthleteData(() => {
		getFeedData(() => {
			callback();
		});
	})
}

module.exports = data;
