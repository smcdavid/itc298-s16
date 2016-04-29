var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var methods = require('./lib/methods.js');
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

app.post("/search", function(req,res){
    res.type("text/html");
    var header = "Searching for: " + req.body.search_term + "<br>";
    var found = events.find(function(item){
        return item.what == req.body.search_term;
    });
    if(found){
        res.send(header + "Event: " + found.what + "<br>Time: " + found.time);
    }else{
        res.send(header + "not found");
    }
});

app.post("/add", function(req,res){
    res.type("text/html");
    var object = {what:req.body.add_event, time:req.body.add_time};
    var header = "Checking for: " + req.body.add_event + "<br>";
    var found = events.find(function(item){
        return item.what == req.body.add_event;
    });
    if(found){
        res.send(header + "Sorry " + found.what + " is already an event, please pick a different event name " + '<a href="https://itc298-s16-smcdavid.c9users.io">Go Back</a>');
    }else{
        res.send(header + " event added " + '<a href="https://itc298-s16-smcdavid.c9users.io">Go Back</a>');
        events.push(object);
    }
});

app.post("/remove", function(req,res){
    res.type("text/html");
    var header = "Checking for: " + req.body.remove_event + "<br>";
    var found = events.find(function(item){
        return item.what == req.body.remove_event;
    });
    if(found){
        res.send(header + "Event " + found.what + " was removed " + '<a href="https://itc298-s16-smcdavid.c9users.io">Go Back</a>');
        for(var i=0; events;i++){
            
            if(match){
            events.splice(i,1)
            }
        }
    }else{
        res.send(header + " there is no event with that name " + '<a href="https://itc298-s16-smcdavid.c9users.io">Go Back</a>');
    }
});

app.post("/change", function(req,res){
    res.type("text/html");
    var header = "Checking for: " + req.body.current_event + "<br>";
    var found = events.find(function(item){
        return item.what == req.body.current_event;
    });
    if(found){
        //code that will change found.time
        
        res.send(header + "Event " + found.what + "'s time was changed to " + found.time + '<a href="https://itc298-s16-smcdavid.c9users.io">Go Back</a>');
    }else{
        res.send(header + " there is no event with that name " + '<a href="https://itc298-s16-smcdavid.c9users.io">Go Back</a>');
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