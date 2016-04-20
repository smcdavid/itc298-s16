var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({extended:true})); //support encoded bodies

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

var events = [
    {what:"finish homework"},
    {what:"study"},
    {what:"get groceries"}
    ];
    
app.post("/search", function(req,res){
    res.type("text/html");
    var header = "Searching for: " + req.body.search_term + "<br>";
    var found = events.find(function(item){
        return item.what == req.body.search_term;
    });
    if(found){
        res.send(header + "Event: " + found.what);
    }else{
        res.send(header + "not found");
    }
    
});

// POST https://itc298-s16-smcdavid.c9users.io/
// parameters sent with 
app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
console.log('the server is running',app.get('port'))
});