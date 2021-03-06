var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({extended:true})); //support encoded bodies
app.use('/api', require('cors')());

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers:{
        shortDate: function (date) {
            console.log(date);
            if (typeof date == "string") { date = new Date(date); }
            if (!date) {date = new Date(); }
            var month = (date.getMonth() < 9) ? '0' + (date.getMonth()+1) : date.getMonth()+1;

            var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();

            return date.getFullYear() + "-" + month + "-" + day;

        },
    }
}));
app.set('view engine', 'handlebars');

var routes = require("./lib/routes")(app);

/*
// POST https://itc298-s16-smcdavid.c9users.io/
// parameters sent with 
app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});*/


app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function(){
console.log('the server is running',app.get('port'))
});