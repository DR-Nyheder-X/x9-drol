/* global Dom7 */

const data = require("../data.js");
const Page = require("./Page.js");
const $ = Dom7;

class AthleteList extends Page {

	load(container, query) {

		const nameGroups = {};
		let sortedAthletes = data.athletes.slice().sort((a, b) => {
			let namePartsA = a.name.split(" ");
			let lastNameA = namePartsA[namePartsA.length - 1].toLowerCase();

			let namePartsB = b.name.split(" ");
			let lastNameB = namePartsB[namePartsB.length - 1].toLowerCase();
			return lastNameA.charCodeAt(0) - lastNameB.charCodeAt(0);
		});

		sortedAthletes.forEach(a => {
			let nameParts = a.name.split(" ");
			let lastName = nameParts[nameParts.length - 1];
			let letter = lastName.substr(0, 1).toLowerCase();
			if (!(letter in nameGroups)) {
				nameGroups[letter] = [];
			}
			nameGroups[letter].push({
				name: a.name,
				id: a.id,
				following: !!data.user.following[a.id]
			});
		});
		let athleteGroups = Object.keys(nameGroups).map(x => ({
			letter: x.toUpperCase(),
			athletes: nameGroups[x]
		}));

		const listTemplate = require("../../hbs/partials/athleteList.hbs");
		$(".list-container", this._container).html(
			listTemplate(athleteGroups)
		);

		$(".toggle-button", this._container).on("click", (e) => {
			const id = e.target.getAttribute("data-athlete");
			data.user.following[id] = !data.user.following[id];
			if (data.user.following[id]) {
				$(e.target).removeClass("toggle-button--no").addClass("toggle-button--yes");
			} else {
				$(e.target).removeClass("toggle-button--yes").addClass("toggle-button--no");
			}
		});
	}
}

module.exports = AthleteList;