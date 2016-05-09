var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var event = require('../lib/methods');
var app = express();


app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({extended:true})); //support encoded bodies

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* If you want to use a page from a specific folder

app.get('/', function (req, res) {
    res.type("text/html");
    res.sendfile("./public/home.html");
});
*/

/* If you want to send back something when the user types in a specific URL

app.get('/about', function (req,res){
    res.type("text/html");
    res.send("About page");
}
*/

//This will render a template you have made
app.get('/', function (req, res) {
    res.render('home', {events: event.getAll()} );
});

app.get('/detail/:what', function(req,res){
    res.type('text/html');
    var found = event.findEvent(req.params.what);
    if (!found) {
        // note - new lead has no ID yet
        found = {what: req.params.what};
    }
    res.render('detail', {event: found} );    
});

app.get('/about', function (req, res) {
    res.render('about');
});

/*app.get('/detail', function(req,res){
    res.render('detail');
});*/


app.post("/search", function(req,res){
    res.type("text/html");
    var header = "Searching for: " + req.body.what + "<br>";
    var found = event.findEvent(req.body.what);
    if (!found) {
        found = {what: req.body.what};
    }
    res.render('detail', {event: found} );    
});

app.post("/add", function(req,res){
    res.type("text/html");
   var newEvent = {"what":req.body.what, "where":req.body.where, "time":req.body.time, "when":req.body.when}
    var result = event.add(newEvent);
    res.render('detail', {event: newEvent, result: result} );    
});

app.post("/remove", function(req,res){
    res.type("text/html");
    var result = event.remove(req.body.what);
    res.render('detail', {result: result} );
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