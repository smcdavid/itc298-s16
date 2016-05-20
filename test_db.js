var Event = require('./models/event.js');

new Event({
        what: "finish homework",
        where: "home",
        time: "3pm",
        when: "5/8/2016",
    }).save();
    
    new Event({
        what: "study",
        where: "home",
        time: "5pm",
        when: "5/9/2016",
    }).save();
    
    new Event({
        what: "get groceries",
        where: "store",
        time: "7pm",
        when: "5/7/2016",
    }).save();

Event.find(function(err, events){
    if(err) console.error(err);
    console.log(events);
});