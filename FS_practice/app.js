var fs = require('fs');
var data = fs.readFileSync('words.json')
var words = JSON.parse(data);
console.log(words);

console.log("the server is running");

const express = require('express');
const app = express();

const server = app.listen(3000, listening);

function listening() {
    console.log('listening on port 3000');
}

app.use(express.static('website'));

app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
    var data = request.params;
    var word = data.word;
    var score = Number(data.score);
    if (!score) {
        reply = {
            msg: "Score is required."
        }
        response.send(reply);
    } else {
        words[word] = score;
        var data = JSON.stringify(words, null, 2);
        fs.writeFile('words.json', data, finished);

        function finished(err) {
            console.log('finished')
            reply = {
                word: word,
                score: score,
                status: "success "
            }
            response.send(reply);
        }
    }


}


app.get('/all', sendAll);
function sendAll(request, response){
    response.send(words);
}