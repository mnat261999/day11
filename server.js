var express = require('express');
var app     = express();
var PORT = 2998;
var mongoose    =   require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/erm');
mongoose.connection.once('open', ()=>console.log('Connected to DB!'));
var Employer = require('./Employer');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('static'));


app.post('/api/employers', function(req, res){
    console.log('Received request to create new Employer');
    console.log(req.body);
    if(!req.body || !req.body.name) return res.status(400).send('You need to at least send a name');
    let employerInstance = new Employer(req.body );
    employerInstance.save()
    .catch(err =>{
        console.log(err.toString());
        res.status(500).send(err.toString());
    })
    .then(dbres=> {
        console.log(dbres);
        res.json(dbres);
    })
});

app.get('/api/employers', function(req, res){
    Employer.find()
    .catch(err =>{
        console.log(err.toString());
        res.status(500).send(err.toString());
    })
    .then(dbres=> {
        console.log(dbres);
        res.json(dbres);
    });
});

app.listen(PORT, function(){
    console.log('Server listening on port ' + PORT);
})