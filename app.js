/*Module Dependencies*/

var express = require('express');
//var io = require('socket.io').listen(app);

//var app = module.exports = express.CreateServer();
var app = require('express').createServer()
var io = require('socket.io').listen(app);
var path = require('path');

//database
//var Db = require('mongodb').Db;
//var Server = require('mongodb').Server;
//var client = new Db('test', new Server('127.0.0.1', 27017, {}));

//Mongolian 
var Mongolian = require("mongolian");
var server = new Mongolian;
// Get database
var db = server.db("test")
// Get some collections
var clicks = db.collection("clicks")
// Insert some data
var projectName = "Haircuttery";
var insertPost = function(clickId) {
clicks.insert({
    "Clicked item": clickId,
    "Project Name": projectName,
    "time": new Date
    
});
};


app.listen(8080);

//Configuration
var pub = __dirname + '/public';

app.configure(function() {
    //app.set('views', __dirname + '/views');
    //app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(pub));
    app.use(app.router);
    app.use(express.static(__dirname + '/public')); 
});
    
app.configure('development', function(){
    app.use(express.errorHandler({
        dumpExceptions:true, 
        showStack: true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

//Load the database handler


//routes if needed
app.get('/', function(req,res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/newTest', function(req,res) {
    res.sendfile(__dirname + '/newTest.html');
});




//sockets
//listeners and emitters
io.sockets.on('connection', function(socket) {
    
    socket.on('sendEvent', function(clickId) {
        //update function to the DB occurs here
        insertPost(clickId);
        io.sockets.emit('updatelog', clickId);
       
        

    
    
    });
    
});


