var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');
    
var twitter = require('twitter');
var tweet_data;

var client = new twitter({
    consumer_key:'RDzDtfkXdbsQpgB7ILG8pBuvz',
    consumer_secret:'nGfALzQChu5kP47SIeMiCAzSWsg7bPuBj3y68A19v8CeBuXEj3',
    access_token_key:    '264055015-58JIdX2eXJHLMmWFfKREP1cr0SaelEEmjJtCFerO',
    access_token_secret: 'oylpY7ypPwiHJJKl7QpHUuUUgT9ypgnouZn54dI29gLNP',
});

var params = {screen_name: 'hayato_razona'};

client.get('users/show', params, function(error, tweets, response){
    if (!error) {
        console.log("tweets");
    }
    
});


app.listen(process.env.PORT || 3000, process.env.IP);
io.set('log level',1);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error');
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    })
}
io.sockets.on('connection',function(socket){
    socket.on('emit_from_client',function(data){
        console.log(data);
       socket.client_name = data.name; 
        io.sockets.emit('emit_from_server', '[' + socket.client_name + '] : ' +data.s_value);
        //io.sockets.emit('emit_from_server', '[' + socket.client_name + '] : ' + data.msg+data.s_value);
    });
});
