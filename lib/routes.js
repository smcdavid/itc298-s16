module.exports = function(app) {
    //var event = require("../lib/methods");
    var EventDB = require('../models/event.js');


//This will render a template you have made
app.get('/', function (req, res) {
    res.type('text/html');
    EventDB.find(function(err, events){
    if (err) return next(err);
    if (!events) return next();
    res.render('home', {events: events} );
    });
});

app.get('/detail/:what', function(req,res){
    res.type('text/html');
    EventDB.findOne({what:req.params.what}, function (err,event) {
    if (err) return next(err);
    
    res.render('detail', {event: event} );
    });
});



app.get('/about', function (req, res) {
    res.type('text/html');
    res.render('about');
});


app.post("/search", function(req,res){
    res.type("text/html");
    EventDB.findOne({what:req.params.what}, function (err,event) {
    if (err) return next(err);
    
    res.render('detail', {event: event} );
    });    
});


app.post("/add", function(req,res){
    res.type("text/html");
    EventDB.findOne({what:req.params.what}, function (err,event) {
        if (err) return next(err);
        if (event.what == req.params.what) { 
            res.render('detail', {event: event} );
        
        }else{
            new EventDB({
                what: req.body.what,
                where: req.body.where,
                time: req.body.time,
                when: req.body.when,
            }).save();
            res.render('detail', {event: event} );   //what do i do with this code? How do I need to change it?
        }
    });
});

/*var newEvent = {"what":req.body.what, "where":req.body.where, "time":req.body.time, "when":req.body.when}
    var result = event.add(newEvent);*/

app.post("/remove", function(req,res){
    res.type("text/html");
    Event.find({ what: req.params.what }, function(err, event) {
        if (err) throw err;

    // delete him
    event.remove(function(err) {
    if (err) throw err;

    console.log('User successfully deleted!');
    
    /*var result = event.remove(req.body.what);
    res.render('detail', {result: result} );*/
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