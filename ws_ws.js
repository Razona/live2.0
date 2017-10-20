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




// サーバーをソケットに紐付ける
var io = socketio.listen( server );

// 接続確立後の通信処理部分を定義
io.sockets.on( 'connection', function( socket ) {

	console.log("connection:", socket.client.conn.server.clientsCount)

	socket.on('disconnect', function(data) {
		console.log("connection:", socket.client.conn.server.clientsCount);
	});

	socket.emit('news', { hello: 'world' });

	socket.on('my other event', function (data) {
		console.log(data);
	});

	socket.on('color', function (data) {
		colorCounter++;
		colorAdd += data;

		console.log("color:", data);
		if ( colorCounter => socket.client.conn.server.clientsCount ) {
            console.log("color:", Math.min(100,colorAdd/(socket.client.conn.server.clientsCount-1)));
            console.log("clientsCount:", socket.client.conn.server.clientsCount);
            io.emit('colorChange', { per: Math.min(100,colorAdd/(socket.client.conn.server.clientsCount-1)) });
		}

        
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

