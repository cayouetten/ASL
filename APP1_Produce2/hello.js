//var http = require("http");
//var server = http.createServer(function(request, response){
//    response.writeHead(200,{"Content-Type":"text/plain"});
//    response.end("HELLO WORLD");
//})
//server.listen(80);
//console.log("OKAY! Server Running");


express = require("express")
var app = express()

app.get("/",function(request, response){
    response.end("HELLO THERE");
})

app.listen(80, function() {
    console.log("OKAY: Server Running");
});