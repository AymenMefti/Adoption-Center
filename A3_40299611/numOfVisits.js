const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'Questions')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Questions', 'Exercise2.html'));
    let dateNvisits = dateAndNumber(req,res)
    if(dateNvisits.visitsNprint.visits>1){
        res.send(`<p><i>${dateNvisits.visitsNprint.toPrint}<i><br><b><i>${dateNvisits.date}</i></b></p>`)
    }  else{
        res.send(`<p><i>${dateNvisits.visitsNprint.toPrint}</i></p>`)
    }
});


function dateAndNumber(req,res){
    let visitsNprint = nbVisits(req,res);
    let date = dateVisit(req,res);
    return {visitsNprint,date};
}

function nbVisits(req,res){
    let visits;
    if(req.cookies.visits){
        visits = parseInt(req.cookies.visits)
    } else{
        visits=0;
    }
    visits+=1;

res.cookie('visits',visits);

if(visits===1){
    let toPrint ="Welcome to my webpage! It is your first time that you are here";
return {toPrint,visits};
}else{
    toPrint = "Hello, this is the "+ visits +" time that you are visiting my webpage.";
    return {toPrint,visits};
}

}

function dateVisit(req,res){
    let lastVisit;
    if(req.cookies.lastVisit){
        lastVisit = new Date(req.cookies.lastVisit);
        res.cookie('lastVisit', new Date().toString());
        return "Last time you visited my page on:" + lastVisit.toString();
    }else{
        lastVisit = null;
        res.cookie('lastVisit', new Date().toString());
        return "";
    }
}

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});