/*var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")(http);

app.get("/",function(req, res){
	res.send("<h1>Hello socket</h1>");
});

io.on("connection",function(socket){
	console.log("a user connected");
	
	socket.on("disconnect", function() {
        console.log("a user go out");
    });

    socket.on("message", function(obj) {
        io.emit("message", obj);
    });
	
});




http.listen(3003, function(){
    console.log('listening on *:3003');
});
*/



var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


server.listen(3003, function(){
    console.log('listening on *:3003');
});

app.get('/', function(req, res){
    //res.sendfile(__dirname + '/index.html');
    res.send(__dirname + '/index.html');
});

/*
io.sockets.on('connection', function(socket){
    console.log('a user connected');

    socket.on("disconnect", function() {
        console.log("a user go out");
    });

    socket.on("message", function(obj) {
        io.emit("message", obj);
    });
});*/

//注意这个的index.html要根据app.js指定的位置”res.sendfile(__dirname + ‘/client/index.html’);”

io.sockets.on('connection', function (socket) {
	console.log('a user connected');
	socket.on("disconnect", function() {
        console.log("a user go out");
    });
	
	socket.emit('news', { hello: 'world' });
	socket.on("message", function(obj) {
        socket.emit("message", obj);
    });
});








