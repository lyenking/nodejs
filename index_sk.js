var http = require('http');
var io = require('socket.io');
var fs = require('fs');

//console.log(io)

var server = http.createServer();
server.on("request",function(request, response){
	response.writeHead(200, {'content-type': 'text/html'});  
  	response.end("dsvdsfvfdv");  
});

server.listen(8085);

var socket = io.listen(server);

// Socket.io 真正的连接事件  
socket.on('connection', function(client){  
  console.log('Client connected');  
  client.send('67676y787878 client'); // 向客户端发送文本  
});  
