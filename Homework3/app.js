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
    res.render('home',{ methods: methods.getEvent() });
});

app.get('/about', function (req, res) {
    res.render('about');
});

/*var events = [
    {what:"finish homework",time:"3pm"},
    {what:"study",time:"5pm"},
    {what:"get groceries",time:"7pm"}
    ];*/

app.post("/search", function(req,res){
    res.type("text/html");
    var header = "Searching for: " + req.body.event + "<br>";
    var found = methods.getEvent().find(function(item){
        return item.what == req.body.event;
    });
    if(found){
        res.send(header + "Event: " + found.what + "<br>Time: " + found.time + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }else{
        res.send(header + "not found" + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }
});

app.post("/add", function(req,res){
    res.type("text/html");
    var object = {what:req.body.event, time:req.body.time};
    var header = "Checking for: " + req.body.event + "<br>";
    var found = methods.getEvent().find(function(item){
        return item.what == req.body.event;
    });
    if(found){
        res.send(header + "Sorry " + found.what + " is already an event, please pick a different event name " + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }else{
        res.send(header + " event added " + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
        methods.getEvent().push(object);
    }
});

app.post("/remove", function(req,res){
    res.type("text/html");
    var header = "Checking for: " + req.body.event + "<br>";
    var a = 0;
    var found = methods.getEvent().find(function(item){
        return item.what == req.body.event;
    });
    if(found){
        for(var i in events){
            if(i.what == req.body.event){
            events.splice(a,1);
            } else {
                a++;
            }
        }
        res.send(header + "Event " + found.what + " was removed " + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }else{
        res.send(header + " there is no event with that name " + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }
});

app.post("/change", function(req,res){
    res.type("text/html");
    var header = "Checking for: " + req.body.event + "<br>";
    var a = 0;
    var found = methods.getEvent().find(function(item){
        return item.what == req.body.event;
    });
    if(found){
        //code that will change found.time
        for(var i in events){
            if(i.what == req.body.event){
            events.splice(a,1,req.body.time);
            } else {
                a++;
            }
        }
        res.send(header + "Event " + found.what + "'s time was changed to " + found.time + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
    }else{
        res.send(header + " there is no event with that name " + '<a href="https://itc298-s16-smcdavid.c9users.io"> Go Back</a>');
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