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
    res.render('home');
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
    if(found){
        res.send(header + "Event found" + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }else{
        res.send(header + "not found" + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }
});

app.post("/add", function(req,res){
    res.type("text/html");
    var object = {"what":req.body.what, "time":req.body.time};
    var found = event.add(req.body.what);
    if(found.added){
        res.send("Event added " + req.body.what + "<br>New event total: " + found.length + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }else{
        
        res.send("Updated " + req.body.what + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }
});

app.post("/remove", function(req,res){
    res.type("text/html");
    var found = event.remove(req.body.what);
    if(found.removed){
        res.send("Removed " + req.body.what + " was removed " + "<br> New event total: " + found.total + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }else{
        res.send("there is no event with that name " + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
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