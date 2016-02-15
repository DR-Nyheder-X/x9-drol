module.exports = function (value) {
	if (value.length > 20) {
		value = value.substr(0, 17) + "...";
	}
	return value;
}