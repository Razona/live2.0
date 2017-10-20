var http = require('http');
var socketio = require( 'socket.io' ); // Socket.IOモジュール読み込み
var fs = require( 'fs' ); // ファイル入出力モジュール読み込み
//Lets define a port we want to listen to
var port = process.env.PORT || 1337;
var ip = "0.0.0.0";


// 3000番ポートでHTTPサーバーを立てる
var server = http.createServer( function( req, res ) {
    res.writeHead(200, { 'Content-Type' : 'text/html' }); // ヘッダ出力
    res.end( fs.readFileSync('./index.html', 'utf-8') );  // index.htmlの内容を出力
}).listen(port);

var colortot = 0;
var colorCounter = 0;
var colorAdd = 0;
var tot =0;

var io = socketio.listen( server );


var params = {screen_name: 'hayato_razona'};

var date = function(){
    myD = new Date();
    myYear = myD.getFullYear();
    myMonth = myD.getMonth() + 1;
    myDate = myD.getDate();
    myHours = myD.getHours();
    myMinutes = myD.getMinutes();
    mySeconds = myD.getSeconds();
    return myYear + "/" + myMonth + "/" + myDate + " " + myHours + ":" + myMinutes + ":" + mySeconds + " ";
};

io.sockets.on('connection',function(socket){
    socket.on('emit_from_client',function(data){
        console.log(data);
       socket.client_name = data.name; 
        io.sockets.emit('emit_from_server', '[' + data.shakeSum + '] : ' +data.saveShakeY);
        console.log('[' + data.shakeSum + '] : ' +data.saveShakeY);
        //io.sockets.emit('emit_from_server', '[' + socket.client_name + '] : ' + data.msg+data.s_value);
         socket.on('emit_from_client',function(data){
        console.log(data);
       socket.client_name = data.name; 
        io.sockets.emit('emit_from_server', '[' + socket.client_name + '] : ' +data.s_value);
        //io.sockets.emit('emit_from_server', '[' + socket.client_name + '] : ' + data.msg+data.s_value);
    });
    });
/*    socket.on('disconnect', function(data) {
		console.log("connection:", socket.client.connect.server.clientsCount);
	});
*/
	socket.on('my other event', function (data) {
		//console.log("data");
	});
		socket.on('color', function (data) {
		colorCounter++;
		colorAdd += data;

		console.log("color:", data);
		io.sockets.emit('emit_from_server', data);
	/*	if ( colorCounter => socket.client.connect.server.clientsCount ) {
           console.log("color:", Math.min(100,colorAdd/(socket.client.connect.server.clientsCount-1)));
           console.log("clientsCount:", socket.client.connect.server.clientsCount);
            io.emit('colorChange', { per: Math.min(100,colorAdd/(socket.client.connect.server.clientsCount-1)) });
		};
*/
        
	});

	setInterval(function() {
        colorCounter = 0;
        colorAdd = 0;

		colortot += 5;
		colortot %= 100;
		socket.emit('colortot', { color: 280 + 80 * (colortot/100) });

       console.log("@@@", 280 + 80 * (colortot/100))
	}, 1000);
});
