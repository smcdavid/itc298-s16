var EventDB = require('./models/event.js');

    new EventDB({
        id:0,
        what: "finish homework",
        where: "home",
        time: "3pm",
        when: "5/8/2016",
    }).save();
    
    new EventDB({
        id:2,
        what: "study",
        where: "home",
        time: "5pm",
        when: "5/9/2016",
    }).save();
    
    new EventDB({
        id:3,
        what: "get groceries",
        where: "store",
        time: "7pm",
        when: "5/7/2016",
    }).save();

EventDB.find(function(err, events){
    if(err) console.error(err);
    console.log(events);
});