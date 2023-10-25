// grab elements
var button = document.getElementById("button");
var output = document.getElementById("output");
var ip = document.getElementById("ip");

// get url of window's current tab
var url = function getUrl() {
	var queryOptions = { active: true, lastFocusedWindow: true };
	const tabs = chrome.tabs.query(queryOptions, (tabs) => {
		console.log(tabs[0].url);
		url = tabs[0].url
		return url;
	});
	return url
}();

// fetch the current web page and store words between 3 and 10 chars
function fetchUrl(url){
	return fetch(url).then((response) => {page = response.text(); return page;}).then((page) => {ip.textContent = "Fetched "+url; return page;})
	.then((page) => {

		// crawl webpage //

		var splitPage = page.toString().split(" ");

		var initWords = [];

		// only store english words between 3 and 10 chars
		for (i of splitPage) {
			if (i.length > 3 && !(i == "") && !(i.includes("<")) && !(i.includes(">")) && !(i.includes("}")) && !(i.includes("{")) && !(i.includes("#")) && !(i.includes("=")) && !(i.includes(":")) && !(i.includes(".")) && !(i.includes("'")) && !(i.includes('"')) && !(i.includes(Array(9999).keys())) && i.length < 10) {
				initWords.push(i.trim());
			} else {
				continue;
			}
		}

		// call fuzz function with list of words
		fuzz(initWords)
	});
}

// fuzz wordlist (append/prepend 0-99, uppercase, lowercase, reversed, 1337 speak)
function fuzz(initWords) {

	// fuzz wordlist //
	console.log(initWords)

	initWordsSet = new Set(initWords)

	var newWords = []

	// add 0-99
	for (word of initWordsSet) {

		newWords.push(word)

		for (let i = 0; i < 100; i++) {
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
		newWords.push(leet2);

	};

	console.log(newWords);

	// count # of words
	var count = 0;

	output.value = "";

	var newWordsSet = new Set(newWords);

	console.log(newWordsSet)

	var finalWords = "";

	for (word of newWordsSet) {
		if (!(word == "")) {
			finalWords += word+"\n";
			count += 1;
		} else {
			continue;
		}
	}

	console.log(finalWords)

	output.value = finalWords;

	ip.style.color = "#e847e8";
	ip.textContent = "Fuzzing Complete | "+count+" words generated";


}

// create button to call fetchUrl and start the fuzzing process
button.addEventListener("click", () => {
	ip.textContent = "Fuzzing "+url;
	output.value = "This may take a few minutes...";
	fetchUrl(url)
});
