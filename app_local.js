// https://stackoverflow.com/questions/8837236/how-to-connect-two-node-js-servers-with-websockets
'use strict';



var osc       = require('node-osc');
//var oscclient = new osc.Client('127.0.0.1', 7777);
var oscclient = new osc.Client('172.20.10.6', 7777);



var headTotal = 0;
var prevX = 0;
var prevY = 0;
var prevZ = 0;

const SerialPort = require('serialport');
/*const port = new SerialPort('/dev/tty.usbserial-MW1A5M9Z', {
	parser: SerialPort.parsers.readline('\n'),
	baudrate: 115200
});
port.on('open', function () {
	console.log('Serial open.');
	setInterval(write, 1000, 'OK\n');
});

port.on('data', function (data) {
	//console.log('Data: ' + data);

	var xpos = data.indexOf(":x=");
	if ( xpos != -1 ) {
		var tmpX = Number( data.substr(xpos+3,4) );

		headTotal += Math.abs(prevX-tmpX);

		//console.log("x: ", Math.abs(prevX-tmpX));

		prevX = tmpX;
	}
	
	var ypos = data.indexOf(":x=");
	if ( ypos != -1 ) {
		var tmpY = Number( data.substr(ypos+3,4) );

		headTotal += Math.abs(prevY-tmpY);

		//console.log("y: ", Math.abs(prevY-tmpY));

		prevY = tmpY;
	}
	
	var zpos = data.indexOf(":z=");
	if ( zpos != -1 ) {
		var tmpZ = Number( data.substr(zpos+3,4) );

		headTotal += Math.abs(prevZ-tmpZ);

		//console.log("z: ", Math.abs(prevZ-tmpZ));

		prevZ = tmpZ;
	}



	var headPercent = Math.min( 100, headTotal/10 );
	oscclient.send('/action/head', headPercent);
	console.log("tot: ", headPercent);

	headTotal *= 0.2;
	*/　//この行は一時的に削除。多分戻す。 by razona



