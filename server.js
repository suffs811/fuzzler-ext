var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);



// just found this, nltk for node.js

const natural = require('natural');

const word = 'dog';

const synonyms = natural.lookupSynonyms(word);

console.log(synonyms);