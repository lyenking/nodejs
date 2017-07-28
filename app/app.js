var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
 
var server = http.createServer(function(req, res) {
	/**
		重点在这
	*/
	// 服务器发送 index.html 并侦听所有 WebSockets 请求
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
    
}).listen(8088, function() {
    console.log('Listening at: http://localhost:8088');
});
 
socketio.listen(server).on('connection', function (socket) {
	
	/*
		socket.emit('action');表示发送了一个action命令，命令是字符串的，在另一端接收时，可以这么写： socket.on('action',function(){...});
		socket.emit('action',data);表示发送了一个action命令，还有data数据，在另一端接收时，可以这么写： socket.on('action',function(data){...});
		socket.emit(action,arg1,arg2); 表示发送了一个action命令，还有两个数据，在另一端接收时，可以这么写： socket.on('action',function(arg1,arg2){...});
		
		在emit方法中包含回调函数，例如：
		socket.emit('action',data, function(arg1,arg2){...} );那么这里面有一个回调函数可以在另一端调用，另一端可以这么写：
		socket.on('action',function(data,fn){   fn('a','b') ;  });
	*/
	
	socket.emit('message',{text:'你上线了'}); // 单个用户发送
	socket.emit('mytest',{text:'okokokoo'}); // 单个用户发送
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);  // 向所有在线用户发送
    });
    
    // my test
    socket.on("mytest",function(res){
    	socket.emit('data',{test:"ok"});
    });
});