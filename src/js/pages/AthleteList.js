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
			nameGroups[letter].push(a);
		});
		let athleteGroups = Object.keys(nameGroups).map(x => ({
			letter: x.toUpperCase(),
			athletes: nameGroups[x]
		}));


		const listTemplate = require("../../hbs/partials/athleteList.hbs");
		$(".list-container", this._container).html(
			listTemplate(athleteGroups)
		);

	}
}

module.exports = AthleteList;