/*
	Data: ::rc=80000000:lq=159:ct=00B5:ed=810F19DD:id=0:ba=3030:a1=1394:a2=0716:x=0028:y=-036:z=-1024:x=0032:y=-040;z=-1020:x=0040:y=-044;z=-1024:x=0044:y=-040;z=-1024:x=0040:y=-032;z=-1024:x=0040:y=-016;z=-1024:x=0028:y=-008;z=-1024:x=0028:y=-012;z=-1024:x=0024:y=-012;z=-1024:x=0020:y=-024;z=-1028
	Data: ::rc=80000000:lq=147:ct=080C:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0692:x=0004:y=0020:z=-1084:x=0004:y=0012;z=-1084:x=0008:y=0020;z=-1080:x=0004:y=0040;z=-1088:x=0000:y=0048;z=-1080:x=-004:y=0052;z=-1084:x=0000:y=0044;z=-1084:x=-008:y=0040;z=-1080:x=-004:y=0028;z=-1084:x=-004:y=0036;z=-1076
	Data: ::rc=80000000:lq=141:ct=01A8:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0012:y=-024:z=-1072:x=0008:y=-016;z=-1064:x=0004:y=-004;z=-1068:x=0000:y=0000;z=-1072:x=-004:y=0000;z=-1060:x=0000:y=0000;z=-1064:x=0000:y=-012;z=-1068:x=-004:y=-004;z=-1068:x=0000:y=-008;z=-1068:x=0000:y=-004;z=-1076
	Data: ::rc=80000000:lq=159:ct=00B6:ed=810F19DD:id=0:ba=3030:a1=1391:a2=0718:x=0020:y=-024:z=-1024:x=0024:y=-032;z=-1024:x=0024:y=-028;z=-1028:x=0028:y=-024;z=-1028:x=0032:y=-024;z=-1024:x=0032:y=-024;z=-1020:x=0032:y=-028;z=-1024:x=0036:y=-036;z=-1020:x=0028:y=-024;z=-1024:x=0040:y=-036;z=-1024
	Data: ::rc=80000000:lq=147:ct=080D:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0689:x=-008:y=0036:z=-1080:x=-004:y=0028;z=-1076:x=0000:y=0036;z=-1080:x=0000:y=0032;z=-1084:x=0000:y=0028;z=-1084:x=0004:y=0024;z=-1080:x=0000:y=0028;z=-1084:x=0004:y=0028;z=-1084:x=0004:y=0024;z=-1080:x=0000:y=0016;z=-1076
	Data: ::rc=80000000:lq=141:ct=01A9:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0000:y=-008:z=-1068:x=0004:y=-012;z=-1064:x=0004:y=-012;z=-1064:x=0004:y=-012;z=-1068:x=0004:y=-020;z=-1068:x=0004:y=-012;z=-1068:x=0004:y=-024;z=-1060:x=0004:y=-032;z=-1068:x=0004:y=-028;z=-1072:x=0008:y=-036;z=-1068
	Data: ::rc=80000000:lq=159:ct=00B7:ed=810F19DD:id=0:ba=3030:a1=1394:a2=0716:x=0040:y=-032:z=-1024:x=0036:y=-048;z=-1020:x=0036:y=-048;z=-1028:x=0040:y=-044;z=-1024:x=0036:y=-036;z=-1020:x=0040:y=-032;z=-1028:x=0036:y=-024;z=-1024:x=0028:y=-012;z=-1024:x=0024:y=-004;z=-1024:x=0020:y=0000;z=-1028
	Data: ::rc=80000000:lq=147:ct=080E:ed=810F1CEC:id=0:ba=3080:a1=1386:a2=0692:x=0004:y=0012:z=-1084:x=0004:y=0012;z=-1084:x=0004:y=0020;z=-1076:x=0004:y=0028;z=-1080:x=0000:y=0028;z=-1084:x=-004:y=0040;z=-1084:x=-004:y=0048;z=-1084:x=-004:y=0052;z=-1088:x=-008:y=0052;z=-1080:x=-008:y=0052;z=-1080
	Data: ::rc=80000000:lq=141:ct=01AA:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0008:y=-028:z=-1060:x=0004:y=-012;z=-1060:x=0004:y=-008;z=-1064:x=0000:y=0000;z=-1064:x=0000:y=0000;z=-1068:x=-004:y=0004;z=-1068:x=-004:y=0000;z=-1068:x=0000:y=-004;z=-1064:x=-004:y=-004;z=-1068:x=0000:y=-008;z=-1072
	Data: ::rc=80000000:lq=159:ct=00B8:ed=810F19DD:id=0:ba=3030:a1=1391:a2=0718:x=0016:y=-004:z=-1024:x=0016:y=-016;z=-1024:x=0016:y=-020;z=-1028:x=0024:y=-024;z=-1028:x=0028:y=-028;z=-1024:x=0028:y=-028;z=-1024:x=0036:y=-028;z=-1024:x=0044:y=-032;z=-1020:x=0040:y=-028;z=-1028:x=0036:y=-028;z=-1024
	Data: ::rc=80000000:lq=147:ct=080F:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0692:x=-008:y=0044:z=-1084:x=-004:y=0032;z=-1084:x=0000:y=0028;z=-1080:x=0000:y=0020;z=-1080:x=0004:y=0028;z=-1084:x=0004:y=0036;z=-1088:x=0004:y=0032;z=-1084:x=0000:y=0032;z=-1080:x=0000:y=0024;z=-1080:x=0000:y=0012;z=-1080
	Data: ::rc=80000000:lq=141:ct=01AB:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0000:y=-012:z=-1064:x=0004:y=-020;z=-1068:x=0008:y=-012;z=-1072:x=0008:y=-008;z=-1072:x=0008:y=-012;z=-1068:x=0004:y=-012;z=-1072:x=0004:y=-024;z=-1072:x=0000:y=-028;z=-1068:x=0004:y=-032;z=-1064:x=0008:y=-036;z=-1068
	Data: ::rc=80000000:lq=159:ct=00B9:ed=810F19DD:id=0:ba=3030:a1=1391:a2=0716:x=0032:y=-036:z=-1024:x=0028:y=-048;z=-1024:x=0028:y=-048;z=-1024:x=0032:y=-048;z=-1028:x=0040:y=-052;z=-1032:x=0040:y=-044;z=-1024:x=0044:y=-036;z=-1024:x=0040:y=-024;z=-1028:x=0040:y=-020;z=-1028:x=0032:y=-016;z=-1028
	Write: OK

	Data: ::rc=80000000:lq=147:ct=0810:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0689:x=0000:y=0012:z=-1080:x=-004:y=0012;z=-1088:x=0004:y=0008;z=-1084:x=0004:y=0020;z=-1084:x=0004:y=0028;z=-1080:x=0004:y=0028;z=-1088:x=0004:y=0036;z=-1080:x=0000:y=0040;z=-1076:x=0000:y=0036;z=-1084:x=-004:y=0044;z=-1080
	Data: ::ts=999
	Data: ::rc=80000000:lq=141:ct=01AC:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0008:y=-032:z=-1068:x=0008:y=-024;z=-1064:x=0008:y=-012;z=-1068:x=0008:y=-004;z=-1072:x=0004:y=0000;z=-1068:x=0000:y=0000;z=-1064:x=0000:y=0000;z=-1072:x=0000:y=0000;z=-1064:x=-004:y=0000;z=-1068:x=-004:y=-008;z=-1072
	Data: ::rc=80000000:lq=159:ct=00BA:ed=810F19DD:id=0:ba=3030:a1=1391:a2=0716:x=0028:y=-016:z=-1024:x=0024:y=-020;z=-1028:x=0020:y=-012;z=-1020:x=0016:y=-016;z=-1020:x=0016:y=-024;z=-1024:x=0024:y=-024;z=-1024:x=0028:y=-024;z=-1024:x=0028:y=-016;z=-1028:x=0036:y=-024;z=-1024:x=0040:y=-028;z=-1024
	Data: ::rc=80000000:lq=147:ct=0811:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0692:x=-004:y=0040:z=-1088:x=-004:y=0036;z=-1080:x=-008:y=0040;z=-1076:x=-008:y=0036;z=-1076:x=0000:y=0036;z=-1080:x=0000:y=0036;z=-1080:x=0000:y=0036;z=-1084:x=0004:y=0028;z=-1084:x=0000:y=0024;z=-1084:x=0004:y=0020;z=-1084
	Data: ::rc=80000000:lq=141:ct=01AD:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=-004:y=-004:z=-1072:x=-004:y=-012;z=-1064:x=0008:y=-008;z=-1068:x=0008:y=-012;z=-1068:x=0008:y=-016;z=-1064:x=0008:y=-016;z=-1072:x=0004:y=-020;z=-1072:x=0004:y=-028;z=-1064:x=0004:y=-032;z=-1068:x=0004:y=-028;z=-1068
	Data: ::rc=80000000:lq=159:ct=00BB:ed=810F19DD:id=0:ba=3030:a1=1391:a2=0716:x=0040:y=-032:z=-1024:x=0036:y=-036;z=-1024:x=0036:y=-044;z=-1024:x=0040:y=-040;z=-1020:x=0032:y=-036;z=-1024:x=0032:y=-040;z=-1024:x=0032:y=-040;z=-1024:x=0040:y=-044;z=-1024:x=0032:y=-028;z=-1024:x=0036:y=-032;z=-1024
	Data: ::rc=80000000:lq=147:ct=0812:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0692:x=0004:y=0020:z=-1084:x=0000:y=0016;z=-1080:x=0000:y=0016;z=-1080:x=0000:y=0016;z=-1084:x=0000:y=0020;z=-1076:x=0004:y=0020;z=-1080:x=0004:y=0024;z=-1080:x=0004:y=0028;z=-1084:x=0004:y=0032;z=-1084:x=0000:y=0044;z=-1084
	Data: ::rc=80000000:lq=141:ct=01AE:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0004:y=-028:z=-1072:x=0000:y=-032;z=-1068:x=0004:y=-024;z=-1072:x=0008:y=-028;z=-1068:x=0008:y=-012;z=-1060:x=0008:y=-012;z=-1068:x=0004:y=-004;z=-1068:x=0004:y=-004;z=-1060:x=0000:y=-004;z=-1068:x=-004:y=0000;z=-1068
	Data: ::rc=80000000:lq=159:ct=00BC:ed=810F19DD:id=0:ba=3030:a1=1394:a2=0716:x=0036:y=-024:z=-1024:x=0032:y=-020;z=-1024:x=0032:y=-016;z=-1020:x=0028:y=-012;z=-1024:x=0028:y=-008;z=-1024:x=0024:y=-012;z=-1024:x=0020:y=-016;z=-1024:x=0020:y=-020;z=-1024:x=0024:y=-028;z=-1024:x=0032:y=-028;z=-1028
	Data: ::rc=80000000:lq=147:ct=0813:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0692:x=0000:y=0040:z=-1080:x=-004:y=0040;z=-1080:x=0000:y=0048;z=-1084:x=-004:y=0048;z=-1084:x=-004:y=0044;z=-1084:x=-004:y=0040;z=-1084:x=-004:y=0032;z=-1084:x=0000:y=0028;z=-1084:x=0004:y=0032;z=-1084:x=0004:y=0028;z=-1084
	Data: ::rc=80000000:lq=141:ct=01AF:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0000:y=-004:z=-1068:x=-008:y=-012;z=-1056:x=-004:y=-012;z=-1064:x=0000:y=-008;z=-1068:x=0004:y=-008;z=-1068:x=0008:y=-016;z=-1064:x=0008:y=-020;z=-1072:x=0008:y=-016;z=-1072:x=0000:y=-016;z=-1068:x=0000:y=-020;z=-1064
	Data: ::rc=80000000:lq=159:ct=00BD:ed=810F19DD:id=0:ba=3030:a1=1394:a2=0716:x=0036:y=-028:z=-1028:x=0036:y=-032;z=-1024:x=0036:y=-032;z=-1020:x=0040:y=-036;z=-1020:x=0036:y=-036;z=-1024:x=0032:y=-036;z=-1024:x=0032:y=-040;z=-1024:x=0028:y=-044;z=-1024:x=0032:y=-036;z=-1028:x=0036:y=-040;z=-1024
	Data: ::rc=80000000:lq=147:ct=0814:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0689:x=0004:y=0020:z=-1084:x=0004:y=0020;z=-1080:x=0000:y=0024;z=-1076:x=0000:y=0024;z=-1080:x=-004:y=0020;z=-1080:x=-004:y=0020;z=-1080:x=0000:y=0016;z=-1084:x=0004:y=0020;z=-1080:x=0004:y=0024;z=-1080:x=0004:y=0024;z=-1084
	Data: ::rc=80000000:lq=141:ct=01B0:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0000:y=-028:z=-1064:x=0000:y=-032;z=-1068:x=0004:y=-024;z=-1064:x=0004:y=-020;z=-1064:x=0008:y=-016;z=-1064:x=0004:y=-016;z=-1064:x=0012:y=-012;z=-1064:x=0004:y=-012;z=-1072:x=0004:y=-008;z=-1068:x=0004:y=-008;z=-1064
	Data: ::rc=80000000:lq=159:ct=00BE:ed=810F19DD:id=0:ba=3030:a1=1391:a2=0716:x=0036:y=-036:z=-1028:x=0040:y=-040;z=-1024:x=0036:y=-032;z=-1024:x=0044:y=-028;z=-1024:x=0032:y=-020;z=-1024:x=0032:y=-020;z=-1024:x=0024:y=-016;z=-1024:x=0020:y=-016;z=-1028:x=0016:y=-008;z=-1024:x=0020:y=-008;z=-1020
	Data: ::rc=80000000:lq=147:ct=0815:ed=810F1CEC:id=0:ba=3070:a1=1386:a2=0692:x=0004:y=0028:z=-1080:x=0004:y=0028;z=-1076:x=0000:y=0032;z=-1076:x=-004:y=0040;z=-1080:x=-004:y=0044;z=-1080:x=-008:y=0040;z=-1076:x=-004:y=0048;z=-1084:x=-004:y=0052;z=-1080:x=-004:y=0040;z=-1084:x=0000:y=0044;z=-1080
	Data: ::rc=80000000:lq=141:ct=01B1:ed=810F1BE4:id=0:ba=2910:a1=1370:a2=0692:x=0000:y=-004:z=-1064:x=0000:y=0000;z=-1060:x=-004:y=0000;z=-1068:x=0000:y=-004;z=-1064:x=0000:y=0000;z=-1068:x=0004:y=-004;z=-1060:x=0000:y=0000;z=-1064:x=0000:y=-008;z=-1072:x=0004:y=-012;z=-1068:x=0004:y=-020;z=-1064
	Data: ::rc=80000000:lq=159:ct=00BF:ed=810F19DD:id=0:ba=3030:a1=1391:a2=0716:x=0024:y=-008:z=-1028:x=0020:y=-020;z=-1028:x=0024:y=-016;z=-1028:x=0028:y=-020;z=-1024:x=0032:y=-024;z=-1024:x=0032:y=-028;z=-1024:x=0028:y=-036;z=-1020:x=0028:y=-036;z=-1020:x=0036:y=-040;z=-1024:x=0032:y=-040;z=-1020
	Data: ::rc=80000000:lq=147:ct=0816:ed=810F1CEC:id=0:ba=3080:a1=1386:a2=0692:x=0000:y=0040:z=-1084:x=0000:y=0028;z=-1084:x=0000:y=0028;z=-1084:x=0000:y=0028;z=-1084:x=0000:y=0024;z=-1080:x=0000:y=0020;z=-1072:x=0000:y=0016;z=-1080:x=0004:y=0020;z=-1076:x=0000:y=0024;z=-1080:x=0004:y=0024;z=-1076
	Data: ::rc=80000000:lq=141:ct=01B2:ed=810F1BE4:id=0:ba=2910
*/

//}); 

function write(data) {
    console.log('Write: ' + data);
    port.write(new Buffer(data), function(err, results) {
		if(err) {
			console.log('Err: ' + err);
			console.log('Results: ' + results);
		}
	});
}


/*
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/tty.usbserial-MW1A5M9Z", { // ここのパスは適宜変更する
    baudrate: 9600,
    parser: serialport.parsers.readline("\n") // 1行毎にパースする
}, false);

sp.open(function () {
    console.log('open');
    sp.on('data', function(data) {
        console.log('data received: ' + data);
    });
    sp.write("ls\n", function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
});
*/










//console.log('1');


// Connect to server
var io     = require('socket.io-client');
var socket = io.connect('https://proma3.herokuapp.com/', {reconnect: true});


//console.log('2');


// Add a connect listener
socket.on('connect', function(socket) { 
    console.log('Connected!');
});


socket.on('colorChange', function (data) {
	console.log("color:", data);
	//oscclient.send('/action/hand', data);
	var aaa = Number( data.per );
	oscclient.send('/action/hand', aaa);
});


//console.log('3');