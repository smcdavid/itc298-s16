var events = [
    {what:"finish homework", time:"3pm"},
    {what:"study", time:"5pm"},
    {what:"get groceries", time:"7pm"}
    ];
    
exports.findEvent = function(what) {
    return events.filter(function(item) {
       return item.what === what;
    });
}

exports.add = function(newEvent){
    var found = false;
    events.forEach(function(item,index){
        if(item.what == newEvent.what){
            events[index] = newEvent;
            found = true;
        }
    });
    if(!found){
        events.push(newEvent);
    }
    return {"added":!found, "total":events.length};
}

exports.remove = function(what) {
    var removed = false;
    console.log(what)
    events.forEach(function(item,index){
        if (item.what == what) {
            console.log(item)
            events.splice(index, 1);
            removed = true;
        }        
    });
    return { "removed": removed, "total": events.length };
}

exports.getAll = function() {
        return events;
}