module.exports = function (value) {
	// hashtags
	value = value.replace(/#(\S*)/g, "<a target=\"_blank\" class=\"external\" href=\"http://twitter.com/#!/search/$1\">#$1</a>");

	value = value.replace(/@(\S*)/g, "<a target=\"_blank\" class=\"external\" href=\"http://twitter.com/#!/search/$1\">@$1</a>");
	
	return value;
}