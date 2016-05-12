var events = [
    {what:"finish homework", where:"home", time:"3pm", when:"5/8/2016"},
    {what:"study", where:"home", time:"5pm", when:"5/9/2016"},
    {what:"get groceries", where:"store", time:"7pm", when:"5/7/2016"}
    ];
    
exports.findEvent = function(what) {
    return events.find(function(item) {
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
    var action = (found) ? "updated" : "added";
    return {"action": action, "total": events.length };
}

exports.remove = function(what) {
    var result = '';
    console.log(what)
    events.forEach(function(item,index){
        if (item.what == what) {
            console.log(item)
            events.splice(index, 1);
            result = "action";
        }        
    });
    return { "action": result, "total": events.length };
}

exports.getAll = function() {
        return events;
}