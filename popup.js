var button = document.getElementById("button");
var output = document.getElementById("output");
var ip = document.getElementById("ip");

var url = function getUrl() {
	var queryOptions = { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT };
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

		console.log("PAGE: "+page);


		ip.textContent = "Fuzzing "+url;

		// crawl webpage
		console.log("page: "+page)

		var splitPage = page.toString().split(" ");
		var initWords = [];

		for (i of splitPage.toString()) {
			if (i.length > 3 && !("<" in i) && i.length < 10) {
				initWords.push(i);
			}
		}
		console.log("WORDS: "+initWords)
		fuzz(initWords)
	});
}

button.addEventListener("click", () => {
	fetchUrl(url)
});

function fuzz(url, initWords) {

	// extend with nlp
	const natural = require('natural');

	for (word of initWords) {
		const synonyms = natural.lookupSynonyms(word);
		console.log(synonyms);
		initWords.push(synonyms);
	}


	// fuzz wordlist

	// add 0-99
	for (word of initWords) {
		for (let i = 0; i < 99; i++) {
			initWords.push(word+i);
		}
	}

	// toggle case and reverse
	for (word of initWords) {
		initWords.push(word.toLowerCase());
		initWords.push(word.toUpperCase());
		initWords.push(word.toggleCase());
		initWords.push(word.split("").reverse().join(""));
	}

	// change to 1337 speak
	for (word of initWords) {
		let leet = word.lower().split("").replace("a", "4").replace("e", "3").replace("l", "1").replace("t", "7").replace("o", "0").join("");
		initWords.push(leet1);
	}

	// open wordlist in new page
	var newButton = document.createElement("button");
	newButton.textContent = "Show Wordlist";
	newButton.setAttribute("target", "_blank");
	document.appendChild(newButton);

	newButton.addEventListener("click", (initWords) => {
		window.open()
		window.textContent = initWords
	});
}
