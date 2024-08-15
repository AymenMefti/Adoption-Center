const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'Questions')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Questions', 'Exercise1.html'));
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

app.post('/findSummation', (req, res) => {
    const sum = findSummation(Number(req.body.number));
    res.send(`Sum: ${sum}`);
});

app.post('/uppercaseFirstandLast', (req, res) => {
    const result = uppercaseFirstandLast(req.body.string);
    res.send(`Sentence with capitalized first and last characters: ${result}`);
});

app.post('/findAverageAndMedian', (req, res) => {
    const numArray = req.body.array.split(",").map(Number);
    const avgAndMedian = findAverageAndMedian(numArray);
    res.send(`Average: ${avgAndMedian.average}, Median: ${avgAndMedian.median}`);
});

app.post('/find4Digits', (req, res) => {
    const digits = find4Digits(req.body.stringDigits);
    res.send(`First 4 digits: ${digits}`);
});

function findSummation(N) {
    if (typeof N !== 'number' || N <= 0)
         return false;
    let sum = 0;
    for (let i = 1; i <= N; i++) 
        sum += i;
    return sum;
}

function uppercaseFirstandLast(sentence) {
    let splitSentence = sentence.split(' ');
    for (let i = 0; i < splitSentence.length; i++) {
        if (splitSentence[i].length > 1) 
            splitSentence[i] = splitSentence[i].charAt(0).toUpperCase() + splitSentence[i].slice(1, -1) + splitSentence[i].charAt(splitSentence[i].length - 1).toUpperCase();
        else 
            splitSentence[i] = splitSentence[i].toUpperCase();
        
    }
    return splitSentence.join(" ");
}

function findAverageAndMedian(numArray) {
    
    if (!Array.isArray(numArray)) 
        return false;

    
    let newNumArray = numArray.sort();
    let sum = 0;
    for(let i = 0; i < newNumArray.length; i++)
        sum += newNumArray[i];
    
    let average = sum / newNumArray.length;

    let median;
    let mid = Math.floor(newNumArray.length / 2);
    if (newNumArray.length % 2 === 0) 
        median = (newNumArray[mid - 1] + newNumArray[mid]) / 2;
    else 
        median = newNumArray[mid];
    

    return { average, median };
}


function find4Digits(numStr) {
let numbers = numStr.split(' ');
let fourDigit = false;

for(let i=0; i<numbers.length;i++){
    if(/^\d{4}$/.test(numbers[i])){
        return parseInt(numbers[i]);
    }
}
return fourDigit;
}