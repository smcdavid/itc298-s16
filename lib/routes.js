module.exports = function(app) {
    var EventDB = require('../models/event.js');

app.get('/angular', function (req, res) {
    res.type("text/html");
    res.sendfile("./public/angular.html");
});

//This will render a template you have made
app.get('/', function (req, res) {
    EventDB.find(function(err, events){
        if (err) return next(err);
        if (!events) return next();
        res.type('text/html');
        res.render('home', {events: events} );
    });
});

app.get('/detail/:what', function(req,res){
    var what = req.params.what;
    EventDB.findOne({what:what}, function (err,foundEvent) {
        if (err) return next(err);
        if (!foundEvent) {
                foundEvent = {what: what};
        }
        res.type('text/html');
        res.render('detail', {event: foundEvent} );
    });
});



app.get('/about', function (req, res) {
    res.type('text/html');
    res.render('about');
});


app.post("/search", function(req,res){
    var what = req.body.what;
    EventDB.findOne({'what':what}, function (err,foundEvent) {
    if (err) return next(err);
    if (!foundEvent) {
                foundEvent = {'what': what, 'when': new Date() };
            }
    res.type("text/html");
    res.render('detail', {event: foundEvent} );
    });    
});


app.post("/add", function(req,res){
    var newEvent = {"what":req.body.what, "where":req.body.where, "time":req.body.time, "when":req.body.when}
    console.log(req.body.when);
    var eventId = (req.body.id) ? req.body.id : "";
    EventDB.update({"id":eventId}, newEvent, {upsert:true}, function(err,numberAffected) {
        console.log(newEvent.when);  
        var action = (numberAffected) ? "updated" : "added";
        res.type("text/html");
        res.render('detail', {event: newEvent, result: {'action':action}});
    });
});


app.post("/remove", function(req,res){
    console.log(req.body.id);
    res.type("text/html");
    EventDB.remove({"id":req.body.id }, function(err) {
        console.log(err);
            var action = (err) ? err : "deleted";
            res.type('text/html');
            res.render('detail', {result: action} );            
        });
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