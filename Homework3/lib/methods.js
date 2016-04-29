var events = [
    {what:"finish homework",time:"3pm"},
    {what:"study",time:"5pm"},
    {what:"get groceries",time:"7pm"}
    ];
    
exports.getEvent = function(event){
    var success = events.find(function(item){
        return item.what.toLowerCase() == event.toLowerCase()
    });
    return success;
}