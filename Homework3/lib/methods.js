var events = [
    {what:"finish homework",time:"3pm"},
    {what:"study",time:"5pm"},
    {what:"get groceries",time:"7pm"}
    ];
    
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