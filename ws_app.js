var app        = require('http').createServer(handler)
var io         = require('socket.io');
var fs         = require('fs');
//var serialport = require('serialport');

app.listen(3000, function(){
    console.log(date() + " 接続待ち...");
});

var colortot = 0;
var colorCounter = 0;
var colorAdd = 0;


//var osc       = require('node-osc');
//var oscclient = new osc.Client('172.24.84.28', 7777);


/*
// Serial Port
var portName = '/dev/tty.usbmodemfd13431'; // Mac環境
var sp = new serialport.SerialPort(portName, {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\n")
});


// data from Serial port
sp.on('data', function(input) {

    var buffer = new Buffer(input, 'utf8');
    var jsonData;
    try {
        jsonData = JSON.parse(buffer);
        console.log('temp: ' + jsonData.temp);
        console.log('led: ' + jsonData.led);
    } catch(e) {
        // データ受信がおかしい場合無視する
        return;
    }
    // つながっているクライアント全員に送信
    io.sockets.json.emit('message', { value: jsonData });
});
*/



// 現在の時間
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




function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {

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

		//console.log("color:", data);
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

        //console.log("@@@", 280 + 80 * (colortot/100))
	}, 1000);
});




console.log('Server running at http://54.249.56.252:3000/');


