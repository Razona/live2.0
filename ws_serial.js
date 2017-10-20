var serialPort = require("serialport")
var io = require('socket.io-client')

// send server
socket = io.connect('https://proma3-razona.c9users.io/');
socket.on('connect', function () {
	  console.log("socket connected");
});
  
socket.on('s2c_message', function (data) {
	  console.log("data receive:" + data.value);
	  sp.write(data.value);
});
  var flag = 0;
  var sp = new serialPort.SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 9600,
  dataBits:8,
  parity:'none',
  flowControl:false,
  parser:serialPort.parsers.readline('\n')
});

sp.on('data', function(data) {
	console.log('data received: ' + data);
    socket.emit("c2s_message", { value : data });
});

sp.on("open", function () {
  console.log('open');
});
