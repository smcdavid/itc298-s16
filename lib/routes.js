module.exports = function(app) {
    var event = require("../lib/methods");

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
        found = {what: req.params.what};
    }
    res.render('detail', {event: found} );    
});

app.get('/about', function (req, res) {
    res.render('about');
});


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

app.get('/api/events', function(req,res) {
        var events = event.getAll();
        if (events) {
            res.json(events);    
        } else {
            res.status(404).send("404 - not found");    
        }
    });

    app.get('/api/detail/:what', function(req,res) {
        var found = event.findEvent(req.params.what);
        if (found) {
            res.json(found);    
        } else {
            res.status(404).send("404 - not found");    
        }
    });
    
}