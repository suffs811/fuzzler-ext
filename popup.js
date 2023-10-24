var button = document.getElementById("button");
var output = document.getElementById("output");
var ip = document.getElementById("ip");

var url = function getUrl() {
	var queryOptions = { active: true, lastFocusedWindow: true };
	const tabs = chrome.tabs.query(queryOptions, (tabs) => {
		console.log(tabs[0].url);
		url = tabs[0].url
		return url;
	});
	return url
}();

function fetchUrl(url){
	return fetch(url).then((response) => {page = response.text(); return page;}).then((page) => {ip.textContent = "Fetched "+url; return page;})
	.then((page) => {

		// crawl webpage //

		var splitPage = page.toString().split(" ");

		var initWords = [];

		for (i of splitPage) {
			if (i.length > 3 && !(i.includes("<")) && !(i.includes(">")) && !(i.includes("}")) && !(i.includes("{")) && !(i.includes("#")) && !(i.includes("=")) && !(i.includes(":")) && !(i.includes(".")) && !(i.includes("'")) && !(i.includes('"')) && !(i.includes(Array(9999).keys())) && i.length < 10) {
				initWords.push(i.trim());
			} else {
				continue;
			}
		}

		fuzz(initWords)
	});
}

function fuzz(initWords) {

	// fuzz wordlist //

	console.log(initWords)

	var newWords = []

	// add 0-99
	for (word of initWords) {

		newWords.push(word)

		for (let i = 0; i < 99; i++) {
			newWords.push(word+i);
			newWords.push(i+word)
		}

		// toggle case and reverse
		newWords.push(word.toLowerCase());
		newWords.push(word.toUpperCase());
		newWords.push(word.split("").reverse().join(""));

		// change to 1337 speak
		var leet = word.toString()
		var leet1 = leet.toLowerCase()
		var leet2 = leet1.replace("/a/g", "4").replace("/e/g", "3").replace("/l/g", "1").replace("/t/g", "7").replace("/o/g", "0");
		newWords.push(leet);

	};

	console.log(newWords);

	var count = 0

	for (word of newWords) {
		output.value += word;
		output.value += "\n";
		count += 1
	}

	ip.style.color = "#e847e8"
	ip.textContent = "Fuzzing Complete | "+count+" words generated";


}

button.addEventListener("click", () => {
	ip.textContent = "Fuzzing "+url+"... This may take a few minutes";
	fetchUrl(url)
});
