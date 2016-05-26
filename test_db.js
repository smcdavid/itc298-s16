var EventDB = require('./models/event.js');

    new EventDB({
        what: "finish homework",
        where: "home",
        time: "3pm",
        when: "5/8/2016",
    }).save();
    
    new EventDB({
        what: "study",
        where: "home",
        time: "5pm",
        when: "5/9/2016",
    }).save();
    
    new EventDB({
        what: "get groceries",
        where: "store",
        time: "7pm",
        when: "5/7/2016",
    }).save();

EventDB.find(function(err, events){
    if(err) console.error(err);
    console.log(events);
});