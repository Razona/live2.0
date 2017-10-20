var http = require('http');
    fs = require('fs');
    ejs = require("ejs");
    qs = require("querystring")
var settings = require('./settings');
console.log(settings);
var server = http.createServer();

var template = fs.readFileSync(__dirname+'/public_html/bbs.ejs','utf-8');
var posts =[];
var twi_name;
var twi_post;
function renderForm(posts, res) {
    var data = ejs.render(template, {
        posts: posts
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
}

server.on('request', function(req, res) {
    if (req.method === 'POST') {
        req.data = "";
        req.on("readable", function() {
            req.data += req.read();
        });
        req.on("end", function() {
var query = qs.parse(req.data);
posts.push(query.name2);
posts.push(query.Twi_id);
renderForm(posts,res);
console.log(posts)
        });
    } else {
        renderForm(posts, res);
    }
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});
