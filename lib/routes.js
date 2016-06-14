module.exports = function(app) {
    var EventDB = require('../models/event.js');
    var path = require('path');
    
app.get('/angular', function (req, res) {
    res.type("text/html");
    res.sendfile("./public/angular-old.html");
});

//This will render a template you have made
app.get('/old', function (req, res) {
    EventDB.find(function(err, events){
        if (err) return next(err);
        if (!events) return next();
        res.type('text/html');
        res.render('home', {events: events} );
    });
});

app.get('/', function(req,res){
        res.type('text/html');
        res.sendFile(path.join(__dirname, '../public', 'angular.html'));
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
    EventDB.findByIdAndUpdate({_id:req.body.id}, newEvent, function(err, result) {
            if (err) {
                new event(newEvent).save(function(err){
                action = "Added";
                 res.render('detail', {event: newEvent, result: "Added"} );            
                });
            } else {
             res.render('detail', {event: newEvent, result: "Updated"} ); 
}
    });
});


app.post("/remove", function(req,res){
    EventDB.remove({"_id":req.body.id }, function(err) {
            var action = (err) ? err : "Deleted";
            res.type('text/html');
            res.render('detail', {event: {}, result: action} );            
        });
    });

app.get('/api/events', function(req,res) {
        EventDB.find(function (err,events){
        if (err) return next(err);
            if (events) {
                res.json(events);    
            } else {
                res.status(404).send("404 - not found");    
            }
        });
    });

    app.get('/api/detail/:what', function(req,res) {
        EventDB.findOne({"what":req.params.what},function(err,found){
            if (found) {
                res.json(found);    
            } else {
                res.status(404).send("404 - not found");    
            }
        });
    });
    app.post('/api/add', function(req,res) {
        console.log(req.body);
        var newEvent = {"what":req.body.what, "where":req.body.where, "time":req.body.time, "when":req.body.when };
        EventDB.findByIdAndUpdate({_id:req.body._id}, newEvent, function(err, result) {
            if (err) {
                new EventDB(newEvent).save(function(err){
                res.json({"result":"saved"});    
                });
            } else {
                res.json({"result":"saved"});    
            }
        });
    });
    app.post('/api/remove', function(req,res) {
        EventDB.remove({"_id":req.body._id }, function(err) {
            if (err) {
                res.json({"result":err});
            } else {
                res.json({"result":"removed"});
            }
        });
    });

    
}